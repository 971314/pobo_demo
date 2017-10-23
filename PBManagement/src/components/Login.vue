<template>
  <el-form class="login" ref="form" :model="form" :rules="rules">
    <h2>澎博后台管理</h2>
    <el-form-item prop="user">
      <el-input size="large" v-model="form.user" placeholder="请输入用户名" @focus="error = ''"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input size="large" type="password" v-model="form.password" placeholder="请输入密码" @focus="error = ''"></el-input>
    </el-form-item>
    <el-form-item prop="code">
      <el-col :span="12">
        <el-input size="large" v-model="form.code" placeholder="请输入验证码" @focus="error = ''"></el-input>
      </el-col>
      <el-col class="code" :offset="2" :span="6">
        <img :src="codeSrc" @click="refresh">
      </el-col>
    </el-form-item>
    <el-form-item class="error" v-if="error">
      <p>{{ error }}</p>
    </el-form-item>
    <el-form-item>
      <el-button size="large" type="primary" @click="onLogin" :loading="loginStatus">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data () {
    return {
      form: {
        user: '',
        password: '',
        code:''
      },
      rules: {
        user: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
      },
      codeSrc: '',
      uuid: '',
      loginStatus: false,
      error: ''
    }
  },
  mounted () {
    let _this = this;
    window.sessionStorage.setItem('userInfo', '');
    window.sessionStorage.setItem('menuTree', '');
    _this.$axios.get(PBConf.codeURL).then(function (axiosData) {
      _this.codeSrc = axiosData.data.captcha;
      _this.uuid = axiosData.data.uuid;
    });
  },
  methods: {
    refresh () {
      let _this = this;
      _this.$axios.get(PBConf.codeURL).then(function (axiosData) {
        _this.codeSrc = axiosData.data.captcha;
        _this.uuid = axiosData.data.uuid;
      });
    },
    onLogin () {
      let _this = this;
      _this.$refs.form.validate((valid) => {
        if (valid) {
          _this.loginStatus = true;
          _this.$axios.post(PBConf.routerURL, {
            func: '600',
            uid: ' ',
            token: ' ',
            data:[{
              loginName: _this.form.user,
              password: _this.form.password,
              captcha: _this.form.code,
              uuid: _this.uuid
            }]
          }).then(function (axiosData) {
            _this.loginStatus = false;
            if (axiosData.data.retHead == '0') {
              let userInfo = {
                loginName: _this.form.user,
                userId: axiosData.data.data[0].uid,
                token: axiosData.data.data[0].token,
                userType: axiosData.data.data[0].userType
              };
              window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
              window.sessionStorage.setItem('menuTree', JSON.stringify(axiosData.data.data[0].funcList));
              _this.$router.replace('/');
            } else {
              _this.error = axiosData.data.desc;
              _this.refresh();
              _this.form.code = '';
              return false;
            }
          }).catch(function (error) {
            _this.loginStatus = false;
            _this.form.code = '';
            console.error(error);
          });
        } else {
          _this.error = '';
          _this.loginStatus = false;
          return false;
        }
      });
    }
  }
}
</script>

<style>
.login {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -55%);
  border: 1px solid #e5e9f2;
  border-radius: 10px;
  box-shadow: 0 0 20px #eff2f7;
  box-sizing: border-box;
  padding: 25px;
  width: 400px;
  background-color: #fff;
}
.login h2 {
  color: #20a0ff;
  font-weight: 400;
  text-align: center;
}
.login .code {
  line-height: 0;
}
.login .code img {
  height: 42px;
}
.login .el-button {
  display: block;
  width: 100%;
}
</style>
