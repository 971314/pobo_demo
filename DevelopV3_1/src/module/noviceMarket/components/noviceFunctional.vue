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
    width: 18.4%;
    padding: 6% 2.2%;
    border: 1px solid #e4e7f0;
    background: #ffffff;
    font-size: 13px;
    border-radius: 10px;
    color: #1a1a1a;
  }
  .noviceFunctional>img{
    width: 1rem;
    height: 2rem;
    display: block;
    padding-bottom: 0.5rem;
    margin: 0 auto;
  }
  .noviceFunctional>span{
    display: inline-block;
    width:100%;
    text-align: center;
  }
</style>
