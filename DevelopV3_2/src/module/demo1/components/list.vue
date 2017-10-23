<template>
    <div>
        <navbar>
            <span @click="goBack">
                <icon name="chevron-left" size="lg"></icon>
            </span>
            搜索
            <h5  @click="showBase = true" slot="body">{{city || '市场热点'}}</h5>
            <icon name="ellipsis-h" slot="footer" size="lg"></icon>
        </navbar>
        <div>
            <router-view></router-view>
        </div>
        <slideup v-model="showBase" class="slipTop">
            <slideup-body noPadding>
                <selector v-model="city" @change="showBase = false" class="cellCen">
                    <selector-option value="市场热点"><router-link :to="{path: '/marketHot'}">市场热点</router-link></selector-option>
                    <selector-option value="机构方向"><router-link :to="{path: '/orgWay'}">机构方向</router-link></selector-option>
                    <selector-option value="套利分析">套利分析</selector-option>
                    <selector-option value="仓单库存">仓单库存</selector-option>
                </selector>
            </slideup-body>
        </slideup>
        <div class="btnInfo">
            <btn  theme="primary" size="sm" @click="doSomething">弹框</btn>
        </div>
    </div>
</template>
<script>
   export default{
       data:function(){
         return{
             showBase: false,
             city: null,
         }
       },
       methods:{
           doSomething:function(){
//               window.location.href="main.html";
               this.$alert({
                   maskClosable: true,
                   btns: [{
                       text: '关闭',
                       click:function() {
                       },
                   }],
                   title: '<h5 class="text-success">提示</h5>',
                   message: '以后弹框就用我吧！',
                })
           },
           goBack:function(){
               this.$router.go(-1)
           }
       }
   }
</script>
<style>
    .btnInfo{
        position: fixed;
        bottom: 0;
        border-bottom: 0;
    }
    .swipe {
        height: 150px;
    }
    .page-swipe-item {
        color: #fff;
        height: 100%;
        line-height: 200px;
        text-align: center;
        font-size: 30px;
        font-weight: bold;
    }
    .fa-chevron-left:before {
        content:url(../../../assets/images/back.png);
    }
    .slideup{
        top:0;
        margin-top: 43px;
        bottom:inherit;
    }
    .cellCen {text-align: center}
    .cellCen .cell{
        background-position: 0rem 100%;
    }
</style>