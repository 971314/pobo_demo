<template>
  <div class="back">
    <!--套保套利-->
    <!--<div v-for="(item, index) in items">
      <templet :hrefUrl.sync="item.hrefUrl" :imgUrl.sync="item.imgUrl" v-if="index == '0'" style="margin-top:15px;"></templet>
      <templet :hrefUrl.sync="item.hrefUrl" :imgUrl.sync="item.imgUrl" v-else></templet>
    </div>-->
    <!--my-->
    <!--<my-header :myBackImg.sync="my.myBackImg" :userName.sync="my.userName" :headImg.sync="my.headImg" :coinBuilt.sync="my.coinBuilt" :collection.sync="my.collection" @sign="sign" :collectionUrl.sync="my.collectionUrl"></my-header>
    <div>
      <my-functional v-for="functional in functionals" :icon.sync="functional.icon" :name.sync="functional.name"></my-functional>
    </div>
    <div v-for="group in groups">
      <my-group v-if="group.name" :linkUrl.sync="group.linkUrl" :name.sync="group.name" :groupImg.sync="group.groupImg"></my-group>
      <div class="jianGe" v-else></div>
    </div>-->
    <!--新手入市-->
    <!--<a href="" class="noviceHeadUrl">
   <img :src="novice.noviceHead"/>
    </a>
    <div id="functional">
      <div class="novicebody">
        <novice-functional v-for="noviceFunctional in novice.noviceFunctional" :functionalIcon.sync="noviceFunctional.iconUrl" :name.sycn="noviceFunctional.name" :functionalUrl.sync="noviceFunctional.url" class="aaa"></novice-functional>
      </div>
      <div class="novicebody">
        <div class="noviceTitle">专门热线</div>
        <novice-jump v-for="hotAre in novice.hotArea" :areaUrl.sync="hotAre.url" :areaImg.sync="hotAre.imgUrl" :areaWidth.sync="hotAre.imgWidth" :areaHeight.sync="hotAre.imgHeight" class="jum"></novice-jump>
      </div>
      <div class="novicebody">
        <div class="noviceTitle">模拟游戏</div>
        <novice-jump :areaUrl.sync="novice.simulation.url" :areaImg.sync="novice.simulation.imgUrl" :areaWidth.sync="novice.simulation.imgWidth" :areaHeight.sync="novice.simulation.imgHeight"></novice-jump>
      </div>
      <div class="novicebody">
        <div class="noviceTitle">进阶必备</div>
        <novice-jump v-for="hotAre in novice.hotArea" :areaUrl.sync="hotAre.url" :areaImg.sync="hotAre.imgUrl" :areaWidth.sync="hotAre.imgWidth" :areaHeight.sync="hotAre.imgHeight" class="jum"></novice-jump>
      </div>
    </div>-->
    <!--4.好友邀请-->
    <!--<div class="invitation">
      <div class="above">
     <img :src="friendInvitation.headImg">
        <span>{{friendInvitation.nickname}}</span>
      </div>
      <div class="qimages"><img :src="friendInvitation.QRCode"/></div>
      <span class="fonter">扫面/长按二维码，下载<span>{{friendInvitation.corporate}}</span>期货公司客户端</span>
    </div>-->
    <!--收藏列表-->
    <!--<collection-list v-for="collection in collections" :url.sync="collection.url" :title.sync="collection.title" :source.sync="collection.source" :time.sync="collection.titme" :newsImg.sync="collection.newsImg" :key="collection.id"></collection-list>-->
    <!--<group-title>Circle</group-title>
    <group>
      <cell>
        <checkbox type="circle" @change="changeHandle">default</checkbox>
        <checkbox type="circle" slot="footer" v-model="checked" @change="changeHandle">checked</checkbox>
      </cell>
    </group>-->
  </div>
