<template>
  <div class="groupDiv">
    <a :href="linkUrl" v-model="name" class="groupC">
      <img :src="groupImg" class="iconimg"/>
      {{name}}
    <img :src="youJianTou" class="groupimg"/>
    </a>
  </div>
</template>
<script>
  import youJianTou from '../images/yuoJianTou.png';
  export default {
      data(){
          return {
            youJianTou:youJianTou
          }
      },
    props:['linkUrl','groupImg','name']
  }
</script>
<style>
  .groupDiv{
    background:#ffffff;
  }
  .groupC{
    display:inline-block;
    border-bottom: 1px solid #e4e7f0;
    font-size: 16px;
    height:2.7rem;
    line-height:2.7rem;
    width:93%;
    color:black;
    margin-left: 1.5rem;
  }
  .groupC .groupimg{
    float:right;
    width:3%;
    margin-right:1rem;
    margin-top:1rem;
  }
  .iconimg{
    width:6%;
    height:1rem;
    margin:0 1.5rem 0 0 ;
  }
</style>
