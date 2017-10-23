<template>
  <div class="width95">
    <a :href="hrefUrl" class="block">
      <img :src="imgUrl"/>
    </a>
  </div>
</template>
<script>
  export default {
      props:['hrefUrl','imgUrl']
  }
</script>
<style>
  div.width95{
    width: 93%;
    margin: 0 auto;
    margin-top: 15px;
  }
  img{
    width:100%;
  }
  .block{
    display:block;
  }
</style>
