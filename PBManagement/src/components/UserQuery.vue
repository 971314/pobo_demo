<template>
  <div class="user-query">
    <div v-if="query">
      <el-form ref="form" :inline="true" :model="form">
        <el-form-item label="用户名">
          <el-input v-model="form.name" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onQuery" :loading="queryStatus">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="error" v-if="queryError">
        <p>{{ queryError }}</p>
      </div>
      <el-row>
        <el-col :span="14">
          <el-table :data="usersData" border style="width: 100%">
            <el-table-column prop="loginName" label="用户名"></el-table-column>
            <el-table-column prop="roleName" label="角色"></el-table-column>
            <el-table-column label="状态" width="70px">
              <template scope="scope">
                {{ scope.row.status == 1 ? '正常' : '停用' }}
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200px">
              <template scope="scope">
                <el-button type="text" size="small" @click="onCheck(scope.row)">查看</el-button>
                <el-button type="text" size="small" @click="onEdit(scope.row)">编辑</el-button>
                <el-button type="text" size="small" @click="onEditRole(scope.row)">角色修改</el-button>
                <el-button class="el-button--danger" type="text" size="small" @click="onDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <div v-if="check || edit" class="user-form">
      <el-form ref="form" :model="userData" label-position="left" label-width="80px">
        <el-form-item label="用户名">
          <span>{{ userData.loginName }}</span>
        </el-form-item>
        <el-form-item v-if="edit" label="新密码">
          <el-input v-model="userData.newPassword" @focus="error = ''"></el-input>
        </el-form-item>
        <el-form-item v-if="check" label="角色">
          <span>{{ userData.roleName }}</span>
        </el-form-item>
        <el-form-item label="状态">
          <span v-if="check">{{ userData.status == 1 ? '正常' : '停用' }}</span>
          <el-radio-group v-if="edit" v-model="userData.status" @change="error = ''">
            <el-radio label="1">正常</el-radio>
            <el-radio label="2">停用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="check" label="姓名">
          <span>{{ userData.name }}</span>
        </el-form-item>
        <el-form-item label="手机">
          <span v-if="check">{{ userData.phone }}</span>
          <el-input v-if="edit" v-model="userData.phone" @focus="error = ''"></el-input>
        </el-form-item>
        <el-form-item label="部门">
          <span v-if="check">{{ userData.department }}</span>
          <el-input v-if="edit" v-model="userData.department" @focus="error = ''"></el-input>
        </el-form-item>
        <el-form-item class="error" v-if="error">
          <p>{{ error }}</p>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onGoback">返回</el-button>
          <el-button v-if="edit" type="primary" @click="onSubmit" :loading="submitStatus">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-if="editRole" class="user-form">
      <el-form ref="form" :model="userData" :rules="rules" label-position="left" label-width="80px">
        <el-form-item label="角色" prop="roleName">
          <el-select v-model="userData.rid" placeholder="请选择角色" @change="roleError = ''">
            <el-option v-for="role in roleList" :label="role.roleName" :value="role.rid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="error" v-if="roleError">
          <p>{{ roleError }}</p>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onGoback">返回</el-button>
          <el-button type="primary" @click="onSubmitRole" :loading="submitRoleStatus">提交</el-button>
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
        name: ''
      },
      queryError: '',
      error: '',
      roleError: '',
      queryStatus: false,
      submitStatus: false,
      submitRoleStatus: false,
      usersData: [],
      userData: {},
      roleList: [],
      rules: {
        roleName: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ]
      },
      query: true,
      check: false,
      edit: false,
      editRole: false
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
    _this.onQuery();
  },
  methods: {
    onQuery () {
      let _this = this;
      _this.queryStatus = true;
      _this.queryError = '';
      _this.$axios.post(PBConf.routerURL, {
        func: '604',
        uid: _this.userInfo.userId,
        token: _this.userInfo.token,
        data:[{
          name: _this.form.name
        }]
      }).then(function (axiosData) {
        _this.queryStatus = false;
        if (axiosData.data.retHead == '0') {
          _this.usersData = axiosData.data.data[0].users;
        } else {
          _this.queryError = axiosData.data.desc;
          return false;
        }
      }).catch(function (error) {
        _this.queryStatus = false;
        console.error(error);
      });
    },
    getUserData (userData) {
      let _this = this;
      _this.$axios.post(PBConf.routerURL, {
        func: '607',
        uid: _this.userInfo.userId,
        token: _this.userInfo.token,
        data:[{
          id: userData.id
        }]
      }).then(function (axiosData) {
        if (axiosData.data.retHead == '0') {
          _this.userData = axiosData.data.data[0].users[0];
        } else {
          _this.error = axiosData.data.desc;
          return false;
        }
      }).catch(function (error) {
        console.error(error);
      });
    },
    onCheck (userData) {
      this.getUserData(userData);
      this.query = false;
      this.edit = false;
      this.editRole = false;
      this.check = true;
    },
    onEdit (userData) {
      this.getUserData(userData);
      this.query = false;
      this.check = false;
      this.editRole = false;
      this.edit = true;
    },
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
    onEditRole (userData) {
      this.userData = userData;
      this.getRoleList();
      this.query = false;
      this.check = false;
      this.edit = false;
      this.editRole = true;
    },
    onDelete (index, userData) {
      let _this = this;
      _this.queryError = '';
      _this.$confirm('此操作会删除该用户，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(function () {
        _this.$axios.post(PBConf.routerURL, {
          func: '605',
          uid: _this.userInfo.userId,
          token: _this.userInfo.token,
          data:[{
            id: userData.id
          }]
        }).then(function (axiosData) {
          if (axiosData.data.retHead == '0') {
            _this.usersData.splice(index, 1);
            _this.$alert('该用户已删除', '提示', {
              confirmButtonText: '确定'
            });
          } else {
            _this.queryError = axiosData.data.desc;
            return false;
          }
        }).catch(function (error) {
          console.error(error);
        });
      }).catch(function () {});
    },
    onGoback () {
      this.queryError = '';
      this.error = '';
      this.roleError = '';
      this.check = false;
      this.edit = false;
      this.editRole = false;
      this.query = true;
    },
    onSubmit () {
      let _this = this;
      _this.submitStatus = true;
      _this.error = '';
      _this.$axios.post(PBConf.routerURL, {
        func: '608',
        uid: _this.userInfo.userId,
        token: _this.userInfo.token,
        data:[{
          id: _this.userData.id,
          userType: _this.userData.userType,
          newPassword: _this.userData.newPassword || '',
          department: _this.userData.department,
          phone: _this.userData.phone,
          status: _this.userData.status
        }]
      }).then(function (axiosData) {
        _this.submitStatus = false;
        if (axiosData.data.retHead == '0') {
          _this.$alert('用户修改成功', '提示', {
            confirmButtonText: '确定',
            callback: () => {
              _this.onQuery();
              _this.onGoback();
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
    },
    onSubmitRole () {
      let _this = this;
      _this.submitRoleStatus = true;
      _this.roleError = '';
      _this.$axios.post(PBConf.routerURL, {
        func: '612',
        uid: _this.userInfo.userId,
        token: _this.userInfo.token,
        data:[{
          id: _this.userData.id,
          rid: _this.userData.rid,
          remark: _this.userData.remark || ' '
        }]
      }).then(function (axiosData) {
        _this.submitRoleStatus = false;
        if (axiosData.data.retHead == '0') {
          _this.$alert('用户角色修改成功', '提示', {
            confirmButtonText: '确定',
            callback: () => {
              _this.onQuery();
              _this.onGoback();
            }
          });
        } else {
          _this.roleError = axiosData.data.desc;
          return false;
        }
      }).catch(function (error) {
        _this.submitRoleStatus = false;
        console.error(error);
      });
    }
  }
}
</script>
