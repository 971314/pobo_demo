<template>
  <a :href="functionalUrl" class="functional">
    <img :src="icon"/>
    <span v-model="name">{{name}}</span>
  </a>
</template>
<style>
.functional{
  background: #ffffff;
  width: 33.3%;
  display: inline-block;
  height: 6.5rem;
  padding: 1.3rem 0;
  /*border-bottom:1px solid #e4e7f0;*/
  /*margin-bottom:0.8rem;*/
  font-size: 15px;
  color:black;
}
  .functional img{
    width: 1.4rem;
    height: 1.6rem;
    display: block;
    margin:0 auto;
    margin-bottom: 0.5rem;
  }
.functional span{
  display: inline-block;
  width:100%;
  text-align: center;
}
</style>
<script>
export default {
    props:['icon','name','functionalUrl']
}
</script>
