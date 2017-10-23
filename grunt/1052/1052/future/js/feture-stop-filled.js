/**
 * Created by xiajing on 2016/12/16.
 */
new Vue({
    el:'#stopOfFiled',
    data:{
        initImg:true,
        stopFiledNoTuch:true,//未触发初始化样式
        stopFiledIsTuch:true,//已触发初始化样式
        stopFiledIsList:'',
        stopListContextObj:{},//未触发list
        isTouchObj:{},//已触发list
        conNoneTouchObj: {
            conditionID: '',//条件单编号
            clientFlag: '',//客户端操作状态
            serverFlag: ''//服务器端操作状态
        },

    },
    created:function(){
        var _this = this;
        _this.noneTouchList();
        //已触发的列表
        $.ajax({
            url:conditionUrl,
            method:'post',
            dataType:'json',
            contentType:'application/json;charest=utf-8',
            data:JSON.stringify({
                func: isConTouch,
                token: testToken,
                id: id,
                userID:10001,
                begin: 1,
                total:100,
                type:stopFiledType
            }),
            success:function(data){
                if(data.status == 0){
                    console.log(data)
                    var contextValue = [];
                    $.each(data.data,function(key,value){
                        var list = JSON.parse(value.conditionValue);
                        contextValue.push({
                            hyName:value.HYDM,
                            createTime:value.createTime,
                            StopLossCheckPriceType:list.ConditionList[0].PositionStop.StopLossPrice,//止损参数
                            StopProfitCheckPriceType:list.ConditionList[0].PositionStop.StopProfitPrice,//止盈参数
                            Volume:list.AttachObject[0].Volume//数量
                        })
                    })
                    _this.isTouchObj.contextValue = contextValue
                }
            },error:function(){
                console.log("服务器异常！")
            }
        })
    },
    methods:{
        //点击未触发的每条记录获取信息
        conNoneClick: function (conditionID, flag1, flag3) {
            console.log(conditionID,flag1,flag3)
            this.conNoneTouchObj = {
                conditionID: conditionID,
                clientFlag: flag1,
                serverFlag: flag3
            }
            console.log(this.conNoneTouchObj)
        },
        noneTouchList:function(){
            var _this = this;
            //未触发列表信息
            $.ajax({
                url:conditionUrl,
                method:'post',
                dataType:'json',
                async:true,
                contentType:'application/json;charest=utf-8',
                data:JSON.stringify({
                    func: noneConTouch,
                    token: testToken,
                    id: id,
                    userID:10001,
                    begin: 1,
                    total:100,
                    type:stopFiledType
                }),
                success:function(data){
                    console.log(data)
                    if(data.status == 0){
                        var contextValue = [];
                        $.each(data.data,function(key,value){
                            var list = JSON.parse(value.conditionValue);
                            contextValue.push({
                                conditionID:value.conditionID,
                                flag1:value.flag1,
                                flag3:value.flag3,
                                hyName:value.HYDM,
                                market:  list.Contracts[0].ExchangeCode,
                                code:   list.Contracts[0].ContractCode,
                                StopLossCheckPriceType:list.ConditionList[0].PositionStop.StopLossPrice,//止损参数
                                StopProfitCheckPriceType:list.ConditionList[0].PositionStop.StopProfitPrice,//止盈参数
                                Volume:list.AttachObject[0].Volume//数量
                            })
                        })
                        _this.stopListContextObj.contextValue = contextValue
                        console.log(_this.stopListContextObj)
                    }
                },error:function(){
                    console.log("服务器异常！")
                }
            })
        },
        stopFiledClick:function(flag){
            var _this = this;
            if(flag == 0){//未触发初始
                _this.stopFiledNoTuch = true;
                _this.stopFiledIsTuch = true;
            }
            if(flag == 1){//已触发初始
                _this.stopFiledNoTuch = false;
                _this.stopFiledIsTuch = false;

            }
        },
        //暂停、运行、删除、删除全部、修改
        conStopOrOnClick:function(type){
            var _this = this;
            if(type == 1 || type == 2){//暂停
                $.ajax({
                    url: conditionUrl,
                    method: 'post',
                    dataType: 'json',
                    contentType: 'application/json;charest=utf-8',
                    data: JSON.stringify({
                        func: conStopOrOn,
                        token: testToken,
                        id: id,
                        type: type,
                        conditionID: _this.conNoneTouchObj.conditionID,//条件点编号
                    }),
                    success: function (data) {
                        if (data.status == 0) {
                            _this.noneTouchList();
                            if (type == 1) {
                                console.log("暂停成功！")
                            }
                            if (type == 2) {
                                console.log("运行成功！")
                            }
                        }
                    }, error: function () {
                        console.log("服务器异常！")
                    }
                })
            }
            if(type == 3) {//修改
                $.ajax({
                    url: conditionUrl,
                    method: 'post',
                    dataType: 'json',
                    contentType: 'application/json;charest=utf-8',
                    data: JSON.stringify({
                        func: conIdQuery,
                        token: testToken,
                        id: id,
                        userID: 10001,
                        type: stopFiledType,
                        data: [_this.conNoneTouchObj.conditionID],//条件点编号
                    }),
                    success: function (data) {
                        //缓存信息 并跳转页面
                        saveStorageInfo(data)
                        console.log(data)
                    }, error: function () {

                    }
                })
            }
            //删除
            if (type == 4) {
                $.ajax({
                    url: conditionUrl,
                    method: 'post',
                    dataType: 'json',
                    contentType: 'application/json;charest=utf-8',
                    data: JSON.stringify({
                        func: delCon,
                        token: testToken,
                        id: id,
                        type:stopFiledType,
                        data: [_this.conNoneTouchObj.conditionID],//条件点
                    }),
                    success: function (data) {
                        if (data.status == 0) {
                            _this.noneTouchList();
                            console.log("删除成功！")
                        }
                    }, error: function () {
                        console.log("服务器异常！")
                    }
                })
            }
            //全部删除
            if (type == 5) {
                console.log(_this.noneTouchConID)
                $.ajax({
                    url: conditionUrl,
                    method: 'post',
                    dataType: 'json',
                    contentType: 'application/json;charest=utf-8',
                    data: JSON.stringify({
                        func: delCon,
                        token: testToken,
                        id: id,
                        type:stopFiledType,
                        data: [_this.conNoneTouchObj.conditionID],//条件点编号
                    }),
                    success: function (data) {
                        if (data.status == 0) {
                            _this.noneTouchList();
                            console.log("删除成功！")
                        }
                    }, error: function () {
                        console.log("服务器异常！")
                    }
                })
            }
        }
    }
})