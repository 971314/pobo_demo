<template>
  <div id="back">
    <common-nav><span slot="body">好友邀请</span></common-nav>
    <div class="invitation">
      <div class="above">
        <img :src="headImg">
        <span>{{nickname}}</span>
        <span class="share" @click="share()"></span>
      </div>
      <div class="qimages"><img :src="QRCode"/></div>
      <span class="fonter">扫描/长按二维码<br/>下载<span>{{corporate}}</span>期货公司客户端</span>
    </div>
  </div>
</template>
<script type="es6">
  import commonNav from '../../../components/coCommonNav.vue';
  import Axios from 'axios';
  export default{
    data(){
      return {
        headImg:'http://61.172.197.204/xy/1190/zhong/haoYouYaoQing.png',
        nickname:'张小澜',
        QRCode:'',
        corporate:' ',
        URL:'http://61.172.197.204:8890/PB_apply/WebService'
      }
    },
    created(){
        var _this = this;
      if(window.pbESYS){
        var userinfo = pbESYS.getPrivateData('userInfo');
        if(userinfo){
            userinfo = JSON.parse(userinfo);
            _this.nickname = userinfo.userNickname;
            _this.headImg = userinfo.userAvatar;
        }
      }
      Axios.post(_this.URL, {//
        "func": 620,
        "cOrgid": "1046",
        "cUserid": "1",
        "token": "jkx+DdagVzYX9Gpj/aLN8cqGkhUW6GU8luLIjfpmFTUBF2JfsJhH0qxAJKHt48+SZmsAxDc7WufopQSOp8WUSGZrAMQ3O1rn6KUEjqfFlEjn/51UxU3GUGo42wi1eesN",
        "data":
          {
            "cLocalid": "1",
          }
      }).then(function (data) {
        console.log(data.data);
        _this.QRCode = data.data.data.image;
        _this.corporate = data.data.data.companyName;
      }).catch(function (err) {
        console.log(err)
      })
      Axios.post(_this.dataInterface, {
        "func": 611,
        "cOrgid": "1046",
        "cUserid": "1",
        "token": "jkx+DdagVzYX9Gpj/aLN8cqGkhUW6GU8luLIjfpmFTUBF2JfsJhH0qxAJKHt48+SZmsAxDc7WufopQSOp8WUSGZrAMQ3O1rn6KUEjqfFlEjn/51UxU3GUGo42wi1eesN",
        "data":
          {
            "cLocalid": "1",
            "cLoginname": "13434253455"
          }
      }).then(function (data) {
        console.log(data.data);
        _this.userInfo.userAvatar = data.data.data.cIcon;
        _this.userInfo.userNickname = data.data.data.cPetname;
      }).catch(function (err) {
        console.log(err)
      })
    },
    components:{
      commonNav:commonNav
    },
    methods:{
      share(){
          console.log('111');
        location.href = 'pobo:pageId=800012&type=1';
      }
    }
  }
</script>
<style>
  html, body{font-family:Helvetica,"Microsoft YaHei",Arial,sans-serif;background:#ffffff;margin:0}
  .invitation{
    width:70%;
    margin:0 auto;
    padding-top:5rem;
  }
  .above img,.above span{
    display: inline-block;
  }
  .above img{
    width:27%;
    /*height:4rem;*/
    vertical-align: middle
  }
  .above span{
    padding-left:1rem;
    font-size: 23px;
  }
  .qimages img{
    margin-top:2.5rem;
    margin-bottom: 3rem;
    width:100%;
  }
  .fonter{
    font-size: 12px;
    color:#808086;
    text-align: center;
    display: block;
  }
  .above .share{
    padding:1rem;
    background:url("../images/fengXiang.png") no-repeat;
    background-size: 100%;
    margin-top: 1rem;
    float:right;
  }
</style>
