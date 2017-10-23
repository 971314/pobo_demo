<template>
  <div class="user-query">
    <div class="user-form">
      <el-form ref="form" :model="form" :rules="rules" label-position="left" label-width="80px">
        <el-form-item label="用户名" prop="loginName" @focus="error = ''">
          <el-input v-model="form.loginName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" @focus="error = ''">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="rid">
          <el-select v-model="form.rid" placeholder="请选择角色" @change="error = ''">
            <el-option v-for="role in roleList" :label="role.roleName" :value="role.rid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名" prop="name" @focus="error = ''">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone" @focus="error = ''">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="department" @focus="error = ''">
          <el-input v-model="form.department"></el-input>
        </el-form-item>
        <el-form-item class="error" v-if="error">
          <p>{{ error }}</p>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
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
        loginName: '',
        password: '',
        rid: '',
        name: '',
        phone: '',
        department: ''
      },
      rules: {
        loginName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        rid: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请选择姓名', trigger: 'blur' }
        ]
      },
      roleList: [],
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
    _this.getRoleList();
  },
  methods: {
    getRoleList () {
      let _this = this;
      _this.$axios.post(PBConf.routerURL, {
        func: '609',
        uid: _this.userInfo.userId,
        token: _this.userInfo.token,
        data: [{
          roleName: ''
        }]
      }).then(function (axiosData) {
        if (axiosData.data.retHead == '0') {
          _this.roleList = axiosData.data.data[0].roles;
        } else {
          _this.$alert('角色列表获取失败，请稍后重试', '提示', {
            confirmButtonText: '确定'
          });
        }
      }).catch(function (error) {
        console.error(error);
      });
    },
    resetForm () {
      this.$refs.form.resetFields();
    },
    onSubmit () {
      let _this = this;
      _this.$refs.form.validate((valid) => {
        if (valid) {
          _this.submitStatus = true;
          _this.$axios.post(PBConf.routerURL, {
            func: '606',
            uid: _this.userInfo.userId,
            token: _this.userInfo.token,
            data:[{
              loginName: _this.form.loginName,
              password: _this.form.password,
              rid: _this.form.rid,
              name: _this.form.name,
              phone: _this.form.phone,
              department: _this.form.department,
              userType: '0',
              remark: ''
            }]
          }).then(function (axiosData) {
            _this.submitStatus = false;
            if (axiosData.data.retHead == '0') {
              _this.$alert('用户增加成功', '提示', {
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
