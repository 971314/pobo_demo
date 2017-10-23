<template>
  <nav>
    <a href="goBack" :class="{placeholder:navIsShow}" >
      <img :src="goBack"/>
    </a>
    <span class="tip">{{captionText}}</span>
    <span @click="edit" class="right">{{rigthText}}</span>
  </nav>
</template>
<script>
  import goBack from '../images/goBack.png';
  export default {
      data(){
        return {
            goBack:goBack,
        }
      },
      props:['captionText','rigthText','navIsShow'],
    methods:{
      edit(){
          this.$emit('edit')
      }
    }
  }
</script>
<style>
  nav{
    position:fixed;
    top:0;
    background:#eb1212;
    width:100%;
    height:3.2rem;
    line-height:3.2rem;
    color:#ffffff;
  }
  .tip,.right{
    display: inline-block;
  }
  .tip{
    font-size: 20px;
    width: 70%;
    text-align: center;
  }
  .right{
    font-size: 18px;
  }
  nav a {
    display:inline-block;
    padding-left: 1rem;
    width: 7%;
  }
  nav a img{
    width: 84%;
  }
  .placeholder{
    visibility:hidden;
  }
</style>
