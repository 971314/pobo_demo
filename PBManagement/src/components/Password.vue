<template>
  <div>
    <div class="menus">
      <el-menu theme="dark" class="el-menu--vertical" default-active="1">
        <el-menu-item index="1">修改密码</el-menu-item>
      </el-menu>
    </div>
    <div class="content">
      <el-form ref="form" :model="form" :rules="rules" label-position="left" label-width="100px">
        <el-form-item label="原密码" prop="password">
          <el-input type="password" v-model="form.password" @focus="error = ''"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input type="password" v-model="form.newPassword" @focus="error = ''"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="confimgPassword">
          <el-input type="password" v-model="form.confimgPassword" @focus="error = ''"></el-input>
        </el-form-item>
        <el-form-item class="error" v-if="error">
          <p>{{ error }}</p>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" :loading="submitStatus">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        password: '',
        newPassword: '',
        confimgPassword: ''
      },
      rules: {
        password: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
        newPassword: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
        confimgPassword: [{ required: true, message: '请输入确认新密码', trigger: 'blur' }],
      },
      error: '',
      submitStatus: false
    }
  },
  methods: {
    onSubmit () {
      let _this = this;
      _this.$refs.form.validate((valid) => {
        if (valid) {
          if (_this.form.newPassword != _this.form.confimgPassword) {
            _this.error = '两次新密码输入不一致';
            return false;
          }
          _this.submitStatus = true;
          _this.error = '';
          let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
          _this.$axios.post(PBConf.routerURL, {
            func: '603',
            uid: userInfo.userId,
            token: userInfo.token,
            data:[{
              oldPassword: _this.form.password,
              newPassword: _this.form.newPassword
            }]
          }).then(function (axiosData) {
            _this.submitStatus = false;
            if (axiosData.data.retHead == '0') {
              _this.$refs.form.resetFields();
              _this.$alert('您已成功修改密码', '提示', {
                confirmButtonText: '确定'
              });
            } else {
              _this.error = axiosData.data.desc;
              return false;
            }
          }).catch(function (error) {
            _this.submitStatus = false;
            console.error(error);
          });
        } else {
          _this.error = '';
          _this.submitStatus = false;
          return false;
        }
      });
    }
  }
}
</script>

<style>
  .content>form {
    width: 30%;
  }
</style>