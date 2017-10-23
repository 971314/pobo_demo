<template>
    <div>
        <div>
            <navbar>
                <router-link :to="{path: '/'}">
                    <icon name="chevron-left" size="lg"></icon>
                </router-link>
                <h5 slot="body">Primary</h5>
                <icon name="ellipsis-h" slot="footer" size="lg"></icon>
            </navbar>
            <swipe>
                <swipe-item>
                    <div class="page-swipe-item bg-secondary">2</div>
                </swipe-item>
                <swipe-item>
                    <div class="page-swipe-item bg-success">3</div>
                </swipe-item>
                <swipe-item>
                    <div class="page-swipe-item bg-warning">4</div>
                </swipe-item>
                <swipe-item>
                    <div class="page-swipe-item bg-danger">5</div>
                </swipe-item>
            </swipe>
        </div>
        <div v-for="n in 3">
            <group-title><strong>group {{n}}</strong></group-title>
            <group>
                <cell v-for="m in 2">
                    {{n}}-{{m}}
                </cell>
            </group>
        </div>
        <back-to-top />
        <div class="btnInfo">
            <btn  theme="primary" size="sm" @click="doSomething">弹框</btn>
        </div>
    </div>
</template>
<script>
   export default{
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
</style>