</template>
<script>
  import templet from './components/templet.vue';
  import myHeader from './components/myHeader.vue';
  import myFunctional from './components/myFunctional.vue';
  import jianTouBi from './images/jianTouBi.png';
  import myGroup from './components/myGroup.vue';
  import kaiHu from './images/kaiHu.png';
  import noviceFunctional from './components/noviceFunctional.vue';
  import noviceJump from './components/noviceJump.vue';
  import collectionList from './components/collectionList.vue';
  export default {
      data(){
          return {
              items:[
                {
                  hrefUrl:'http://www.baidu.com',
                  imgUrl:'http://61.172.197.204/xy/1190/zhong/1.png'
                },
                {
                  hrefUrl:'http://www.baidu.com',
                  imgUrl:'http://61.172.197.204/xy/1190/zhong/1.png'
                },
                {
                  hrefUrl:'http://www.baidu.com',
                  imgUrl:'http://61.172.197.204/xy/1190/zhong/1.png'
                }
              ],
            my:{
              myBackImg:'http://61.172.197.204/xy/1190/zhong/myBack.png',
              userName:'小箭头',
              headImg:'http://61.172.197.204/xy/1190/zhong/head.png',
              coinBuilt:'100',
              collection:'10',
              collectionUrl:'www.baidu.com'
            },
            functionals:[
              {
                  icon:jianTouBi,
                name:'建投币兑换'
              },
              {
                icon:jianTouBi,
                name:'理财自选'
              },
              {
                icon:jianTouBi,
                name:'掌声营业厅'
              }
            ],
            groups:[
              {
                linkUrl:'www.baidu.com',
                name:'我要开户',
                groupImg:kaiHu
              },
              {

              },
              {
                linkUrl:'www.baidu.com',
                name:'我要开户',
                groupImg:kaiHu
              },
              {
                linkUrl:'www.baidu.com',
                name:'我要开户',
                groupImg:kaiHu
              },
              {
                linkUrl:'www.baidu.com',
                name:'我要开户',
                groupImg:kaiHu
              }
            ],
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
                  imgHeight:'5.5rem'
                },
                {
                  url:'www.baidu.com',
                  imgUrl:'http://61.172.197.204/xy/1190/zhong/jiaoYi.png',
                  imgWidth:'100%',
                  imgHeight:'5.5rem'
                }
              ],
              simulation:{
                url:'www.baidu.com',
                imgUrl:'http://61.172.197.204/xy/1190/zhong/youXi.png',
                imgWidth:'100%',
                imgHeight:'8rem'
              }
            },
            friendInvitation:{
              headImg:'http://61.172.197.204/xy/1190/zhong/haoYouYaoQing.png',
              nickname:'张小澜',
              QRCode:'http://61.172.197.204/xy/1190/zhong/haoYouYaoQing.png',
              corporate:'XX'
            },
            collections:[
              {
                url:'www.baicu.com',
                hecked:true,
                unhecked:false,
                title:'深交所:紧盯年末“突击创利”严防严管利润操作',
                source:'热点话题',
                titme:'03-05 17:35',
                newsImg:'http://61.172.197.204/xy/1190/zhong/haoYouYaoQing.png'
              },
              {
                url:'www.baicu.com',
                hecked:true,
                unhecked:false,
                title:'深交所:紧盯年末“突击创利”严防严管利润操作',
                source:'热点话题',
                titme:'03-05 17:35',
                newsImg:'http://61.172.197.204/xy/1190/zhong/haoYouYaoQing.png'
              },
              {
                url:'www.baicu.com',
                hecked:true,
                unhecked:false,
                title:'深交所:紧盯年末“突击创利”严防严管利润操作',
                source:'热点话题',
                titme:'03-05 17:35',
                newsImg:'http://61.172.197.204/xy/1190/zhong/haoYouYaoQing.png'
              },
              {
                url:'www.baicu.com',
                hecked:true,
                unhecked:false,
                title:'深交所:紧盯年末“突击创利”严防严管利润操作',
                source:'热点话题',
                titme:'03-05 17:35',
                newsImg:'http://61.172.197.204/xy/1190/zhong/haoYouYaoQing.png'
              },
              {
                url:'www.baicu.com',
                hecked:true,
                unhecked:false,
                title:'深交所:紧盯年末“突击创利”严防严管利润操作',
                source:'热点话题',
                titme:'03-05 17:35',
                newsImg:'http://61.172.197.204/xy/1190/zhong/haoYouYaoQing.png'
              }
            ]
          }
      },
    components:{
      templet:templet,
      myHeader:myHeader,
      myFunctional:myFunctional,
      myGroup:myGroup,
      noviceFunctional:noviceFunctional,
      noviceJump:noviceJump,
      collectionList:collectionList
    },
    methods:{
      sign(){
        /*this.$alert({
          maskClosable: true,
          btns: [{
            text: '关闭',
            click:function() {
            },
          }],
          title: '<h5 class="text-success">提示</h5>',
          message: '以后弹框就用我吧！',
        })*/
        console.log('1');
      }
    }
  }
</script>
<style>
  .back{
    background:#ffffff;
    height:100%;
  }
/*.jianGe{
  height:0.8rem;
  width:100%;
}
  .noviceHeadUrl{
    width:100%;
    height:14rem;
    display:block;
  }
.noviceHeadUrl>images{
  height:14rem;
}
  #functional{
    margin: 0.6rem 1rem;
  }
#functional .novicebody{
  margin-bottom: 0.9rem;
  }
  .aaa:nth-child(1),.aaa:nth-child(2),.aaa:nth-child(3){
    margin-right:2.1%;
  }
  .noviceTitle{
    font-size: 16px;
    margin-bottom: 0.5rem;
  }
.jum{
  width:49%;
}
  .jum:nth-child(2){
    margin-right: 0.49rem;
  }*/
  /*好友邀请*/
  .invitation{
    width:70%;
    margin:0 auto;
    padding-top:5.5rem;
  }
.above img,.above span{
  display: inline-block;
}
  .above img{
    width:5rem;
    height:5rem;
  }
  .above span{
    padding-left:1rem;
    font-size: 23px;
  }
  .qimages img{
    margin-top:3rem;
    margin-bottom: 5rem;
    /*width:100%;*/
  }
  .fonter{
    font-size: 14px;
    color:#808086;
  }
  /*收藏列表*/
  /*.piaochecked {
    width: 20px;
    height: 20px;
    float: left;
    cursor: pointer;
    margin-left: 10px;
    text-align: center;
    !*background-image: url(images/checkbox_01.gif);*!
    background-repeat: no-repeat;
    background-position: 0 0;
  }

  .on_check {
    background-position: 0 -21px;
  }
  .radioclass {
    opacity: 0;
    cursor: pointer;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    filter: alpha(opacity=0);
  }*/
</style>
