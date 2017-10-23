<template>
  <div>
    <nav-bar :tip.sync="tip"></nav-bar>
    <group>
      <cell>
        <span slot="header">+86</span>
        <input-text placeholder="text input"    style='width:100%'  v-model="name"  />
      </cell>
    </group>
    <group>
      <cell>
        <span slot="header">密码</span>
        <input-text placeholder="text input"  type="password"  v-model="password"/>
      </cell>
    </group>

    <div class="btnDiv">
      <btn class="btns" block size="lg" @click="btnConfirm" theme="primary">登录</btn>
    </div>
  </div>
</template>
<script>
  import NavBar from '../../components/coNav.vue';
  export default {
    data:function(){
      return{
        tip:'登录',
        name:'admin',
        password:'23456'
      }
    },
    components: {
      NavBar : NavBar
    },
    methods:{
      btnConfirm:function(){
        this.$router.push('/main');
      }
    }
  }
</script>
<style>
  .btnDiv{text-align: center;  margin-top: 53px;}
  .btns{
    width: 93%;
    margin: auto;
    height: 47px;}
</style>
