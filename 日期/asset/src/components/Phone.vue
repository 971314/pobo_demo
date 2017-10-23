<template>
  <form role="form" class="form-horizontal phone">
    <div class="form-group">
      <div class="col-xs-12">
        <input class="form-control" type="tel" v-model.trim="phoneNum" @input="setBtn" maxlength="13" placeholder="请输入手机号码">
        <input type="text" style="display: none;">
        <img class="clear" @click="clear" src="../images/delete.png" alt="" />
      </div>
    </div>
    <alert :msg="errMsg" @confirm="confirm"></alert>
    <input class="btn btn-blue btn-asset-block" :disabled="disabled" type="button" @click="submit" value="提交">
  </form>
</template>

<script>
var Alert = require('./Alert.vue');
module.exports = {
  data () {
    return {
      oldPhoneNum: this.$store.state.orderPhoneNum || this.$store.state.LoginName,
      phoneNum: this.$store.state.orderPhoneNum || this.$store.state.LoginName,
      disabled: true,
      errMsg: ''
    }
  },
  components: {
    alert: Alert
  },
  mounted () {
    this.$store.commit('changeTitle', '手机号码');
  },
  methods: {
    setBtn () {
      if (util.isPhoneNum(this.phoneNum) && this.phoneNum != this.oldPhoneNum) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    clear () {
      this.phoneNum = '';
      this.disabled = true;
    },
    confirm () {
      $('body').removeClass('modal-open');
      this.errMsg = '';
    },
    submit () {
      this.$store.commit('changeOrderPhoneNum', this.phoneNum);
      this.$router.push('/order/1');
    },
  }
}
</script>
