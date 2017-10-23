<template>
  <div class="user-query">
    <div class="user-form">
      <el-form ref="form" :model="form" :rules="rules" label-position="left" label-width="100px">
        <el-form-item label="父节点编号" prop="parentCode">
          <el-input v-model="form.parentCode"></el-input>
        </el-form-item>
        <el-form-item label="节点编号" prop="code">
          <el-input v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item label="节点名称" prop="description">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="节点序号" prop="orderNum">
          <el-input v-model="form.orderNum"></el-input>
        </el-form-item>
        <el-form-item label="节点url" prop="url">
          <el-input v-model="form.url"></el-input>
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
        parentCode: '',
        code: '',
        description: '',
        orderNum: '',
        url: ''
      },
      rules: {
        code: [
          { required: true, message: '请输入节点编号', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入节点名称', trigger: 'blur' }
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
  },
  methods: {
    onSubmit () {
      let _this = this;
      _this.$refs.form.validate((valid) => {
        if (valid) {
          _this.submitStatus = true;
          _this.$axios.post(PBConf.routerURL, {
            func: '614',
            uid: _this.userInfo.userId,
            token: _this.userInfo.token,
            data:[{
              parentCode: _this.form.parentCode,
              code: _this.form.code,
              description: _this.form.description,
              orderNum: _this.form.orderNum,
              url: _this.form.url
            }]
          }).then(function (axiosData) {
            _this.submitStatus = false;
            if (axiosData.data.retHead == '0') {
              _this.$alert('权限增加成功', '提示', {
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
