<!--
<script>
    export default{
        el:'#app',
        data(){
            return {
                name:'guowenfh',
                age:'2q1'
            }
        }
    }
</script>
<template>
    <h1>姓名：{{name}}</h1>
    <h2>{{age}}</h2>
</template>
<style lang="sass">
    $qwe:#098;
    body{

    h1{

        color: red;
        transform: translate(10%, 10%);/*测试自动添加前缀*/
    }
    h1:hover{
        height:100px;
    }

    h2{

    }
    }
</style>-->
<script>
    //es6
    export default {
        el:"#app",
//data:function(){}，下面是es6写法
        data () {
            return {
                name:"guowenfh",
                age:"2q1"
            }
        }
    }
</script>
<template>
    <div>
        <h1>姓名：{{name}}</h1>
        <h2>{{age}}</h2>
    </div>
</template>
<style lang="sass">
    /*一定要加lang不然无法编译*/
    /*测试一下对sass的编译*/
    $qwe:#098;
    body{

    h1{

        color: red;
        transform: translate(10%, 10%);/*测试自动添加前缀*/
    }
    h1:hover{
        height:100px;
    }

    h2{

    }
    }
</style>