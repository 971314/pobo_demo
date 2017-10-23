<template>
  <div id="noviceNav">
    <span></span>
    <span></span>
    <div></div>
    <span @click="customer"></span>
    <co-message-icon></co-message-icon>
  </div>
</template>
<script>
  import coMessageIcon from '../../../components/coMessageIcon.vue'
  export default {
    components:{
        coMessageIcon:coMessageIcon
      },
    methods:{
      customer(){
          console.log('1')
//        location.href = 'pobo:pageId=800007&qq=&tel='
      }
    }
  }
</script>
<style>
  #noviceNav{
    position:fixed;
    top:0;
    width:100%;
    height:2.5rem;
  }
  #noviceNav div{
    display: inline-block;
    width:55%;
  }
  #noviceNav span:nth-child(1),#noviceNav span:nth-child(2),#noviceNav span:nth-child(3),#noviceNav span:nth-child(4),#noviceNav span:nth-child(5){
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
  #noviceNav span:nth-child(4){
    background:url("../../../assets/images/service.png") no-repeat;
    background-size: 100%;
  }
  /*#noviceNav span:nth-child(5){
    background:url("../../../assets/images/message.png") no-repeat;
    background-size: 100%;
    margin-left:.8rem;
  }*/
  #noviceNav a{
    margin-left:1.3rem;
  }
</style>
