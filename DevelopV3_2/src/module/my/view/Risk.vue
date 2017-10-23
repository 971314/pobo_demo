<template>
  <div class="risk">
    <navbar>
      <div class="header">
        <a class="back" href="goBack">
          <img src="../../../assets/images/title-back.png">
        </a><a class="search" href="#">
          <img src="../../../assets/images/title-search.png">
        </a>
      </div>
      <div slot="body" id="title">
        合格投资者认定
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
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  created () {
    var rslt = localStorage.getItem('rslt');
    if (rslt) {
      this.$router.push('/risk/rslt/' + rslt);
    }
  },
  mounted () {
  }
}
</script>

<style>
body {
  background-color: #f7f7fa;
}
.risk {
  padding-top: 44px;
}
.risk .navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  font-size: 17px;
  color: #fff;
  background-color: #eb1212;
  z-index: 1030;
}
.risk .navbar-header, .risk .navbar-footer {
  -webkit-box-flex: .4;
  -ms-flex: .4;
  flex: .4;
}
.risk .navbar-header {
  padding-right: 0;
}
.risk .navbar-header a {
  display: block;
  float: left;
  margin-top: 10px;
  margin-bottom: 10px;
  height: 23px;
  line-height: 21px;
}
.risk .navbar-header .back {
  margin-right: 15px;
}
.risk .navbar-header .back img {
  height: 18px;
}
.risk .navbar-header .search img {
  height: 17px;
}
.risk .navbar-body {
  position: relative;
  padding: 0;
  -webkit-box-flex: 1.2;
  -ms-flex: 1.2;
  flex: 1.2;
  line-height: 42px;
}
.risk .navbar-footer {
  padding-left: 0;
}
.risk .navbar-footer a {
  display: block;
  float: right;
  margin-top: 10px;
  margin-bottom: 10px;
  height: 23px;
  line-height: 21px;
}
.risk .navbar-footer .service {
  margin-right: 15px;
}
.risk .navbar-footer .service img {
  height: 18px;
}
.risk .navbar-footer .message img {
  height: 14px;
}
</style>
