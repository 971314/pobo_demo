<template>
  <div class="navbar common-nav navbar-fixed-top">
    <div class="navbar-header">
      <div>
        <a v-if="goback" class="back" :href="gobackUrl">
          <img src="../assets/images/title-back.png">
        </a>
        <a v-if="search" class="search" :href="searchUrl">
          <img src="../assets/images/title-search.png">
        </a>
        <slot></slot>
      </div>
    </div>
    <div class="navbar-body">
      <div>
        <slot name="body"></slot>
      </div>
    </div>
    <div class="navbar-footer">
      <div>
        <message-icon v-if="message"></message-icon>
        <a v-if="service" class="service" href="#">
          <img src="../assets/images/service.png">
        </a>
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'common-nav',
    props: {
      goback: {
        type: Boolean,
        default: true,
      },
      gobackUrl: {
        type: String,
        default: "goback",
      },
      search: {
        type: Boolean,
        default: true,
      },
      searchUrl: {
        type: String,
        default: "",
      },
      message: {
        type: Boolean,
        default: true,
      },
      messageUrl: {
        type: String,
        default: "pobo:pageId=900005&url=message/index.html",
      },
      service: {
        type: Boolean,
        default: true,
      },
      serviceUrl: {
        type: String,
        default: "",
      }
    },
    data () {
      return {
        phone: "",
        number: 0
      }
    },
    created: function () {

    },
    methods: {}

  }
</script>
<style>
  .common-nav {
    font-size: 17px;
    color: #fff;
    background-color: #eb1212;
  }

  .common-nav .navbar-header, .risk .navbar-footer {
    -webkit-box-flex: .4;
    -ms-flex: .4;
    flex: .4;
  }

  .common-nav .navbar-header {
    padding-right: 0;
  }

  .common-nav .navbar-header a {
    display: block;
    float: left;
    margin-top: 10px;
    margin-bottom: 10px;
    height: 23px;
    line-height: 21px;
  }

  .common-nav .navbar-header .back {
    margin-right: 15px;
  }

  .common-nav .navbar-header .back img {
    height: 18px;
  }

  .common-nav .navbar-header .search img {
    height: 17px;
  }

  .common-nav .navbar-body {
    position: relative;
    padding: 0;
    -webkit-box-flex: 1.2;
    -ms-flex: 1.2;
    flex: 1.2;
    line-height: 42px;
  }

  .common-nav .navbar-footer {
    padding-left: 0;
  }

  .common-nav .navbar-footer a {
    display: block;
    float: right;
    margin-top: 10px;
    margin-bottom: 10px;
    height: 23px;
    line-height: 21px;
  }

  .common-nav .navbar-footer .service {
    margin-right: 15px;
  }

  .common-nav .navbar-footer .service img {
    height: 18px;
  }

  .common-nav .navbar-footer .message img {
    height: 14px;
  }
</style>
