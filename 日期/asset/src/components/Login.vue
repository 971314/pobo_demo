<template>
  <form role="form" class="form-horizontal login">
    <div class="form-group">
      <div class="col-xs-12">
        <input class="form-control" type="text" v-model.trim="phoneNum" @input="clearCode" maxlength="13" placeholder="请输入手机号码">
      </div>
    </div>
    <div class="form-group">
      <div class="col-xs-12">
        <input class="form-control" type="text" v-model.trim="code" maxlength="8" placeholder="请输入验证码">
        <input class="get-code" type="button" @click="getCode" value="获取验证码">
      </div>
    </div>
    <alert :msg="errMsg" @confirm="confirm"></alert>
    <input class="btn btn-blue btn-asset-block" :disabled="disabled" type="button" @click="submit" value="提交">
  </form>
</template>

<script>
var Alert = require('./Alert.vue');
module.exports = {
  name: 'login',
  data () {
    return {
      phoneNum: '',
      code: '',
      errMsg: ''
    }
  },
  components: {
    alert: Alert
  },
  computed: {
    disabled () {
      return !(this.code.length == config.SMSCodeLength && util.isPhoneNum(this.phoneNum));
    }
  },
  mounted () {
    this.$store.commit('changeTitle', '认证');
  },
  methods: {
    clearCode () {
      if (this.code) {
        this.code = '';
      }
    },
    getCode () {
      if (util.isPhoneNum(this.phoneNum)) {
        this.code = '568912';
      } else {
        this.errMsg = '请输入正确的手机号';
        $('body').addClass('modal-open');
      }
    },
    confirm () {
      $('body').removeClass('modal-open');
      this.errMsg = '';
    },
    submit () {
      this.$router.push('/order/0');
    },
  }
}
</script>
