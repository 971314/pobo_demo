<template>
  <div class="user-query">
    <div v-if="query">
      <el-form ref="form" :inline="true" :model="form">
        <el-form-item label="角色">
          <el-input v-model="form.roleName" placeholder="角色"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onQuery" :loading="queryStatus">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="error" v-if="queryError">
        <p>{{ queryError }}</p>
      </div>
      <el-row>
        <el-col :span="12">
          <el-table :data="rolesData" border style="width: 100%">
            <el-table-column prop="roleName" label="角色"></el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>
            <el-table-column label="操作" width="120px">
              <template scope="scope">
                <el-button type="text" size="small" @click="onEdit(scope.row)">编辑</el-button>
                <el-button type="text" size="small" @click="onRelate(scope.row)">权限关联</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <div v-if="edit" class="user-form">
      <el-form ref="form" :model="roleData" :rules="rules" label-position="left" label-width="80px">
        <el-form-item label="角色" prop="roleName">
          <el-input v-model="roleData.roleName" @focus="roleError = ''"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="roleData.remark" @focus="roleError = ''"></el-input>
        </el-form-item>
        <el-form-item class="error" v-if="roleError">
          <p>{{ roleError }}</p>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onGoback(1)">返回</el-button>
          <el-button type="primary" @click="onSubmit" :loading="submitStatus">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-if="relate" class="auz-tree">
      <p class="user-auz">
        <el-button type="primary" icon="arrow-left" @click="onGoback(1)">返回</el-button>
        {{ roleData.roleName }}的权限
        <el-button type="primary" @click="onSubmitRelate()" :loading="submitRelateStatus">关联权限</el-button>
      </p>
      <div class="error" v-if="relateError"><p>{{ relateError }}</p></div>
      <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
      <el-tree
        :data="auzsData"
        :props="auzProps"
        ref="auzTree"
        show-checkbox
        node-key="pid"
        default-expand-all
        :filter-node-method="filterNode"
        :render-content="renderContent">
      </el-tree>
    </div>
    <div v-if="addAuz || editAuz" class="user-form">
      <el-form ref="form" :model="auzData" :rules="auzRules" label-position="left" label-width="100px">
        <el-form-item label="父节点编号">
          <span>{{ auzData.parentCode }}</span>
        </el-form-item>
        <!-- <el-form-item v-if="add" label="节点编号" prop="code">
          <el-input v-model="auzData.code"></el-input>
        </el-form-item> -->
        <el-form-item label="节点名称" prop="description">
          <el-input v-model="auzData.description" @focus="auzError = ''"></el-input>
        </el-form-item>
        <el-form-item label="节点序号">
          <el-input v-model="auzData.orderNum" @focus="auzError = ''"></el-input>
        </el-form-item>
        <el-form-item label="功能编号">
          <el-input v-model="auzData.funcCode" @focus="auzError = ''"></el-input>
        </el-form-item>
        <el-form-item v-if="addAuz || auzData.children.length == 0" label="节点url">
          <el-input v-model="auzData.url" @focus="auzError = ''"></el-input>
        </el-form-item>
        <el-form-item class="error" v-if="auzError">
          <p>{{ auzError }}</p>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onGoback(2)">返回</el-button>
          <el-button type="primary" @click="onSubmitAuz" :loading="submitAuzStatus">提交</el-button>
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
        roleName: ''
      },
      rules: {
        roleName: [
          { required: true, message: '请输入角色', trigger: 'blur' }
        ]
      },
      queryError: '',
      roleError: '',
      relateError: '',
      auzError: '',
      queryStatus: false,
      submitStatus: false,
      submitRelateStatus: false,
      submitAuzStatus: false,
      rolesData: [],
      roleData: {},
      auzsData: [],
      auzProps: {
        children: 'children',
        label: 'description'
      },
      auzData: {},
      auzRules: {
        description: [
          { required: true, message: '请输入节点名称', trigger: 'blur' }
        ]
      },
      roleAuzsData: [],
      filterText: '',
      query: true,
      edit: false,
      relate: false,
      editAuz: false,
      addAuz: false
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
  updated () {
    if (this.relate) {
      this.setCheckedKeys(this.roleAuzsData);
    }
  },
  watch: {
    filterText(val) {
      this.$refs.auzTree.filter(val);
    }
  },
  methods: {
    getCheckedKeys() {
      return this.$refs.auzTree.getCheckedKeys(false, true);
    },
    setCheckedKeys (roleAuzsData) {
      let pids = [];
      for (let i = 0, l = roleAuzsData.length; i < l; i++) {
        let code = roleAuzsData[i].code;
        let hasChild = false;
        for (let j = 0; j < l; j++) {
          if (roleAuzsData[j].parentCode == code ) {
            hasChild = true;
            break;
          }
        }
        if (!hasChild) {
          pids.push(roleAuzsData[i].pid);
        }
      }
      this.$refs.auzTree.setCheckedKeys(pids);
    },
    getAuzsData (rid) {
      let _this = this;
      _this.relateError = '';
      let params = {
        func: '613',
        uid: _this.userInfo.userId,
        token: _this.userInfo.token,
        data:[{
          id: '0'
        }]
      };
      if (rid) {
        params = {
          func: '617',
          uid: _this.userInfo.userId,
          token: _this.userInfo.token,
          data:[{
            rid: rid
          }]
        };
      }
      _this.$axios.post(PBConf.routerURL, params).then(function (axiosData) {
        if (axiosData.data.retHead == '0') {
          if (rid) {
            _this.roleAuzsData = axiosData.data.data;
            _this.setCheckedKeys(_this.roleAuzsData);
          } else {
            _this.auzsData = axiosData.data.data[0].funcList;
          }
        } else {
          _this.roleAuzsData = [];
          _this.setCheckedKeys(_this.roleAuzsData);
          _this.relateError = axiosData.data.desc;
          return false;
        }
      }).catch(function (error) {
        console.error(error);
      });
    },
    onQuery () {
      let _this = this;
      _this.queryStatus = true;
      _this.queryError = '';
      _this.$axios.post(PBConf.routerURL, {
        func: '609',
        uid: _this.userInfo.userId,
        token: _this.userInfo.token,
        data:[{
          roleName: _this.form.roleName
        }]
      }).then(function (axiosData) {
        _this.queryStatus = false;
        if (axiosData.data.retHead == '0') {
          _this.rolesData = axiosData.data.data[0].roles;
          _this.getAuzsData(false);
        } else {
          _this.queryError = axiosData.data.desc;
          return false;
        }
      }).catch(function (error) {
        _this.queryStatus = false;
        console.error(error);
      });
    },
    onEdit (roleData) {
      this.roleData = roleData;
      this.query = false;
      this.relate = false;
      this.editAuz = false;
      this.addAuz = false;
      this.edit = true;
    },
    onRelate (roleData) {
      this.roleData = roleData;
      this.getAuzsData(roleData.rid);
      this.query = false;
      this.edit = false;
      this.editAuz = false;
      this.addAuz = false;
      this.relate = true;
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.description.indexOf(value) !== -1;
    },
    onAddAuz (store, data, event) {
      event.stopPropagation();
      console.dir(data);
      this.auzData = {
        pid: '',
        parentCode: data.code,
        code: '',
        description: '',
        orderNum: '',
        url: '',
        sub: data.sub
      };
      this.query = false;
      this.edit = false;
      this.relate = false;
      this.editAuz = false;
      this.addAuz = true;
    },
    onEditAuz (store, data, event) {
      event.stopPropagation();
      console.dir(data);
      this.auzData = data;
      this.query = false;
      this.edit = false;
      this.relate = false;
      this.addAuz = false;
      this.editAuz = true;
    },
    renderContent (h, { node, data, store }) {
      if (data.parentCode == 0) {
        return (
          <span style="white-space: normal;">
            <span>
              <span>{node.label}</span>
            </span>
            <span style="float: right; margin-right: 20px">
              <el-button size="mini" type="info" disabled>修改</el-button>
              <el-button size="mini" type="info" on-click={ ($event) => this.onAddAuz(store, data, $event) }>增加</el-button>
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
              <el-button size="mini" type="info" on-click={ ($event) => this.onEditAuz(store, data, $event) }>修改</el-button>
              <el-button size="mini" type="info" disabled>增加</el-button>
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
              <el-button size="mini" type="info" on-click={ ($event) => this.onEditAuz(store, data, $event) }>修改</el-button>
              <el-button size="mini" type="info" on-click={ ($event) => this.onAddAuz(store, data, $event) }>增加</el-button>
            </span>
          </span>
        );
      }
    },
    onGoback (flag) {
      this.queryError = '';
      this.roleError = '';
      this.relateError = '';
      this.auzError = '';
      this.edit = false;
      this.editAuz = false;
      this.addAuz = false;
      if (flag == 1) {
        this.relate = false;
        this.query = true;
      } else {
        this.query = false;
        this.relate = true;
      }
    },
    onSubmit () {
      let _this = this;
      _this.submitStatus = true;
      _this.roleError = '';
      _this.$axios.post(PBConf.routerURL, {
        func: '611',
        uid: _this.userInfo.userId,
        token: _this.userInfo.token,
        data:[{
          rid: _this.roleData.rid,
          roleName: _this.roleData.roleName,
          remark: _this.roleData.remark
        }]
      }).then(function (axiosData) {
        _this.submitStatus = false;
        if (axiosData.data.retHead == '0') {
          _this.$alert('角色修改成功', '提示', {
            confirmButtonText: '确定',
            callback: () => {
              _this.onQuery();
              _this.onGoback(1);
            }
          });
        } else {
          _this.roleError = axiosData.data.desc;
          return false;
        }
      }).catch(function (error) {
        _this.submitStatus = false;
        console.error(error);
      });
    },
    onSubmitRelate () {
      let _this = this;
      _this.submitRelateStatus = true;
      _this.relateError = '';
      let pids = _this.getCheckedKeys().join('|');
      _this.$axios.post(PBConf.routerURL, {
        func: '616',
        uid: _this.userInfo.userId,
        token: _this.userInfo.token,
        data:[{
          rid: _this.roleData.rid,
          funcList: [{pids: pids}]
        }]
      }).then(function (axiosData) {
        _this.submitRelateStatus = false;
        if (axiosData.data.retHead == '0') {
          _this.$alert('权限关联成功', '提示', {
            confirmButtonText: '确定',
            callback: () => {
              _this.onGoback(1);
            }
          });
        } else {
          _this.relateError = axiosData.data.desc;
          return false;
        }
      }).catch(function (error) {
        _this.submitRelateStatus = false;
        console.error(error);
      });
    },
    onSubmitAuz () {
      let _this = this;
      _this.$refs.form.validate((valid) => {
        if (valid) {
          _this.submitAuzStatus = true;
          _this.auzError = '';
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
              sub: _this.auzData.sub || '',
              remark: ''
            }]
          };
          if (_this.addAuz) {
            params.func = '614';
            delete params.data[0].pid;
          }
          _this.$axios.post(PBConf.routerURL, params).then(function (axiosData) {
            _this.submitAuzStatus = false;
            if (axiosData.data.retHead == '0') {
              let msg = '权限修改成功';
              if (_this.addAuz) {
                msg = '权限增加成功'
              }
              _this.$alert(msg, '提示', {
                confirmButtonText: '确定',
                callback: () => {
                  _this.getAuzsData(false);
                  _this.getAuzsData(_this.roleData.rid);
                  _this.onGoback();
                }
              });
            } else {
              _this.auzError = axiosData.data.desc;
              return false;
            }
          }).catch(function (error) {
            _this.submitAuzStatus = false;
            console.error(error);
          });
        } else {
          _this.auzError = '';
          _this.submitAuzStatus = false;
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
