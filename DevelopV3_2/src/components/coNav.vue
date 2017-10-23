<template>
    <div>
        <nav class="navInfo navbar-fixed-top">
            <div class="titleBack initHeight"><img :src='backImg'/></div>
            <div class="login-nav">{{tip}}</div>
        </nav>
    </div>
</template>
<script>
    import backImg from '../assets/images/back.png';
    export default{
        props:['tip'],
        data:function(){
            return{
                backImg:backImg
            }
        }
    }
</script>
<style>
    .login-nav{text-align: center;float:left;width:69%;color:#ffffff;font-size:20px; line-height: 44px;}
    .titleBack{text-align: center;float:left;width:15%;}
    .initHeight{height:1px;}
    .navInfo {
        width: 100%;
        height: 44px;
        background: #2196f3;
        line-height: 44px;
        min-height: 44px;
    }
    .navbar-fixed-top {
        top: 0;
        border-width: 0 0 1px;
    }
</style>