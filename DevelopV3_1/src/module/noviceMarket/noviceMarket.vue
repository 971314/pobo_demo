<template>
  <div class="novice">
    <a href="" class="noviceHeadUrl">
   <img :src="novice.noviceHead"/>
    </a>
    <div id="functional">
      <div class="novicebody">
        <novice-functional v-for="noviceFunctional in novice.noviceFunctional" :functionalIcon.sync="noviceFunctional.iconUrl" :name.sycn="noviceFunctional.name" :functionalUrl.sync="noviceFunctional.url"></novice-functional>
      </div>
      <div class="novicebody">
        <div class="noviceTitle">专门热线</div>
        <novice-jump v-for="(hotAre,i) in novice.hotArea" :areaUrl.sync="hotAre.url" :areaImg.sync="hotAre.imgUrl" :areaWidth.sync="hotAre.imgWidth" :areaHeight.sync="hotAre.imgHeight" class="mr036"></novice-jump>
      </div>
      <div class="novicebody">
        <div class="noviceTitle">模拟游戏</div>
        <novice-jump :areaUrl.sync="novice.simulation.url" :areaImg.sync="novice.simulation.imgUrl" :areaWidth.sync="novice.simulation.imgWidth" :areaHeight.sync="novice.simulation.imgHeight"></novice-jump>
      </div>
      <div class="novicebody">
        <div class="noviceTitle">进阶必备</div>
        <novice-jump v-for="hotAre in novice.hotArea" :areaUrl.sync="hotAre.url" :areaImg.sync="hotAre.imgUrl" :areaWidth.sync="hotAre.imgWidth" :areaHeight.sync="hotAre.imgHeight" class="mr036"></novice-jump>
      </div>
    </div>
  </div>
</template>
<script>
  import noviceJump from './components/noviceJump.vue';
  import noviceFunctional from './components/noviceFunctional.vue';
  export default {
      data(){
          return {
            novice:{
              noviceHead:'http://61.172.197.204/xy/1190/zhong/xinShouZhuanQu.png',
              noviceFunctional:[
                {
                  iconUrl:'http://61.172.197.204/xy/1190/zhong/icon.png',
                  name:'软件介绍',
                  url:'www.baic.com'
                },
                {
                  iconUrl:'http://61.172.197.204/xy/1190/zhong/icon.png',
                  name:'软件介绍',
                  url:'www.baic.com'
                },
                {
                  iconUrl:'http://61.172.197.204/xy/1190/zhong/icon.png',
                  name:'软件介绍',
                  url:'www.baic.com'
                },
                {
                  iconUrl:'http://61.172.197.204/xy/1190/zhong/icon.png',
                  name:'软件介绍',
                  url:'www.baic.com'
                }
              ],
              hotArea:[
                {
                  url:'www.baidu.com',
                  imgUrl:'http://61.172.197.204/xy/1190/zhong/jiaoYi.png',
                  imgWidth:'100%',
                  imgHeight:'4rem'
                },
                {
                  url:'www.baidu.com',
                  imgUrl:'http://61.172.197.204/xy/1190/zhong/jiaoYi.png',
                  imgWidth:'100%',
                  imgHeight:'4rem'
                }
              ],
              simulation:{
                url:'www.baidu.com',
                imgUrl:'http://61.172.197.204/xy/1190/zhong/youXi.png',
                imgWidth:'200%',
                imgHeight:'6.5rem'
              }
            }
          }
      },
    components:{
      noviceJump:noviceJump,
      noviceFunctional:noviceFunctional
    }
  }
</script>
<style>
  html, body{font-family:Helvetica,"Microsoft YaHei",Arial,sans-serif;background:#ffffff;margin:0}
  .noviceHeadUrl{
    display: inline-block;
    height:11rem;
  }
  .noviceHeadUrl img{
    width:100%;
    height:100%;
  }
  .noviceFunctional:nth-child(1),.noviceFunctional:nth-child(2),.noviceFunctional:nth-child(3){
    margin-right:2%;
  }
  .noviceTitle{
    margin: 0.7rem 0 0.4rem 0;
  }
  #functional{
    width:90%;
    margin:0 auto;
    margin-top: 0.4rem;
  }
  .mr036:nth-child(2){
    margin-right:0.36rem;
  }
</style>
