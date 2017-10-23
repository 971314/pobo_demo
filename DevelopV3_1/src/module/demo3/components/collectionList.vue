<template>
  <a :href="url" class="list">
    <span class="container"><input type="checkbox"class="input_check" id="check4"><label for="check4"></label></span>
    <div class="news">
      <span v-model="title">{{title}}</span>
      <span v-model="source">{{source}}</span>
      <span v-model="time">{{time}}</span>
    </div>
    <img :src="newsImg" class="newImg"/>
  </a>
</template>
<script>
  export default {
      props:['url','source','title','time','newsImg']
  }
</script>
<style>
  /*checkbox state*/
  .container{position: relative;display:inline-block;max-height: 20px;bottom:1rem;}
  .container .input_check {position: absolute;visibility: hidden;}
  .container .input_check+label {display: inline-block;width: 20px;height: 20px;border: 1px solid #e4e7f0;border-radius:10px;}
  .container .input_check:checked+label{background:red;border: 1px solid red}
  .container .input_check:checked+label:after {
    content: "";
    position: absolute;
    left: 2px;
    bottom: 8px;
    width: 14px;
    height: 8px;
    border: 2px solid #ffffff;
    border-top-color: transparent;
    border-right-color: transparent;
    -webkit-transform: rotate(-60deg);
    transform: rotate(-61deg);
  }
  /*checkbox end*/
  .list{
    display: block;
    padding: 1.5rem 1rem;
    height:9rem;
    border-bottom:1px solid #e4e7f0;
  }
  .news{
    display: inline-block;
    padding-left:1.2rem;
    width:59%
  }
  .news>span:nth-child(1){
    display: block;
    font-size: 15px;
    color:black;
  }
  .news>span:nth-child(2),.news>span:nth-child(3){
    color:#808086;
  }
  .news>span:nth-child(2){
    display: inline-block;
  }
  .news>span:nth-child(3){
    display: inline-block;
  }
  .newImg{
    width: 32%;
    height: 6rem;
    position: absolute;
  }
</style>
