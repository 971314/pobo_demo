<template>
  <div id="noviceNav">
    <span></span>
    <span></span>
  </div>
</template>
<style>
  #noviceNav{
    position:fixed;
    top:0;
    width:100%;
    height:2.5rem;
    /*background:black;*/
  }
  #noviceNav span:nth-child(1),#noviceNav span:nth-child(2){
    display: inline-block;
    width:7%;
    height:1.5rem;
    transform: translate(55%,37%);
  }
  #noviceNav span:nth-child(1){
    background:url("../../../assets/images/back.png") no-repeat;
    background-size: 100%;
  }
  #noviceNav span:nth-child(2){
    background:url("../../../assets/images/title-search.png") no-repeat;
    background-size: 100%;
  }
</style>
