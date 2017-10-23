<template>
  <div class="sex">
    <navbar>
      <div class="header">
        <a class="back" href="goBack">
          <img src="../../../assets/images/title-back.png">
        </a>
      </div>
      <div slot="body" id="title">
        性别
      </div>
      <div slot="footer">
        <span @click="save">保存</span>
      </div>
    </navbar>
    <group>
      <cell @click="setSex(1)" :hasArrow="hasArrow">
        男
        <span v-show="sexFlag == 1" slot="footer">√</span>
      </cell>
      <cell @click="setSex(2)" :hasArrow="hasArrow">
        女
        <span v-show="sexFlag == 2" slot="footer">√</span>
      </cell>
    </group>
  </div>
</template>

<script>
export default {
  props: ['ws', 'userAutInfo', 'userInfo'],
  data () {
    return {
      sexFlag: this.userInfo.sexFlag,
      hasArrow: false
    }
  },
  mounted () {
    document.getElementById('userinfoNavbar').style.display = 'none';
  },
  methods: {
    setSex (flag) {
      this.sexFlag = flag;
    },
    save () {
      var _this = this;
      if (_this.sexFlag && _this.sexFlag != _this.userInfo.sexFlag) {
        _this.userInfo.sexFlag = _this.sexFlag;
        _this.$axios.post(_this.ws, {
          func: 612,
          cOrgid: _this.userAutInfo.cOrgid,
          cUserid: _this.userAutInfo.cUserid,
          token: _this.userAutInfo.token,
          data: {
            cId: _this.userInfo.id,
            cLoginname: _this.userAutInfo.cLoginname,
            cSex: _this.sexFlag + ''
          }
        }).then(function (axiosData) {
          var data = axiosData.data;
        }).catch(function (error) {
          console.error(error);
        });
      }
      _this.$router.push('/userinfo');
    }
  }
}
</script>

<style>
.sex .navbar .navbar-footer {
  font-size: 14px;
}
.sex .group,
.sex .cell {
  background-image: -webkit-gradient(linear,left top,left bottom,from(#e4e7f0),color-stop(50%,#e4e7f0),color-stop(0,transparent)),-webkit-gradient(linear,left bottom,left top,from(#e4e7f0),color-stop(50%,#e4e7f0),color-stop(0,transparent));
  background-image: -webkit-linear-gradient(top,#e4e7f0,#e4e7f0 50%,transparent 0),-webkit-linear-gradient(bottom,#e4e7f0,#e4e7f0 50%,transparent 0);
  background-image: -o-linear-gradient(top,#e4e7f0,#e4e7f0 50%,transparent 0),-o-linear-gradient(bottom,#e4e7f0,#e4e7f0 50%,transparent 0);
  background-image: linear-gradient(to bottom,#e4e7f0,#e4e7f0 50%,transparent 0),linear-gradient(to top,#e4e7f0,#e4e7f0 50%,transparent 0);
}
.sex .group {
  margin-top: 10px;
}
.sex .cell {
  padding-top: 0;
  padding-bottom: 0;
  height: 44px;
  line-height: 44px;
  font-size: 14px;
}
.sex .cell .cell-footer {
  font-size: 16px;
  font-weight: bolder;
  color: #3366cc;
}
</style>
