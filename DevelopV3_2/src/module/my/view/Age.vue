<template>
  <div class="age">
    <navbar>
      <div class="header">
        <a class="back" href="goBack">
          <img src="../../../assets/images/title-back.png">
        </a>
      </div>
      <div slot="body" id="title">
        选择出生日期
      </div>
      <div slot="footer">
        <span @click="save">保存</span>
      </div>
    </navbar>
    <div class="input">
      <input type="text" v-model="birthday" placeholder="请输入出生日期(例：19970701)">
      <img v-show="birthday" @click="clear" src="../images/delete.png">
    </div>
  </div>
</template>

<script>
export default {
  props: ['ws', 'userAutInfo', 'userInfo'],
  data () {
    return {
      birthday: this.userInfo.birthday
    }
  },
  mounted () {
    document.getElementById('userinfoNavbar').style.display = 'none';
  },
  methods: {
    clear () {
      this.birthday = '';
    },
    save () {
      var _this = this;
      if (moment(_this.birthday).isValid()) {
        if (_this.birthday && _this.birthday != _this.userInfo.birthday) {
          _this.userInfo.birthday = _this.birthday;
          _this.$axios.post(_this.ws, {
            func: 612,
            cOrgid: _this.userAutInfo.cOrgid,
            cUserid: _this.userAutInfo.cUserid,
            token: _this.userAutInfo.token,
            data: {
              cId: _this.userInfo.id,
              cLoginname: _this.userAutInfo.cLoginname,
              cBirthday: _this.birthday
            }
          }).then(function (axiosData) {
            var data = axiosData.data;
          }).catch(function (error) {
            console.error(error);
          });
        }
        _this.$router.push('/userinfo');
      } else {
        _this.birthday = '';
        alert('请输入正确出生日期');
      }
    }
  }
}
</script>

<style>
.age .navbar .navbar-footer {
  font-size: 14px;
}
.age .input {
  position: relative;
  margin-top: 10px;
  border-top: 1px solid #e4e7f0;
  border-bottom: 1px solid #e4e7f0;
  padding: 0 12px;
  height: 42px;
  line-height: 40px;
  background-color: #fff;
}
.age .input input {
  display: block;
  border: none;
  width: 100%;
  height: 100%;
  font-size: 14px;
}
.age .input input:focus {
  outline: 0;
}
.age .input img {
  position: absolute;
  top: 12px;
  right: 12px;
  height: 16px;
}
</style>
