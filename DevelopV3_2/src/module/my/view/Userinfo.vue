<template>
  <div class="user-info">
    <navbar id="userinfoNavbar">
      <div class="header">
        <a class="back" href="goBack">
          <img src="../../../assets/images/title-back.png">
        </a><a class="search" href="#">
          <img src="../../../assets/images/title-search.png">
        </a>
      </div>
      <div slot="body" id="title">
        资料管理
      </div>
      <div slot="footer">
        <a class="message" href="#">
          <img src="../../../assets/images/message.png">
        </a><a class="service" href="#">
          <img src="../../../assets/images/service.png">
        </a>
      </div>
    </navbar>
    <div>
      <router-view :ws="ws" :userAutInfo="userAutInfo" :userInfo="userInfo"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ws: 'http://192.168.6.118:8080/PB_customers/WebService',
      userAutInfo: {
        cOrgid: '1046',
        cUserid: '1',
        token: 'jkx+DdagVzYX9Gpj/aLN8cqGkhUW6GU8luLIjfpmFTUBF2JfsJhH0qxAJKHt48+SZmsAxDc7WufopQSOp8WUSGZrAMQ3O1rn6KUEjqfFlEjn/51UxU3GUGo42wi1eesN',
        cLoginname: '13434253455'
      },
      userInfo: {
        id: '',
        avatar: '',
        nickname: '',
        sexFlag: '',
        birthday: '',
        jobFlag: '',
        job: '',
        mail: ''
      }
    }
  },
  created () {
    var _this = this;
    _this.$axios.post(_this.ws, {
      func: 611,
      cOrgid: _this.userAutInfo.cOrgid,
      cUserid: _this.userAutInfo.cUserid,
      token: _this.userAutInfo.token,
      data: {
        cLoginname: _this.userAutInfo.cLoginname
      }
    }).then(function (axiosData) {
      var data = axiosData.data;
      _this.userInfo.id = data.data.cId;
      _this.userInfo.avatar = data.data.cIcon;
      _this.userInfo.nickname = data.data.cPetname;
      _this.userInfo.sexFlag = data.data.cSex;
      _this.userInfo.birthday = data.data.cBirthday;
      _this.userInfo.jobFlag = data.data.cProfession;
      _this.userInfo.job = data.data.cProname;
      _this.userInfo.mail = data.data.cMail;
    }).catch(function (error) {
      console.error(error);
    });
  }
}
</script>

<style>
body {
  background-color: #f7f7fa;
}
.user-info {
  padding-top: 44px;
}
.user-info .navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  font-size: 17px;
  color: #fff;
  background-color: #eb1212;
  z-index: 1030;
}
.user-info .navbar-header, .user-info .navbar-footer {
  -webkit-box-flex: .4;
  -ms-flex: .4;
  flex: .4;
}
.user-info .navbar-header {
  padding-right: 0;
}
.user-info .navbar-header a {
  display: block;
  float: left;
  margin-top: 10px;
  margin-bottom: 10px;
  height: 23px;
  line-height: 21px;
}
.user-info .navbar-header .back {
  margin-right: 15px;
}
.user-info .navbar-header .back img {
  height: 18px;
}
.user-info .navbar-header .search img {
  height: 17px;
}
.user-info .navbar-body {
  position: relative;
  padding: 0;
  -webkit-box-flex: 1.2;
  -ms-flex: 1.2;
  flex: 1.2;
  line-height: 42px;
}
.user-info .navbar-footer {
  padding-left: 0;
}
.user-info .navbar-footer a {
  display: block;
  float: right;
  margin-top: 10px;
  margin-bottom: 10px;
  height: 23px;
  line-height: 21px;
}
.user-info .navbar-footer .service {
  margin-right: 15px;
}
.user-info .navbar-footer .service img {
  height: 18px;
}
.user-info .navbar-footer .message img {
  height: 14px;
}
</style>
