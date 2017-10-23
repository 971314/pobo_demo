<template>
  <form role="form" class="form-horizontal order">
    <div class="form-group">
      <div class="col-xs-12">
        <input class="form-control" type="text" v-model.trim="name" :readonly="readonly" placeholder="请输入姓名">
      </div>
    </div>
    <div class="form-group">
      <div class="col-xs-12">
        <input class="form-control uppercase" type="text" v-model.trim="id" :readonly="readonly" maxlength="20" placeholder="请输入身份证号码">
      </div>
    </div>
    <div class="form-group phone" v-if="this.$route.params.flag == 1">
      <div class="col-xs-5 label-phone">手机号码</div>
      <div class="col-xs-7 modify">
        <router-link to="/phone">
          <span>{{ phoneNum }}</span>
          <img src="../images/arrow-right.png" alt="" />
        </router-link>
      </div>
    </div>
    <alert :msg="errMsg" @confirm="confirm"></alert>
    <input class="btn btn-blue btn-asset-block" :disabled="disabled" type="button" @click="submit" :value="btnVal">
  </form>
</template>

<script>
var Alert = require('./Alert.vue');
module.exports = {
  name: 'order',
  data () {
    return {
      name: this.$store.state.name,
      id: this.$store.state.id,
      phoneNum: this.$store.state.orderPhoneNum || this.$store.state.LoginName,
      errMsg: '',
      btnVal: '提交'
    }
  },
  components: {
    alert: Alert
  },
  computed: {
    readonly () {
      if (this.$route.params.flag == 0) {
        return false;
      } else {
        return true;
      }
    },
    disabled () {
      return !(this.name && this.id.length == window.config.IDNoLength);
    },
    btnVal () {
      if (this.$route.params.flag == 1) {
        return '提交预约';
      } else {
        return '提交';
      }
    }
  },
  mounted () {
    if (this.$route.params.flag == 1) {
      this.$store.commit('changeTitle', '预约购买');
    } else {
      this.$store.commit('changeTitle', '注册');
    }
  },
  methods: {
    confirm () {
      $('body').removeClass('modal-open');
      this.errMsg = '';
    },
    submit () {
      if (util.isIDNo(this.id)) {
        if (this.$route.params.flag == 0) {
          this.$store.commit('changeName', this.name);
          this.$store.commit('changeId', this.id);
          this.$router.push('/nsp');
        } else {
          var data = {
            uid: this.$store.state.UserId,
            sid: this.$store.state.Token,
            loginname: this.$store.state.LoginName,
            orgid: this.$store.state.jgid,
            data: [
              {
                productid: this.$store.state.detlProd.productid + '',
                phone: this.phoneNum
              }
            ]
          };
          $.ajax({
            method: 'POST',
            url: window.config.serverAdd + window.config.bookSbmtWS,
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: 'application/json',
            xhrFields: {withCredentials: true},
            crossDomain: true,
            success: function (data) {
              if (data.retHead == 1) {
                alert('预约成功');
                this.$router.push('/private');
              } else {
                alert('预约失败，请稍后重试');
              }
            }.bind(this),
            error: function (jqXHR, textStatus, errorThrown) {
              console.error(textStatus);
            }
          });
        }
      } else {
        this.errMsg = '请输入正确的身份证号码';
        $('body').addClass('modal-open');
      }
    },
  }
}
</script>
