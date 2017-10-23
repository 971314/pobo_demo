<template>
  <div>
    <div v-if="userRootAuz.children && userRootAuz.children.length > 0" class="menus">
      <el-menu theme="dark" class="el-menu--vertical" :default-active="userRootAuz.children[0].url" :router="true" :routerReplace="true">
        <!-- <el-menu-item index="/userroot">用户查询</el-menu-item>
        <el-menu-item index="/userroot/useradd">用户增加</el-menu-item>
        <el-menu-item index="/userroot/role">角色查询</el-menu-item>
        <el-menu-item index="/userroot/roleadd">角色增加</el-menu-item>
        <el-menu-item index="/userroot/auz">权限查询</el-menu-item> -->
        <!-- <el-menu-item index="/userroot/auzadd">权限增加</el-menu-item> -->
        <el-menu-item v-for="auz in userRootAuz.children" :index="auz.url">{{ auz.description }}</el-menu-item>
      </el-menu>
    </div>
    <div v-if="userRootAuz.children && userRootAuz.children.length > 0" class="content">
      <router-view :userRootAuz="userRootAuz"></router-view>
    </div>
    <div v-if="noAuz" style="padding: 10px 50px;">
      <h2>对不起，您无权访问该系统！</h2>
      <el-button type="primary" @click="onGoback">返回首页</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {},
      userRootAuz: {},
      noAuz: false
    }
  },
  mounted () {
    this.userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
    this.getSubSysAuz();
  },
  methods: {
    getSubSysAuz () {
      let _this = this;
      _this.$axios.post(PBConf.routerURL, {
        func: '601',
        uid: _this.userInfo.userId,
        token: _this.userInfo.token,
        data:[{
          sub: PBConf.userRootSub
        }]
      }).then(function (axiosData) {
        if (axiosData.data.retHead == '0') {
          _this.userRootAuz = axiosData.data.data[0];
        } else {
          _this.$alert(axiosData.data.desc, '提示', {
            confirmButtonText: '确定',
            callback: () => {
              _this.noAuz = true;
            }
          });
        }
      }).catch(function (error) {
        console.error(error);
      });
    },
    onGoback () {
      this.$router.replace('/');
    }
  }
}
</script>
