<template>
  <a :href="areaUrl" class="jump">
    <img :src="areaImg" :style="{ width: areaWidth, height: areaHeight }"/>
  </a>
</template>
<script type="es6">
  export default {
      props:['areaUrl','areaImg','areaWidth','areaHeight'],
  }
</script>
<style>
  .jump{
    display:inline-block;
  }
</style>
