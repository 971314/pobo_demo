<template>
    <div>
       <common-nav :goBack="true">
         <h5  @click="showBase = true" slot="body">{{city || '市场热点'}}&nbsp;&nbsp;<img src="../../assets/images/select.png" width="7"></h5>
       </common-nav>
        <div>
            <router-view></router-view>
        </div>
        <slideup v-model="showBase" class="slipTop">
            <slideup-body noPadding>
                <selector v-model="city" @change="showBase = false" class="cellCen">
                    <selector-option value="市场热点"><router-link :to="{path: '/mrkHot'}">市场热点</router-link></selector-option>
                    <selector-option value="机构动向"><router-link :to="{path: '/jgdx'}">机构动向</router-link></selector-option>
                    <selector-option value="套利分析"><router-link :to="{path: '/tlfx'}">套利分析</router-link></selector-option>
                    <selector-option value="仓单库存"><router-link :to="{path: '/cdkc'}">仓单库存</router-link></selector-option>
                </selector>
            </slideup-body>
        </slideup>
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
     
     mounted: function () {
       this.$router.push({path: '/mrkHot'});
     },
       methods:{
           /*doSomething:function(){
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
           },*/
           goBack:function(){
               this.$router.go(-1)
           },
           
           search: function () {
             
           }
       }
   }
</script>
<style>
  .navbar-primary {background-color: #eb1212;}
    .fa-chevron-left:before {
        content:url(../../assets/images/title-back.png);
    }
    .fa-select:before {
        content:url(../../assets/images/select.png);
    }
    .fa-ellipsis-h:before {
        content:url(../../assets/images/service.png);
    }
    .slideup{
        top:0;
        margin-top: 43px;
        bottom:inherit;
    }
  .selector-option {font-size: 17px; text-align: center;}
  .cellCen {text-align: center}
  .cellCen .cell{
      color: #1a1a1a;
  }
  .selector-option.active {color: #eb1212;}
  .common-nav .navbar-body {font-size: 17px;}
</style>