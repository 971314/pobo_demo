<template>
  <div class="nickname">
    <navbar>
      <div class="header">
        <a class="back" href="goBack">
          <img src="../../../assets/images/title-back.png">
        </a>
      </div>
      <div slot="body" id="title">
        昵称
      </div>
      <div slot="footer">
        <span @click="save">保存</span>
      </div>
    </navbar>
    <div class="input">
      <input type="text" v-model="nickname" placeholder="请输入昵称">
      <img v-show="nickname" @click="clear" src="../images/delete.png">
    </div>
  </div>
</template>

<script>
export default {
  props: ['ws', 'userAutInfo', 'userInfo'],
  data () {
    return {
      nickname: this.userInfo.nickname
    }
  },
  mounted () {
    document.getElementById('userinfoNavbar').style.display = 'none';
  },
  methods: {
    clear () {
      this.nickname = '';
    },
    save () {
      var _this = this;
      if (_this.nickname && _this.nickname != _this.userInfo.nickname) {
        _this.userInfo.nickname = _this.nickname;
        _this.$axios.post(_this.ws, {
          func: 612,
          cOrgid: _this.userAutInfo.cOrgid,
          cUserid: _this.userAutInfo.cUserid,
          token: _this.userAutInfo.token,
          data: {
            cId: _this.userInfo.id,
            cLoginname: _this.userAutInfo.cLoginname,
            cPetname: _this.nickname
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
.nickname .navbar .navbar-footer {
  font-size: 14px;
}
.nickname .input {
  position: relative;
  margin-top: 10px;
  border-top: 1px solid #e4e7f0;
  border-bottom: 1px solid #e4e7f0;
  padding: 0 12px;
  height: 42px;
  line-height: 40px;
  background-color: #fff;
}
.nickname .input input {
  display: block;
  border: none;
  width: 100%;
  height: 100%;
  font-size: 14px;
}
.nickname .input input:focus {
  outline: 0;
}
.nickname .input img {
  position: absolute;
  top: 12px;
  right: 12px;
  height: 16px;
}
</style>
