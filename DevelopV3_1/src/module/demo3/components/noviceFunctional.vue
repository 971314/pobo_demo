<template>
  <a :href="functionalUrl" class="noviceFunctional">
    <img :src="functionalIcon"/>
    <span v-model="name">{{name}}</span>
  </a>
</template>
<script>
  export default {
      props:['functionalUrl','functionalIcon','name']
  }
</script>
<style>
  .noviceFunctional{
    display: inline-block;
    width: 23.4%;
    padding: 1.3rem 0.5rem;
    border: 1px solid #e4e7f0;
    background: #ffffff;
    font-size: 13px;
    border-radius: 10px;
    color:#1a1a1a;
  }
  .noviceFunctional>img{
    width: 2rem;
    height: 4rem;
    display: block;
    padding-bottom: 1.5rem;
    margin: 0 auto;
  }
  .noviceFunctional>span{
    display: inline-block;
    width:100%;
    text-align: center;
  }
</style>
