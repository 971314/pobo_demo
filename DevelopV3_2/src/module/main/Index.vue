<template>
  <div class="index">
    <navbar theme="transparent">
      <city />
      <div slot="body">
        <img class="search" src="./images/search.png">
        <img class="search-box" src="./images/search-box.png">
        <img class="speak" src="./images/speak.png">
      </div>
      <div slot="footer">
        <a class="message" href="#">
          <img src="../../assets/images/message.png">
        </a><a class="service" href="#">
          <img src="../../assets/images/service.png">
        </a>
      </div>
    </navbar>
    <div>
      <swipe>
        <swipe-item>
          <img src="./images/hm_bg01.png">
        </swipe-item>
        <swipe-item>
          <img src="./images/hm_bg01.png">
        </swipe-item>
      </swipe>
      <div class="notice clearfix">
        <div>
          <img src="./images/notice.png">
        </div>
        <vertical-swipe />
        <div>
          <img src="../../assets/images/arrow-right.png">
        </div>
      </div>
      <div class="main-func">
        <flex class="first-row">
          <flex-item>
            <a href="#">
              <img src="./images/main-func-first-1.png">
            </a>
          </flex-item>
          <flex-item>
            <a href="#">
              <img src="./images/main-func-first-2.png">
            </a>
          </flex-item>
        </flex>
        <flex class="second-row">
          <flex-item>
            <a href="#">
              <img src="./images/main-func-second-1.png">
            </a>
          </flex-item>
          <flex-item>
            <a href="#">
              <img src="./images/main-func-second-2.png">
            </a>
          </flex-item>
          <flex-item>
            <a href="#">
              <img src="./images/main-func-second-3.png">
            </a>
          </flex-item>
        </flex>
      </div>
      <div class="common-func">
        <flex>
          <flex-item>
            <a href="#">
              <img src="./images/common-func-1.png">
              <p>开户</p>
            </a>
          </flex-item>
          <flex-item>
            <a href="#">
              <img src="./images/common-func-2.png">
              <p>业务办理</p>
            </a>
          </flex-item>
          <flex-item>
            <a href="#">
              <img src="./images/common-func-3.png">
              <p>场外报价</p>
            </a>
          </flex-item>
          <flex-item>
            <a href="#">
              <img src="./images/common-func-4.png">
              <p>交易日记</p>
            </a>
          </flex-item>
          <flex-item>
            <a href="#">
              <img src="./images/common-func-5.png">
              <p>热点话题</p>
            </a>
          </flex-item>
        </flex>
      </div>
    </div>
  </div>
</template>

<script>
import City from '../../components/coCity.vue';
import VerticalSwipe from '../../components/coVerticalSwipe.vue';
export default {
  data () {
    return {
      delay: 3000
    }
  },
  components: {
    City,
    VerticalSwipe
  },
  mounted () {
  }
}
</script>

<style>
body {
  background-color: #f7f7fa;
}
.index .navbar {
  position: fixed;
  top: 20px;
  left: 0;
  right: 0;
  color: #fff;
  background-color: rgba(153,153,153,0);
  z-index: 1030;
}
.index .navbar-header, .index .navbar-footer {
  -webkit-box-flex: .4;
  -ms-flex: .4;
  flex: .4;
}
.index .navbar-header {
  padding-right: 0;
}
.index .navbar-body {
  position: relative;
  padding: 0;
  -webkit-box-flex: 1.2;
  -ms-flex: 1.2;
  flex: 1.2;
}
.index .navbar-body div {
  margin-top: 10px;
  margin-bottom: 10px;
  height: 23px;
  line-height: 21px;
}
.index .navbar-body .search {
  margin-left: 10px;
  margin-right: -25px;
  height: 13px;
}
.index .navbar-body .search-box {
  height: 23px;
}
.index .navbar-body .speak {
  margin-left: -21px;
  margin-right: 10px;
  height: 13px;
}
.index .navbar-footer {
  padding-left: 0;
}
.index .navbar-footer a {
  display: block;
  float: right;
  margin-top: 10px;
  margin-bottom: 10px;
  height: 23px;
  line-height: 21px;
}
.index .navbar-footer .service {
  margin-right: 15px;
}
.index .navbar-footer .service img {
  height: 18px;
}
.index .navbar-footer .message img {
  height: 14px;
}
.index .swipe {
  height: 179px;
}
.index .swipe img {
  width: 100%;
  height: 100%;
}
.index .notice {
  border-top: 1px solid #e4e7f0;
  border-bottom: 1px solid #e4e7f0;
  padding-right: 10px;
  height: 37px;
  line-height: 35px;
  background-color: #fff;
  overflow: hidden;
}
.index .notice > * {
  float: left;
}
.index .notice div:first-child {
  margin: 9px 0;
  border-right: 1px solid #e4e7f0;
  padding: 0 10px;
  width: 85px;
  height: 17px;
  line-height: 15px;
  text-align: center;
}
.index .notice div:first-child img {
  height: 11px;
}
.index .notice div:last-child {
  float: right;
}
.index .notice div:last-child img {
  height: 13px;
}
.index .main-func {
  margin-top: 7.5px;
  border-top: 1px solid #e4e7f0;
  border-bottom: 1px solid #e4e7f0;
  padding: 10px;
  background-color: #fff;
  text-align: center;
}
.index .main-func .first-row {
  margin-bottom: 5px;
}
.index .main-func .first-row .flex-item {
  padding-right: 3px;
}
.index .main-func .first-row .flex-item + .flex-item {
  padding-left: 3px;
}
.index .main-func .second-row .flex-item:first-child {
  padding-right: 4px;
}
.index .main-func .second-row .flex-item:nth-child(2) {
  padding-left: 2px;
  padding-right: 2px;
}
.index .main-func .second-row .flex-item:last-child {
  padding-left: 4px;
}
.index .main-func a {
  display: block;
}
.index .main-func a img {
  width: 100%;
  height: 100%;
}
.index .common-func {
  margin-top: 7.5px;
  border-top: 1px solid #e4e7f0;
  border-bottom: 1px solid #e4e7f0;
  padding: 12px 0;
  height: 65px;
  background-color: #fff;
}
.index .common-func a {
  display: block;
  color: #1a1a1a;
  text-align: center;
}
.index .common-func a:active,
.index .common-func a:focus {
  color: #1a1a1a;
}
.index .common-func a img {
  height: 19px;
}
.index .common-func a p {
  margin-top: 5px;
  margin-bottom: 0;
}
</style>
