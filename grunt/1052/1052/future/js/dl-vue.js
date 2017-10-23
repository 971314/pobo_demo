/**
 * Created by pobo on 2016/12/15.
 */
Vue.component('my-deal', {
    template: '<div><div class="row content" v-for="con in arr">'+
    '<div class="col-my-11 text-left">'+
    '<p class="a1 name-row"><span class="display-table-cell">{{con.contract}}</span></p>'+
    '<p class="d1 time-row"><span class="display-table-cell">{{con.data116}}</span></p>'+
    '</div>'+
    '<div class="col-my-13 text-right">'+
    '<p class="lh55" v-bind:class="{b3:con.dirclass.isb3,b4:con.dirclass.isb4}">{{con.direction}}</p>'+
    '</div>'+
    '<div class="col-my-11 text-right">'+
    '<p class="b1 lh55">{{con.price}}</p>'+
    '</div>'+
    '<div class="col-my-13 text-right">'+
    '<p class="b1 lh55">{{con.num}}</p>'+
    '</div>'+
    '</div></div>',
    data:function () {
        var direction = null, contract = null,dirclass,arr = [],dat={};
        for(var i = 0;i<dataHis.length;i++){
            var price = floatToFixed(dataHis[i]['114'],2);
            var num = floatToFixed(dataHis[i]['113'],0);
            var data116 = dataHis[i]['116'];
            if ((dataHis[i]['112'] == 0) && (dataHis[i]['117'] == 0)) {
                direction = '买开';
                dirclass = {isb3:true, isb4:false};
            } else if ((dataHis[i]['112'] == 1) && (dataHis[i]['117'] == 1)) {
                direction = '卖平';
                dirclass = {isb3:false, isb4:true};
            } else if ((dataHis[i]['112'] == 0) && (dataHis[i]['117'] == 1)) {
                direction = '买平';
                dirclass = {isb3:true, isb4:false};
            } else if ((dataHis[i]['112'] == 1) && (dataHis[i]['117'] == 0)) {
                direction = '卖开';
                dirclass = {isb3:false, isb4:true};
            } else if ((dataHis[i]['112'] == 0) && (dataHis[i]['117'] == 2)) {
                direction = '买平今';
                dirclass = {isb3:true, isb4:false};
            } else if ((dataHis[i]['112'] == 1) && (dataHis[i]['117'] == 2)) {
                direction = '卖平今';
                dirclass = {isb3:false, isb4:true};
            }
            if (dataHis[i]['name']) {
                contract = dataHis[i]['name'];
            } else if(dataHis[i]['64']){
                contract = dataHis[i]['64'];
            }
            else {
                contract = dataHis[i]['63'];
            }
/*
            if (dataHis[i]['64']) {
                contract = dataHis[i]['64'];
            } else {
                contract = dataHis[i]['63'];
            }*/
            dat = { contract:contract, direction:direction, price:price, num:num, data116:data116, dirclass:dirclass};
            arr.push(dat);
        }
        return {
            arr:arr
        }
    }
});