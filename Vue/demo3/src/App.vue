<template>
  <div id="app">
    <img src="./assets/logo.png"/>
    <h1>{{msg}}</h1>
    <firstcomponent></firstcomponent>
    <secondcomponent></secondcomponent>
    <ul>
      <li><router-link to="/first">点我跳转第一个页面</router-link></li>
      <li><router-link to="/second">点我跳转第二个页面</router-link></li>
    </ul>
    <router-view class="view"></router-view>
  </div>
</template>

<script>
  import firstcomponent from './component/firstcomponent.vue'
  import secondcomponent from './component/secondcomponent.vue'
export default {
  name: 'app',
  data () {
    return {
      msg: 'Hello Vue'
    }
  },
    components:{firstcomponent,secondcomponent}
}
</script>

<style>
body{
  font-family:Helvetica,sans-serif;
}
</style>
