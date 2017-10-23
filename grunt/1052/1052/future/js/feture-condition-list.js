/**
 * Created by xiajing on 2016/12/16.
 */
var nameCode = '';
var option = {
    callbacks: [
        {module: 90000, callback: function(msg){
            var data = mag.jData.Data;
            for(var i = 0;i < data.length;i++){
                if(data[i]['10'] == nameCode){
                    $("#newPrice").html(data[i]['29'])
                }
            }

        }},
        {fun: 6014, callback: function(msg){//查询可平
              //可用数量	137 可平
            if(msg.jData.data[0]){
                $("#openNum").html(msg.jData.data[0][137])
                console.log(msg.jData.data[0][137])
            }else{
                $("#openNum").html(0)
            }
        }},],
    reload: function () {
    },
    refresh: function () {
    },
    fresh: function () {
    },
    doShow: function (flag) {
    }
}
pbPage.initPage(option);

new Vue({
    el: '#conditionList',
    data: {
        noneTouchOne: false,
        isTouchOne: true,
        noneTouchTwo: true,
        isTouchTwo: false,
        noneTouchThree: true,
        isTouchThree: false,
        initImg: true,
        conPrice: true,
        conTime: true,
        validPrice: true,
        validTime: true,
        buyPrice: true,
        buyTime: true,
        openCang: true,
        pingCang: true,
        pingDay: true,
        pingCangBlue: false,
        openCangFFF: false,
        pingDayBlue: false,
        initSetAdd: true,
        editSetDiv: false,
        reSetValue: '',
        initPrice: true,
        initTime: false,
        initFooter: true,
        initCondition: true,
        initAddBtn: true,//初始化按钮
        blueBtn: false,
        //以上为切换的样式
        trustPriceType: 1,//默认给1表示是输入  的委托价格
        noneConTouchList: '',//未触发的列表信息
        isConTouchListObj:{},//已触发的列表信息
        contentNoneList: '',
        selectContract: '',//选择合约
        selectContractName: '选择期货合约',
        setDataObj: {
            contractMarket: '',//合约市场
            contractCode: '',//合约品种
            validity: 1,//1-当日有效，2-永久有效   注：默认给当日有效
            tj: 1,//条件1-价格，2-时间            注：默认给 1 价格
            tjTime: '19:50:00',
            Operator: '<=',//条件是价格时的操作，
            tjPriceValue: '',
            dealOpen: 0,//买卖方向  0 买 1 卖     注：默认给 0 买
            OffsetFlag: 0,//开平标识 0，1,2 开仓，平仓，平今  注：默认给 0 开仓
            Volume: '',//委托数量
            LimitPriceType: '', //限价类型: 仅PriceType为“限价”时有本字段
            LimitPrice: '',//仅PriceType为“限价”时有本字段，仅LimitPriceType为“指定价格”时有意义
            priceName: '',
        },
        conNoneTouchObj: {
            conditionID: '',//条件单编号
            clientFlag: '',//客户端操作状态
            serverFlag: ''//服务器端操作状态
        },
        touchTimeValue: {
            HH: "10",
            mm: "05",
            ss: "00"
        },
        noneTouchConID: [],//删除全部未触发的条件单id
        editQueryInfo: {//编辑条件单设置时获取的参数
            HYDM: '',//合约市场
            contractEditCode: '',//合约品种
            imeConditionEdit: '',//有效期 1-当日有效，2-永久有效
            ConditionChoicedEdit: '',//当前选择条件：1-价格，2-时间
            OperatorEdit: '',//操作 >= <=
            valueEdit: '',//条件里面的 输入价格值
            dealOpenEdit: '',//买卖方向
            OffsetFlagEdit: '',//开平标识
            VolumeEdit: '',//委托数量
            LimitPriceTypeEdit: '', //限价类型: 仅PriceType为“限价”时有本字段
            LimitPriceEdit: '',//仅PriceType为“限价”时有本字段，仅LimitPriceType为“指定价格”时有意义
            priceNameEdit: '',
        },
        tjTimeEdit: {//条件里面的时分秒
            HH: "",
            mm: "",
            ss: ""
        },
    },
    created: function () {
        var _this = this;
        //获取合约信息
        if (window.pbE) {
            var selectContractName = pbE.ZX().getSelfStock(0);//0代表全部合约信息
            if (selectContractName) {
                _this.selectContract = JSON.parse(selectContractName);
            }
        } else {
            _this.selectContract = [{"name": "沪铜1702", "market": "2001", "code": "010002"},
                {"name": "沪铝1702", "market": "2001", "code": "010102"},
                {"name": "沪锌1702", "market": "2001", "code": "010302"},
                {"name": "沪铅1702", "market": "2001", "code": "010902"},
                {"name": "黄金1706", "market": "2001", "code": "010506"}
            ]
        }
        _this.noneTouchClick();//未触发列表
        //已触发的列表
        $.ajax({
            url: conditionUrl,
            method: 'post',
            dataType: 'json',
            contentType: 'application/json;charest=utf-8',
            data: JSON.stringify({
                func: isConTouch,
                token: testToken,
                id: id,
                userID: 10001,
                begin: 1,
                total: 100,
                type: contractType
            }),
            success: function (data) {
                if (data.status == 0) {
                    var attr = [];
                    console.log(data)
                    console.log(JSON.parse(data.data[0].conditionValue))
                    $.each(data.data,function(key,value){
                        var type=JSON.parse(value.conditionValue).ConditionChoiced;
                        var list;
                        if(type == 2 ){//时间
                            list = JSON.parse(value.conditionValue).ConditionList[1]
                            //console.log(list)
                        }
                        attr.push({
                            createTime:value.createTime,
                            HYDM:value.HYDM,
                            type:value.ConditionChoiced,
                            touchTime:list
                        })
                    })
                    _this.isConTouchListObj.attr = attr;
                }
            }, error: function () {
                console.log("服务器异常！")
            }
        })
    },
    methods: {
        noneTouchClick: function () {
            var _this = this;
            //未触发列表信息
            $.ajax({
                url: conditionUrl,
                method: 'post',
                dataType: 'json',
                contentType: 'application/json;charest=utf-8',
                data: JSON.stringify({
                    func: noneConTouch,
                    token: testToken,
                    id: id,
                    userID: 10001,
                    begin: 1,
                    total: 100,
                    type: contractType
                }),
                success: function (data) {
                    if (data.status == 0) {
                        console.log(data)
                        _this.noneConTouchList = data.data;
                        $.each(data.data, function (key, value) {
                            _this.noneTouchConID.push(value.conditionID);
                        })
                        //console.log(_this.noneTouchConID)
                    }
                }, error: function () {
                    console.log("服务器异常！")
                }
            })
        },
        touchClick: function (flag) {
            //未触发列表的样式切换 事件
            if (flag == 0) {
                var _this = this;
                _this.initCondition = true;//替换条件单设置的按钮
                _this.noneTouchOne = false;
                _this.isTouchOne = true;
                _this.noneTouchTwo = true;
                _this.isTouchTwo = false;
                _this.noneTouchThree = true;
                _this.isTouchThree = false;
                _this.initImg = true;//将重置按钮替换成刷新按钮
                _this.initFooter = true;
            }
            //已触发列表的样式切换 事件
            if (flag == 1) {
                var _this = this;
                _this.initCondition = true;//替换条件单设置的按钮
                _this.noneTouchTwo = false;
                _this.isTouchTwo = true;
                _this.noneTouchOne = true;
                _this.isTouchOne = false;
                _this.noneTouchThree = true;
                _this.isTouchThree = false;
                _this.initImg = true;//将重置按钮替换成刷新按钮
                _this.initFooter = true;
            }
            //条件单设置的样式切换 事件
            if (flag == 2) {
                var _this = this;
                _this.initSetAdd = true;
                _this.editSetDiv = false;

                _this.noneTouchThree = false;
                _this.isTouchThree = true;
                _this.noneTouchOne = true;
                _this.isTouchOne = false;
                _this.noneTouchTwo = true;
                _this.isTouchTwo = false;
                _this.initImg = false;//将刷新按钮替换成重置按钮
                _this.reSetValue = '重置';
                _this.initFooter = false;
            }
        },
        //条件
        conditionClick: function (flag) {
            var _this = this;
            if (flag == 0) {//价格
                _this.conPrice = true;
                _this.conTime = true;
                _this.initPrice = true;
                _this.initFooter = false;
                _this.setDataObj.tj = 1;
                _this.editQueryInfo.ConditionChoicedEdit = 1;//编辑时条件类型赋值
            }
            if (flag == 1) {//时间
                _this.conPrice = false;
                _this.conTime = false;
                _this.initPrice = false;
                _this.initFooter = false;

                this.setDataObj.tj = 2;
                _this.editQueryInfo.ConditionChoicedEdit = 2;//编辑时条件类型赋值
            }
        },
        //条件单设置中有效期  切换样式
        validDateClick: function (flag) {
            var _this = this;
            //  1-当日有效，2-永久有效
            if (flag == 0) {//当日
                _this.validPrice = true;
                _this.validTime = true;
                _this.setDataObj.validity = 1;
                _this.editQueryInfo.imeConditionEdit = 1;//编辑时有效期类型赋值
            }
            if (flag == 1) {//永久
                _this.validPrice = false;
                _this.validTime = false;
                _this.setDataObj.validity = 2;
                _this.editQueryInfo.imeConditionEdit = 2;//编辑时有效期类型赋值
            }
        },
        //条件单设置中买卖方向 切换样式
        buyClick: function (flag) {
            var _this = this;
            if (flag == 0) {//买
                _this.buyPrice = true;
                _this.buyTime = true;
                _this.setDataObj.dealOpen = 0;//添加时入库
                _this.editQueryInfo.dealOpenEdit = 0;//编辑时入库
            }
            if (flag == 1) {//卖
                _this.buyPrice = false;
                _this.buyTime = false;
                _this.setDataObj.dealOpen = 1;//添加时入库
                _this.editQueryInfo.dealOpenEdit = 1;//编辑时入库
            }
        },
        //条件单设置中类型 切换样式
        storehouseTypeClick: function (flag) {
            var _this = this;
            //开仓
            if (flag == 0) {
                _this.openCang = true;

                _this.openCangFFF = false;
                _this.pingCangBlue = false;
                _this.pingDayBlue = false;
                _this.setDataObj.OffsetFlag = 0;
                _this.editQueryInfo.OffsetFlagEdit = 0;//编辑时入库
            }
            //平仓
            if (flag == 1) {
                _this.pingCangBlue = true;
                _this.openCang = false;
                _this.openCangFFF = true;
                _this.pingDayBlue = false;
                _this.setDataObj.OffsetFlag = 1;
                _this.editQueryInfo.OffsetFlagEdit = 1;//编辑时入库
            }
            //平今
            if (flag == 2) {
                _this.pingDayBlue = true;

                _this.pingCangBlue = false;
                _this.openCang = false;
                _this.openCangFFF = true;
                _this.setDataObj.OffsetFlag = 2;
                _this.editQueryInfo.OffsetFlagEdit = 2;//编辑时入库
            }
        },
        //设置条件单的类型
        priceInfoClick: function (name) {
            this.trustPriceType = 2
            if (name == 1) {//涨停价
                this.setDataObj.priceName = '涨停价' //新增
                this.editQueryInfo.priceNameEdit = '涨停价'//编辑时值保存
            }
            if (name == 2) {//跌停价
                this.setDataObj.priceName = '跌停价'
                this.editQueryInfo.priceNameEdit = '跌停价'//编辑时值保存
            }
            if (name == 3) {//对手价
                this.setDataObj.priceName = '对手价'
                this.editQueryInfo.priceNameEdit = '对手价'//编辑时值保存
            }
            if (name == 4) {//最新价
                this.setDataObj.priceName = '最新价'
                this.editQueryInfo.priceNameEdit = '最新价'//编辑时值保存
            }
        },
        //选择合约
        selectContractClick: function (name, market, code) {
            //添加时保存的值
            this.selectContractName = name;
            this.setDataObj.contractMarket = market;
            this.setDataObj.contractCode = code;
            //修改时保存的值
            this.editQueryInfo.contractEditCode = code;
            this.editQueryInfo.HYDM = market;
            //订阅行情
            if (window.pbE) {
                nameCode = code;
                pbE.HQ().hqSubscribe(0, JSON.stringify({"1": [{2: market, 3: code}]}));//订阅最新价
                CID = pbE.WT().wtGetCurrentConnectionCID();
                pbE.WT().wtGeneralRequest(CID, 6014, JSON.stringify({'54': market, '63': code}));//可平
                //var data = ''
                //pbE.WT().wtGeneralRequest(CID, 6044, JSON.stringify(data));//可开
            }
        },
        //priceTypeClick
        priceTypeClick: function () {
            if (this.setDataObj.Operator == ">=") {
                this.setDataObj.Operator = "<=";
            } else {
                this.setDataObj.Operator = ">=";
            }
        },
        trustFocus: function () {
            this.setDataObj.priceName = ''
        },
        trustPrice: function (type) {
            this.trustPriceType = type;
        },
        //点击未触发的每条记录获取信息
        conNoneClick: function (conditionID, flag1, flag3) {
            this.conNoneTouchObj = {
                conditionID: conditionID,
                clientFlag: flag1,
                serverFlag: flag3
            }
            console.log(this.conNoneTouchObj)
        },
        //暂停或继续
        conStopOrOnClick: function (type) {
            var _this = this;
            //type 1：暂停 2：继续 3:修改 4：删除 5:全部删除
            //暂停和继续
            if (type == 1 || type == 2) {
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
                            _this.noneTouchClick();
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
            //修改
            if (type == 3) {
                var _this = this;
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
                        type:contractType,
                        data: [_this.conNoneTouchObj.conditionID],//条件点编号
                    }),
                    success: function (data) {
                        if (data.status == 0) {
                            console.log(data.data)
                            console.log(JSON.parse(data.data[0].conditionValue))
                            var dataValue = JSON.parse(data.data[0].conditionValue);
                            //console.log(dataVlue.Contracts[0].ContractCode)
                            //console.log(dataValue.ConditionList[0].Price.Value)
                            //console.log(dataValue.OrderAction.SmartOrder.Order.Volume)
                            //当前选择条件：1-价格，2-时间
                            var priceValue;
                            var priceOper;
                            var priceTime;
                            if(dataValue.ConditionChoiced == 1){
                                //取价格里面的值
                                priceValue = dataValue.ConditionList[0].Price.Value;
                                priceOper = dataValue.ConditionList[0].Price.Operator;
                            }else if(dataValue.ConditionChoiced == 2){
                                //取时间的值
                                priceTime = dataValue.ConditionList[1].Time;
                            }
                            //委托价格如果是输入的就将文本框的值CustomPrice赋给LimitPriceType，类型为double类型或者string，如果是通过类型选择的就将选的值赋给LimitPriceType
                            var trustPriceType;
                            if (_this.trustPriceType == 2) {//表示选择
                                trustPriceType =  dataValue.OrderAction.SmartOrder.Order.LimitPriceType
                            } else if (_this.trustPriceType == 1) {//表示输入
                                trustPriceType =  dataValue.OrderAction.SmartOrder.Order.LimitPrice
                            }
                            _this.editQueryInfo = {
                                HYDM: dataValue.Contracts[0].ContractCode,
                                contractEditCode:dataValue.Contracts[0].ExchangeCode,//合约品种
                                imeConditionEdit: dataValue.imeCondition,//有效期 1-当日有效，2-永久有效
                                ConditionChoicedEdit: dataValue.ConditionChoiced,//当前选择条件：1-价格，2-时间
                                OperatorEdit:priceOper ,//操作 >= <=
                                valueEdit: priceValue,//条件里面的 输入价格值
                                tjTimeEdit: priceTime,//条件里面的时分秒
                                dealOpenEdit: dataValue.OrderAction.SmartOrder.Order.Direction,//买卖方向
                                OffsetFlagEdit: dataValue.OrderAction.SmartOrder.Order.OffsetFlag,//开平标识
                                VolumeEdit: dataValue.OrderAction.SmartOrder.Order.Volume,//委托数量
                                LimitPriceTypeEdit: dataValue.OrderAction.SmartOrder.Order.LimitPriceType, //限价类型: 仅PriceType为“限价”时有本字段
                                LimitPriceEdit: dataValue.OrderAction.SmartOrder.Order.LimitPrice,//仅PriceType为“限价”时有本字段，仅LimitPriceType为“指定价格”时有意义
                                priceNameEdit: trustPriceType,
                            }
                            console.log(_this.editQueryInfo)
                            //将修改设置的div显示出来并显示对应的样式   start......
                            _this.initCondition = false;//替换条件单设置的按钮
                            _this.initSetAdd = false;
                            _this.editSetDiv = true;

                            _this.noneTouchThree = false;
                            _this.isTouchThree = true;
                            _this.noneTouchOne = true;
                            _this.isTouchOne = false;
                            _this.noneTouchTwo = true;
                            _this.isTouchTwo = false;
                            _this.initImg = false;//将刷新按钮替换成重置按钮
                            _this.reSetValue = '';
                            _this.initFooter = false;
                            //将修改设置的div显示出来并显示对应的样式   end......
                            //以下是根据类型来判断当前选中的样式
                            // 有效期 1-当日有效，2-永久有效
                            if (dataValue.imeCondition == 1) {
                                _this.validPrice = true;
                                _this.validTime = true;
                            } else if (dataValue.imeCondition == 2) {
                                _this.validPrice = false;
                                _this.validTime = false;
                            }
                            //当前选择条件：1-价格，2-时间
                            if (dataValue.ConditionChoiced == 1) {//价格
                                _this.conPrice = true;
                                _this.conTime = true;
                                _this.initPrice = true;
                                _this.initFooter = false;
                            }
                            if (dataValue.ConditionChoiced == 2) {//时间
                                _this.conPrice = false;
                                _this.conTime = false;
                                _this.initPrice = false;
                                _this.initFooter = false;
                            }
                            //买卖方向
                            if (dataValue.OrderAction.SmartOrder.Order.Direction == 0) {//买
                                _this.buyPrice = true;
                                _this.buyTime = true;
                            }
                            if (dataValue.OrderAction.SmartOrder.Order.Direction == 1) {//卖
                                _this.buyPrice = false;
                                _this.buyTime = false;
                            }
                            //开平标识
                            //开仓
                            if (dataValue.OrderAction.SmartOrder.Order.OffsetFlag == 0) {
                                _this.openCang = true;
                                _this.openCangFFF = false;
                                _this.pingCangBlue = false;
                                _this.pingDayBlue = false;
                            }
                            //平仓
                            if (dataValue.OrderAction.SmartOrder.Order.OffsetFlag == 1) {
                                _this.pingCangBlue = true;
                                _this.openCang = false;
                                _this.openCangFFF = true;
                                _this.pingDayBlue = false;
                            }
                            //平今
                            if (dataValue.OrderAction.SmartOrder.Order.OffsetFlag == 2) {
                                _this.pingDayBlue = true;
                                _this.pingCangBlue = false;
                                _this.openCang = false;
                                _this.openCangFFF = true;
                            }
                            if (dataValue.ConditionChoiced == 1) {//当前选择条件：1-价格，2-时间
                                _this.conPrice = true;
                                _this.conTime = true;
                                _this.initPrice = true;
                                _this.initFooter = false;
                            } else if (dataValue.ConditionChoiced == 2) {
                                _this.conPrice = false;
                                _this.conTime = false;
                                _this.initPrice = false;
                                _this.initFooter = false;
                            }
                            console.log("根据条件单查询记录成功！")
                        }
                    }, error: function () {
                        console.log("服务器异常！")
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
                        type:contractType,
                        data: [_this.conNoneTouchObj.conditionID],//条件点编号
                    }),
                    success: function (data) {
                        if (data.status == 0) {
                            _this.noneTouchClick();
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
                        type:contractType,
                        data: _this.noneTouchConID,//条件点编号
                    }),
                    success: function (data) {
                        if (data.status == 0) {
                            _this.noneTouchClick();
                            console.log("删除成功！")
                        }
                    }, error: function () {
                        console.log("服务器异常！")
                    }
                })
            }
        },
        //失去焦点时非空判断
        opinionBlur: function () {
            var _this = this;
            //console.log(_this.selectContractName,_this.setDataObj.tjPriceValue,_this.setDataObj.priceName,_this.setDataObj.Volume)
            if (_this.selectContractName && _this.setDataObj.tjPriceValue && _this.setDataObj.priceName && _this.setDataObj.Volume) {
                _this.blueBtn = true;
                _this.initAddBtn = false;
            } else if (_this.selectContractName || _this.setDataObj.tjPriceValue || _this.setDataObj.priceName || _this.setDataObj.Volume) {
                _this.blueBtn = false;
                _this.initAddBtn = true;
            }
        },
        //添加设置信息
        addContractInfo: function () {
            var _this = this;
            var data = new setConData();
            data.Contracts[0] = {
                ExchangeCode: _this.setDataObj.contractMarket,//合约名称
                ContractCode: _this.setDataObj.contractCode//合约品种
            }
            data.imeCondition = _this.setDataObj.validity;//有效期 1-当日有效，2-永久有效
            data.ConditionChoiced = _this.setDataObj.tj;//当前选择条件：1-价格，2-时间
            if (_this.setDataObj.tj == 1) {//代表价格
                data.ConditionList[0].Price.Operator = _this.setDataObj.Operator;//操作
                data.ConditionList[0].Price.Value = _this.setDataObj.tjPriceValue;//条件里面的输入价格
            }
            if (_this.setDataObj.tj == 2) {//代表时间
                //this.touchTimeValue.HH+":"+this.touchTimeValue.mm+":"+this.touchTimeValue.ss
                //data.Contracts[0].Time = _this.setDataObj.tjTime;
                data.Contracts[0].Time = _this.touchTimeValue.HH + ":" + _this.touchTimeValue.mm + ":" + _this.touchTimeValue.ss;
            }
            //下单
            data.OrderAction.SmartOrder.Order.Contract = {
                ExchangeCode: _this.setDataObj.contractMarket,//合约名称  市场
                ContractCode: _this.setDataObj.contractCode//合约品种    合约
            }
            //委托数
            data.OrderAction.SmartOrder.Order.Direction = _this.setDataObj.dealOpen;//买卖方向
            data.OrderAction.SmartOrder.Order.OffsetFlag =  _this.setDataObj.OffsetFlag;//开平标识
            data.OrderAction.SmartOrder.Order.Volume =_this.setDataObj.Volume;//委托数量
            //委托价格如果是输入的就将文本框的值CustomPrice赋给LimitPriceType，类型为double类型或者string，如果是通过类型选择的就将选的值赋给LimitPriceType
            if (_this.trustPriceType == 2) {//表示选择
                data.OrderAction.SmartOrder.Order.LimitPriceType = _this.setDataObj.priceName; //选择的委托价格
            } else if (_this.trustPriceType == 1) {//表示输入
                data.OrderAction.SmartOrder.Order.LimitPrice =_this.setDataObj.priceName; //输入的委托价格
                data.OrderAction.SmartOrder.Order.LimitPriceType ='CustomPrice';//如果是输入的价格就将CustomPrice赋给LimitPriceType
            }
            console.log(data)
            $.ajax({
                url: conditionUrl,
                method: 'post',
                dataType: 'json',
                contentType: 'application/json;charest=utf-8',
                data: JSON.stringify({
                    func: addContract,
                    token: testToken,
                    id: id,
                    name: '',
                    subtype: _this.setDataObj.tj,
                    SCDM: _this.setDataObj.contractMarket,
                    HYDM: _this.selectContractName,
                    type: contractType,
                    terminal: '',
                    userID: 10001,
                    data: data
                }),
                success: function (data) {
                    if (data.status == 0) {
                        console.log("设置成功！")
                        //添加成功切换到  未触发的列表
                        $('#conNoneTouch a[href="#noneTuch"]').tab('show')
                        //同时刷新列表数据并切换选中的样式
                        _this.initCondition = true;//替换条件单设置的按钮
                        _this.noneTouchOne = false;
                        _this.isTouchOne = true;
                        _this.noneTouchTwo = true;
                        _this.isTouchTwo = false;
                        _this.noneTouchThree = true;
                        _this.isTouchThree = false;
                        _this.initImg = true;//将重置按钮替换成刷新按钮
                        _this.initFooter = true;
                        //刷新列表数据
                        _this.noneTouchClick();
                    }
                }, error: function () {
                    console.log("服务器异常！")
                }
            })
        },
        //修改保存条件单的信息
        editConClick: function () {
            var _this = this;
            var data = new setConData();
            data.Contracts[0] = {
                ExchangeCode: _this.editQueryInfo.HYDM,//合约名称
                ContractCode: _this.editQueryInfo.contractEditCode//合约品种
            }
            data.imeCondition = _this.editQueryInfo.imeConditionEdit;//有效期 1-当日有效，2-永久有效
            data.ConditionChoiced = _this.editQueryInfo.ConditionChoicedEdit;//当前选择条件：1-价格，2-时间
            if(_this.editQueryInfo.ConditionChoicedEdit == 1){//代表价格
                data.ConditionList[0].Price.Operator =  _this.editQueryInfo.OperatorEdit;//操作
                data.ConditionList[0].Price.Value = _this.editQueryInfo.valueEdit;//条件里面的输入价格
            }
            if(_this.editQueryInfo.ConditionChoicedEdit == 2){//代表时间
                data.Contracts[0].Time = _this.tjTimeEdit.HH+":"+ _this.tjTimeEdit.mm+":"+ _this.tjTimeEdit.ss;
            }
            //下单
            data.OrderAction.SmartOrder.Order.Contract={
                ExchangeCode:_this.editQueryInfo.HYDM,//合约名称  市场
                ContractCode: _this.editQueryInfo.contractEditCode//合约品种    合约
            }
            //委托数
            data.OrderAction.SmartOrder.Order.Direction =_this.editQueryInfo.dealOpenEdit;//买卖方向
            data.OrderAction.SmartOrder.Order.OffsetFlag = _this.editQueryInfo.OffsetFlagEdit;//开平标识
            data.OrderAction.SmartOrder.Order.Volume =_this.editQueryInfo.VolumeEdit;//委托数量
            //委托价格如果是输入的就将文本框的值CustomPrice赋给LimitPriceType，类型为double类型或者string，如果是通过类型选择的就将选的值赋给LimitPriceType
            if (_this.trustPriceType == 2) {//表示选择
                data.OrderAction.SmartOrder.Order.LimitPriceType = _this.editQueryInfo.priceNameEdit; //选择的委托价格
            } else if (_this.trustPriceType == 1) {//表示输入
                data.OrderAction.SmartOrder.Order.LimitPrice=  _this.setDataObj.priceNameEdit;//输入的委托价格
                data.OrderAction.SmartOrder.Order.LimitPriceType= 'LimitPriceType';//如果是输入的价格就将CustomPrice赋给LimitPriceType
            }
            console.log(data)
            //console.log(_this.conNoneTouchObj.conditionID)
            $.ajax({
                url: conditionUrl,
                method: 'post',
                dataType: 'json',
                contentType: 'application/json;charest=utf-8',
                data: JSON.stringify({
                    func: editCon,
                    token: testToken,
                    id: id,
                    conditionID:_this.conNoneTouchObj.conditionID,
                    data: data
                }),
                success: function (data) {
                    if (data.status == 0) {
                        console.log("修改成功！")
                        //修改成功切换到  未触发的列表
                        $('#conNoneTouch a[href="#noneTuch"]').tab('show')
                        //同时刷新列表数据并切换选中的样式
                        _this.initCondition = true;//替换条件单设置的按钮
                        _this.noneTouchOne = false;
                        _this.isTouchOne = true;
                        _this.noneTouchTwo = true;
                        _this.isTouchTwo = false;
                        _this.noneTouchThree = true;
                        _this.isTouchThree = false;
                        _this.initImg = true;//将重置按钮替换成刷新按钮
                        _this.initFooter = true;
                        //刷新列表数据
                        _this.noneTouchClick();
                    }
                }, error: function () {
                    console.log("服务器异常！")
                }
            })
        },
        //重置信息
        clearSetInfo: function () {
            this.selectContractName = '选择期货合约'
            this.touchTimeValue = {
                HH: "",
                mm: "",
                ss: ""
            }
            this.setDataObj = {
                contractMarket: '',//合约市场
                contractCode: '',//合约品种
                validity: '',//1-当日有效，2-永久有效
                tj: '',//条件
                tjTime: '',
                Operator: '<=',//条件是价格时的操作，
                tjPriceValue: '',
                dealOpen: '',//买卖方向
                OffsetFlag: '',//开平标识
                Volume: '',//委托数量
            }
            //有效期
            this.validPrice = true;
            this.validTime = true;
            this.setDataObj.validity = 1;
            //买卖
            this.buyPrice = true;
            this.buyTime = true;
            this.setDataObj.dealOpen = 0;
            //条件
            this.conPrice = true;
            this.conTime = true;
            this.initPrice = true;
            this.initFooter = false;
            this.setDataObj.tj = 0;
            //类型
            this.openCang = true;
            this.openCangFFF = false;
            this.pingCangBlue = false;
            this.pingDayBlue = false;
            this.setDataObj.OffsetFlag = 0;
        }
    }
})
Vue.extend({
    //data:{
    //    id:''
    //},
    components: {
        VueTimepicker: VueTimepicker
    }
})

