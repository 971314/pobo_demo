<template>
  <div>
    <el-menu v-if="menuTree.length > 0" :default-active="menuTree[0].url" theme="dark" :router="true" :routerReplace="true" class="navbar navbar-fixed-top" mode="horizontal" @select="handleSelect">
      <el-menu-item class="navbar-brand" index="/"><img src="../images/logo.png"><span>澎博后台管理</span></el-menu-item>
      <el-submenu class="navbar-right" index="/">
        <template slot="title">{{ loginName }}</template>
        <!-- <el-menu-item v-if="userType == 2" index="/userroot">用户管理</el-menu-item> -->
        <el-menu-item index="/password">修改密码</el-menu-item>
        <el-menu-item index="/login">退出</el-menu-item>
      </el-submenu>
      <el-menu-item v-for="menu in menuTree" :index="getUrl(menu.url)" :key="menu.code">{{ menu.description ? menu.description : '管理' + menu.code }}</el-menu-item>
      <!-- <el-menu-item index="/subpage">通知</el-menu-item> -->
      <!-- <el-menu-item v-if="userType == 2" index="/userroot">用户管理</el-menu-item> -->
    </el-menu>
    <router-view class="container"></router-view>
  </div>
</template>

<script>
  let websocket;
  let wserrorTimes = 0;
  function initWS(WSHost) {
    if (window.location.protocol == 'https:') {
      WSHost = 'wss://' + WSHost;
    } else {
      WSHost = 'ws://' + WSHost
    }
    if ('WebSocket' in window) {
      websocket = new WebSocket(WSHost);
    } else if ('MozWebSocket' in window) {
      websocket = new MozWebSocket(WSHost);
    } else {
      console.error('WebSocket is not supported by this browser.');
      return;
    }
  }
  export default {
    data() {
      return {
        loginName: '',
        userType: 0,
        menuTree: []
      }
    },
    mounted () {
      let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
      let menuTree = JSON.parse(window.sessionStorage.getItem('menuTree'));
      this.loginName = userInfo.loginName;
      this.userType = userInfo.userType;
      this.setMenu(menuTree);
      this.initSSO(userInfo);
    },
    methods: {
      getUrl (url) {
        return url ? url : '/';
      },
      handleSelect (key, keyPath) {
        if (key == '/login') {
          window.sessionStorage.setItem('userInfo', '');
          window.sessionStorage.setItem('menuTree', '');
          websocket && websocket.close();
        }
      },
      setMenu (menuTree) {
        this.menuTree = menuTree;
        this.$router.replace(this.getUrl(menuTree[0].url));
      },
      initSSO (userInfo) {
        let _this = this;
        let WSHost = PBConf.WSHost;
        initWS(WSHost);
        websocket.onopen = function () {
          websocket.send(JSON.stringify({
            uid: userInfo.userId,
            token: userInfo.token
          }));
        };
        websocket.onmessage = function (event) {
          let data = JSON.parse(event.data);
          if (data.status != '0') {
            window.sessionStorage.setItem('userInfo', '');
            window.sessionStorage.setItem('menuTree', '');
            if (data.status == '-100') {
              _this.$alert(data.msg, '提示', {
                confirmButtonText: '确定',
                callback: () => {
                  websocket.close();
                  _this.$router.replace('/login');
                }
              });
            } else {
              _this.$alert('登录异常，请重新登录', '提示', {
                confirmButtonText: '确定',
                callback: () => {
                  websocket.close();
                  _this.$router.replace('/login');
                }
              });
            }
          }
        };
        websocket.onerror = function(event) {
          if (wserrorTimes < 5) {
            wserrorTimes++;
            websocket.close();
            initWS(WSHost);
          }
        };
      }
    }
  }
</script>
