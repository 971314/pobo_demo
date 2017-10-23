<template>
  <div class="user-query">
    <div class="user-form">
      <el-form ref="form" :model="form" :rules="rules" label-position="left" label-width="80px">
        <el-form-item label="角色" prop="roleName">
          <el-input v-model="form.roleName" @focus="error = ''"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" @focus="error = ''"></el-input>
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
  props: ['userRootAuz'],
  data () {
    return {
      userInfo: {},
      form: {
        roleName: '',
        remark: '',
      },
      rules: {
        roleName: [
          { required: true, message: '请输入角色', trigger: 'blur' }
        ]
      },
      error: '',
      submitStatus: false
    }
  },
  mounted () {
    let _this = this;
    let auz = _this.userRootAuz.children.filter(function (item) {
      return item.url === _this.$route.path;
    });
    if (auz.length == 0) {
      _this.$router.replace(_this.userRootAuz.children[0].url);
    }
    _this.userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
  },
  methods: {
    onSubmit () {
      let _this = this;
      _this.$refs.form.validate((valid) => {
        if (valid) {
          _this.submitStatus = true;
          _this.$axios.post(PBConf.routerURL, {
            func: '610',
            uid: _this.userInfo.userId,
            token: _this.userInfo.token,
            data:[{
              roleName: _this.form.roleName,
              remark: _this.form.remark
            }]
          }).then(function (axiosData) {
            _this.submitStatus = false;
            if (axiosData.data.retHead == '0') {
              _this.$alert('角色增加成功', '提示', {
                confirmButtonText: '确定',
                callback: () => {
                  _this.$refs.form.resetFields();
                }
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
