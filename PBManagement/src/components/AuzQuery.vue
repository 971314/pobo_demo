<template>
  <div class="user-query">
    <div v-if="query">
      <el-form ref="form" :inline="true" :model="form">
        <el-form-item label="用户名">
          <el-input v-model="form.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onQuery" :loading="queryStatus">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="error" v-if="queryError">
        <p>{{ queryError }}</p>
      </div>
      <el-row>
        <el-col :span="8">
          <el-table :data="usersData" border style="width: 100%">
            <el-table-column prop="loginName" label="用户名"></el-table-column>
            <el-table-column label="操作">
              <template scope="scope">
                <el-button type="text" size="small" @click="onCheck(scope.row)">查看权限</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <div v-if="check" class="auz-tree">
      <p class="user-auz">
        <el-button type="primary" icon="arrow-left" @click="onGoback(1)">返回</el-button>
        {{ userData.loginName }}的权限
      </p>
      <div class="error" v-if="auzError"><p>{{ auzError }}</p></div>
      <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
      <el-tree
        :data="auzsData"
        :props="auzProps"
        ref="auzTree"
        node-key="code"
        default-expand-all
        :filter-node-method="filterNode">
        <!-- :render-content="renderContent"> -->
      </el-tree>
    </div>
    <div v-if="add || edit" class="user-form">
      <el-form ref="form" :model="auzData" :rules="rules" label-position="left" label-width="100px">
        <el-form-item label="父节点编号">
          <span>{{ auzData.parentCode }}</span>
        </el-form-item>
        <!-- <el-form-item v-if="add" label="节点编号" prop="code">
          <el-input v-model="auzData.code"></el-input>
        </el-form-item> -->
        <el-form-item label="节点名称" prop="description">
          <el-input v-model="auzData.description"></el-input>
        </el-form-item>
        <el-form-item label="节点序号">
          <el-input v-model="auzData.orderNum"></el-input>
        </el-form-item>
        <el-form-item label="功能编号">
          <el-input v-model="auzData.funcCode"></el-input>
        </el-form-item>
        <el-form-item v-if="add || auzData.children.length == 0" label="节点url">
          <el-input v-model="auzData.url"></el-input>
        </el-form-item>
        <el-form-item class="error" v-if="error">
          <p>{{ error }}</p>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onGoback(2)">返回</el-button>
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
        username: ''
      },
      queryError: '',
      auzError: '',
      error: '',
      queryStatus: false,
      submitStatus: false,
      usersData: [],
      userData: {},
      auzsData: [],
      auzProps: {
        children: 'children',
        label: 'description'
      },
      filterText: '',
      auzData: {},
      rules: {
        code: [
          { required: true, message: '请输入节点编号', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入节点名称', trigger: 'blur' }
        ]
      },
      error: '',
      query: true,
      check: false,
      add: false,
      edit: false
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
  watch: {
    filterText(val) {
      this.$refs.auzTree.filter(val);
    }
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
          name: _this.form.username
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
    getAuzsData (userData) {
      let _this = this;
      _this.auzError = '';
      _this.$axios.post(PBConf.routerURL, {
        func: '613',
        uid: _this.userInfo.userId,
        token: _this.userInfo.token,
        data:[{
          id: userData.id
        }]
      }).then(function (axiosData) {
        if (axiosData.data.retHead == '0') {
          _this.auzsData = axiosData.data.data[0].funcList;
        } else {
          _this.auzError = axiosData.data.desc;
          return false;
        }
      }).catch(function (error) {
        console.error(error);
      });
    },
    onCheck (userData) {
      this.userData = userData;
      this.getAuzsData(userData);
      this.query = false;
      this.add = false;
      this.edit = false;
      this.check = true;
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.description.indexOf(value) !== -1;
    },
    onAdd (store, data, event) {
      event.stopPropagation();
      console.dir(data);
      this.auzData = {
        pid: '',
        parentCode: data.code,
        code: '',
        description: '',
        orderNum: '',
        url: ''
      };
      this.query = false;
      this.check = false;
      this.edit = false;
      this.add = true;
    },
    onEdit (store, data, event) {
      event.stopPropagation();
      console.dir(data);
      this.auzData = data;
      this.query = false;
      this.check = false;
      this.add = false;
      this.edit = true;
    },
    renderContent (h, { node, data, store }) {
      if (data.parentCode == 0) {
        return (
          <span style="white-space: normal;">
            <span>
              <span>{node.label}</span>
            </span>
            <span style="float: right; margin-right: 20px">
              <el-button size="mini" type="info" on-click={ ($event) => this.onEdit(store, data, $event) } disabled>修改</el-button>
              <el-button size="mini" type="info" on-click={ ($event) => this.onAdd(store, data, $event) }>增加</el-button>
            </span>
          </span>
        );
      } else if(node.level > 2) {
        return (
          <span style="white-space: normal;">
            <span>
              <span>{node.label}</span>
            </span>
            <span style="float: right; margin-right: 20px">
              <el-button size="mini" type="info" on-click={ ($event) => this.onEdit(store, data, $event) }>修改</el-button>
              <el-button size="mini" type="info" on-click={ ($event) => this.onAdd(store, data, $event) } disabled>增加</el-button>
            </span>
          </span>
        );
      } else {
        return (
          <span style="white-space: normal;">
            <span>
              <span>{node.label}</span>
            </span>
            <span style="float: right; margin-right: 20px">
              <el-button size="mini" type="info" on-click={ ($event) => this.onEdit(store, data, $event) }>修改</el-button>
              <el-button size="mini" type="info" on-click={ ($event) => this.onAdd(store, data, $event) }>增加</el-button>
            </span>
          </span>
        );
      }
    },
    onGoback (flag) {
      this.queryError = '';
      this.auzError = '';
      this.add = false;
      this.edit = false;
      if (flag == 1) {
        this.check = false;
        this.query = true;
      } else {
        this.query = false;
        this.check = true;
      }
    },
    onSubmit () {
      let _this = this;
      _this.$refs.form.validate((valid) => {
        if (valid) {
          _this.submitStatus = true;
          let params = {
            func: '615',
            uid: _this.userInfo.userId,
            token: _this.userInfo.token,
            data:[{
              pid: _this.auzData.pid,
              parentCode: _this.auzData.parentCode,
              description: _this.auzData.description,
              orderNum: _this.auzData.orderNum || '0',
              funcCode: _this.auzData.funcCode || '',
              url: _this.auzData.url || '',
              remark: ''
            }]
          };
          if (_this.add) {
            params.func = '614';
            delete params.data[0].pid;
          }
          _this.$axios.post(PBConf.routerURL, params).then(function (axiosData) {
            _this.submitStatus = false;
            if (axiosData.data.retHead == '0') {
              let msg = '权限修改成功';
              if (_this.add) {
                msg = '权限增加成功'
              }
              _this.$alert(msg, '提示', {
                confirmButtonText: '确定',
                callback: () => {
                  _this.getAuzsData(_this.userData);
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
.user-query .user-auz {
  margin-top: 0;
  margin-bottom: 20px;
}
.user-query .user-auz button {
  margin-right: 15px;
}
.user-query .auz-tree {
  width: 70%;
}
.user-query .auz-tree input {
  margin-bottom: 20px;
}
.auz-tree .el-tree {
  border-radius: 5px;
}
</style>
