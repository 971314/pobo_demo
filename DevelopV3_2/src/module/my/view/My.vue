<template>
  <div class="myBack">
    <common-nav style="background-color:hsla(0,0%,60%,0);width:100%;position:fixed;"></common-nav>
    <my-header :myBackImg.sync="userInfo.userBack" :headImg.sync="userInfo.userAvatar" :userName.sync="userInfo.userNickname" :coinBuilt.sync="userInfo.userCoin" :collection.sync="userInfo.collection" :collectionUrl.sync="userInfo.collectionUrl" @mysign="mysign"></my-header>
    <div class="myFunctional">
      <my-functional v-for="item in functional" :functionalUrl.sync="item.url" :icon.sync="item.icon" :name.sync="item.name" :key="item.id"></my-functional>
    </div>
    <div class="groupp">
      <my-group v-for="i in group" :linkUrl.sync="i.url" :groupImg.sync="i.icon" :name.sync="i.name" :key="i.id" v-if=""></my-group>
    </div>
  </div>
</template>
<script type="es6">
  import myHeader from '../components/myHeader.vue';
  import myFunctional from '../components/myFunctional.vue';
  import myGroup from '../components/myGroup.vue';
  import Axios from 'axios';
  export default {
    data(){
      return {
        userInfo:{
          userBack:'./images/beiJing.png',//背景图
          collectionUrl:'index.html?#/list',//收藏链接
          userAvatar:'',//头像
          userNickname:'',//昵称
          userCoin:'',//建投币
          collection:''//收藏
        },
        functional:[
          {
            url:'http://www.baidu.com',
            icon:'./images/icon-jianTouBiDiuHuan.png',
            name:'建投币兑换'
          },
          {
            url:'http://www.baidu.com',
            icon:'./images/icon-liCaiZiXuan.png',
            name:'理财自选'
          },
          {
            url:'http://www.baidu.com',
            icon:'./images/icon-zhangTing.png',
            name:'掌上营业厅'
          }
        ],
        group:[
          {
            url:'index.html?#/invitation',
            icon:'./images/icon-kaiHu.png',
            name:'好友分享'
          },
          {
            url:'http://www.baidu.com',
            icon:'./images/icon-huoDong.png',
            name:'我的活动'
          },
          {
            url:'http://www.baidu.com',
            icon:'./images/icon-ziLiao.png',
            name:'我的资料'
          }
        ],
        myInterface:'http://61.172.197.204:8890/PB_apply/WebService'
      }
    },
    created(){
       /*if(pbESYS.isHasLocalFile('reg',1)){
           var data = JSON.parse(pbESYS.readLocalFile('reg',1)),
             useId = pbESYS.getAppCertifyInfo('PbKey_H5_Home_Auth_UserId');
           if(useId === data.cUserid){
             this.userInfo.userAvatar = data.cIcon;
             this.userInfo.userNickname = data.cPetname;
             this.information();
           }else{
             this.userInfo.userNickname = '请先登录';
           }
       }*/

      this.information();
    },
    components:{
      myHeader:myHeader,
      myFunctional:myFunctional,
      myGroup:myGroup
    },
    methods:{
      mysign(){
          var _this = this;
        console.log('签到');
        Axios.post(_this.myInterface, {
          "func": 615,
          "cOrgid": "1046",
          "cUserid": "2",
          "token": "jkx+DdagVzYX9Gpj/aLN8cqGkhUW6GU8luLIjfpmFTUBF2JfsJhH0qxAJKHt48+SZmsAxDc7WufopQSOp8WUSGZrAMQ3O1rn6KUEjqfFlEjn/51UxU3GUGo42wi1eesN",
          "data":
            {
              "cLocalid": "2",
              "cType": "1"
            }
        }).then(function (data) {
          console.log(data.data);
          var Sign = data.data.retHead;
          console.log(data.data.retHead,typeof data.data.retHead)
          if(Sign == 1){
            _this.$toast({
              message: '签到成功，建投币+1',
              position: 'center',
            });
          }else if(Sign == -40){
              console.log('1')
            _this.$toast({
              message: '今日已签到',
              position: 'center',
            });
          }
        }).catch(function (err) {
          _this.$alert({
            maskClosable: true,
            btns: [{
              text: '关闭'
            }],
            title: '<h5 class="text-success">提示</h5>',
            message: '服务器异常！',
          })
        })
      },
      information(){
          var _this = this;
        Axios.post(_this.myInterface, {
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
          if(window.pbESYS){
            pbESYS.storePrivateData('userInfo',JSON.stringify({userAvatar:_this.userInfo.userAvatar,userNickname:_this.userInfo.userNickname}))
          }
        }).catch(function (err) {
          console.log(err)
        });
        Axios.post(_this.myInterface, {
          "func": 614,
          "cOrgid": "1046",
          "cUserid": "1",
          "token": "jkx+DdagVzYX9Gpj/aLN8cqGkhUW6GU8luLIjfpmFTUBF2JfsJhH0qxAJKHt48+SZmsAxDc7WufopQSOp8WUSGZrAMQ3O1rn6KUEjqfFlEjn/51UxU3GUGo42wi1eesN",
          "data":
            {
              "cLocalid": "1"
            }
        }).then(function (data) {
          console.log(data.data);
          _this.userInfo.userCoin = data.data.data.cScore ? data.data.data.cScore : 0;
          _this.userInfo.collection = data.data.data.cFavorites ? data.data.data.cFavorites : 0;
        }).catch(function (err) {
          console.log(err)
        })
      }
    }
  }
</script>
<style>
  .myBack{
    background:#f7f7fa;
    height:100%;
  }
  a{
    text-decoration:none;
  }
  .myFunctional{
    margin-bottom: 0.5rem;
    border-bottom: 1px solid #e4e7f0;
  }
  .groupp{
    border-top: 1px solid #e4e7f0;
    border-bottom:  1px solid #e4e7f0;
  }
</style>
