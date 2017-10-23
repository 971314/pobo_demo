<template>
  <div class="list">
    <span class="container" :class="{hide:isHide,select:isSelect}" @click="listSelectClick"></span>
    <!--<input type="checkbox" name="list" class="inputCheck"/>-->
    <a :href="url" class="aBlock">
      <div class="news" :style="isHide ? 'width:73%':'width:65%'">
        <span v-model="title">{{title}}</span>
        <span v-model="source">{{source}}</span>
        <span v-model="time">{{time}}</span>
      </div>
      <img :src="newsImg" class="newImg"/>
    </a>
  </div>
</template>
<script>
  export default {
      props:['url','source','title','time','newsImg','isHide','inputValue','isSelect'],
    methods:{
      listSelectClick(){
          this.$emit('listSelectClick');
      }
    }
  }
</script>
<style>
  /*checkbox state*/
  /*.container{position: relative;display:inline-block;max-height: 20px;bottom:1rem;}
  .container .input_check {position: absolute;visibility: hidden;}
  .container .input_check+label {display: inline-block;width: 20px;height: 20px;border: 1px solid #c0c6cd;border-radius:10px;}
  .container .input_check:checked+label{background:red;border: 1px solid red}
  .container .input_check:checked+label:after {
    content: "";
    position: absolute;
    left: 2px;
    bottom: 6px;
    width: 12px;
    height: 8px;
    border: 2px solid #ffffff;
    border-top-color: transparent;
    border-right-color: transparent;
    -webkit-transform: rotate(-60deg);
    transform: rotate(-61deg);
  }*/
  /*checkbox end*/
  .container{
    display:inline-block;
    padding: 1.3rem 0.6rem;
    background:url("../images/unselect.png") no-repeat;
    background-size: 100%;
  }
  .select{
    background:url("../images/select.png") no-repeat;
    background-size: 100%;
  }
  .list{
    display: block;
    padding: 0.6rem 1rem;
    height:5rem;
    border-bottom:1px solid #e4e7f0;
    text-decoration:none;
  }
  .aBlock{
    display:inline-block;
    width:90%;
  }
  .news{
    display: inline-block;
    padding-left:1rem;
    width:58%
  }
  .news>span:nth-child(1){
    display: block;
    /*font-size: 15px;*/
    color:black;
  }
  .news>span:nth-child(2),.news>span:nth-child(3){
    color:#808086;
    font-size:14px;
    margin-top:0.5rem;
  }
  .news>span:nth-child(2){
    display: inline-block;
  }
  .news>span:nth-child(3){
    display: inline-block;
  }
  .newImg{
    width: 27%;
    height: 5rem;
    position: absolute;
  }
  .hide{
    display:none;
  }
</style>
