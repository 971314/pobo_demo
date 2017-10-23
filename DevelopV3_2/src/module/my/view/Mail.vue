<template>
  <div class="mail">
    <navbar>
      <div class="header">
        <a class="back" href="goBack">
          <img src="../../../assets/images/title-back.png">
        </a>
      </div>
      <div slot="body" id="title">
        邮箱
      </div>
      <div slot="footer">
        <span @click="save">保存</span>
      </div>
    </navbar>
    <div class="input">
      <input type="text" v-model="mail" placeholder="请输入邮箱">
      <img v-show="mail" @click="clear" src="../images/delete.png">
    </div>
  </div>
</template>

<script>
export default {
  props: ['ws', 'userAutInfo', 'userInfo'],
  data () {
    return {
      mail: this.userInfo.cipherMail
    }
  },
  mounted () {
    document.getElementById('userinfoNavbar').style.display = 'none';
  },
  methods: {
    clear () {
      this.mail = '';
    },
    save () {
      var _this = this;
      if (_this.mail.match(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)) {
        if (_this.mail != _this.userInfo.mail) {
          _this.userInfo.mail = _this.mail;
          _this.$axios.post(_this.ws, {
            func: 612,
            cOrgid: _this.userAutInfo.cOrgid,
            cUserid: _this.userAutInfo.cUserid,
            token: _this.userAutInfo.token,
            data: {
              cId: _this.userInfo.id,
              cLoginname: _this.userAutInfo.cLoginname,
              cMail: _this.mail
            }
          }).then(function (axiosData) {
            var data = axiosData.data;
          }).catch(function (error) {
            console.error(error);
          });
        }
        _this.$router.push('/userinfo');
      } else {
        alert('请输入正确的邮箱地址');
      }
    }
  }
}
</script>

<style>
.mail .navbar .navbar-footer {
  font-size: 14px;
}
.mail .input {
  position: relative;
  margin-top: 10px;
  border-top: 1px solid #e4e7f0;
  border-bottom: 1px solid #e4e7f0;
  padding: 0 12px;
  height: 42px;
  line-height: 40px;
  background-color: #fff;
}
.mail .input input {
  display: block;
  border: none;
  width: 100%;
  height: 100%;
  font-size: 14px;
}
.mail .input input:focus {
  outline: 0;
}
.mail .input img {
  position: absolute;
  top: 12px;
  right: 12px;
  height: 16px;
}
</style>
