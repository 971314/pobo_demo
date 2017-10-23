webpackJsonp([7],{

/***/ 527:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(533)(
  /* script */
  __webpack_require__(554),
  /* template */
  __webpack_require__(555),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "E:\\ml\\ex\\PBManagement\\src\\components\\UserQuery.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] UserQuery.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-734cff0b", Component.options)
  } else {
    hotAPI.reload("data-v-734cff0b", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 533:
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 554:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  props: ['userRootAuz'],
  data: function data() {
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
        roleName: [{ required: true, message: '请选择角色', trigger: 'change' }]
      },
      query: true,
      check: false,
      edit: false,
      editRole: false
    };
  },
  mounted: function mounted() {
    var _this = this;
    var auz = _this.userRootAuz.children.filter(function (item) {
      return item.url === _this.$route.path;
    });
    if (auz.length == 0) {
      _this.$router.replace(_this.userRootAuz.children[0].url);
    }
    _this.userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
    _this.onQuery();
  },

  methods: {
    onQuery: function onQuery() {
      var _this = this;
      _this.queryStatus = true;
      _this.queryError = '';
      _this.$axios.post(PBConf.routerURL, {
        func: '604',
        uid: _this.userInfo.userId,
        token: _this.userInfo.token,
        data: [{
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
    getUserData: function getUserData(userData) {
      var _this = this;
      _this.$axios.post(PBConf.routerURL, {
        func: '607',
        uid: _this.userInfo.userId,
        token: _this.userInfo.token,
        data: [{
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
    onCheck: function onCheck(userData) {
      this.getUserData(userData);
      this.query = false;
      this.edit = false;
      this.editRole = false;
      this.check = true;
    },
    onEdit: function onEdit(userData) {
      this.getUserData(userData);
      this.query = false;
      this.check = false;
      this.editRole = false;
      this.edit = true;
    },
    getRoleList: function getRoleList() {
      var _this = this;
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
    onEditRole: function onEditRole(userData) {
      this.userData = userData;
      this.getRoleList();
      this.query = false;
      this.check = false;
      this.edit = false;
      this.editRole = true;
    },
    onDelete: function onDelete(index, userData) {
      var _this = this;
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
          data: [{
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
    onGoback: function onGoback() {
      this.queryError = '';
      this.error = '';
      this.roleError = '';
      this.check = false;
      this.edit = false;
      this.editRole = false;
      this.query = true;
    },
    onSubmit: function onSubmit() {
      var _this = this;
      _this.submitStatus = true;
      _this.error = '';
      _this.$axios.post(PBConf.routerURL, {
        func: '608',
        uid: _this.userInfo.userId,
        token: _this.userInfo.token,
        data: [{
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
            callback: function callback() {
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
    onSubmitRole: function onSubmitRole() {
      var _this = this;
      _this.submitRoleStatus = true;
      _this.roleError = '';
      _this.$axios.post(PBConf.routerURL, {
        func: '612',
        uid: _this.userInfo.userId,
        token: _this.userInfo.token,
        data: [{
          id: _this.userData.id,
          rid: _this.userData.rid,
          remark: _this.userData.remark || ' '
        }]
      }).then(function (axiosData) {
        _this.submitRoleStatus = false;
        if (axiosData.data.retHead == '0') {
          _this.$alert('用户角色修改成功', '提示', {
            confirmButtonText: '确定',
            callback: function callback() {
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
};

/***/ }),

/***/ 555:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "user-query"
  }, [(_vm.query) ? _c('div', [_c('el-form', {
    ref: "form",
    attrs: {
      "inline": true,
      "model": _vm.form
    }
  }, [_c('el-form-item', {
    attrs: {
      "label": "用户名"
    }
  }, [_c('el-input', {
    attrs: {
      "placeholder": "用户名"
    },
    model: {
      value: (_vm.form.name),
      callback: function($$v) {
        _vm.form.name = $$v
      },
      expression: "form.name"
    }
  })], 1), _vm._v(" "), _c('el-form-item', [_c('el-button', {
    attrs: {
      "type": "primary",
      "loading": _vm.queryStatus
    },
    on: {
      "click": _vm.onQuery
    }
  }, [_vm._v("查询")])], 1)], 1), _vm._v(" "), (_vm.queryError) ? _c('div', {
    staticClass: "error"
  }, [_c('p', [_vm._v(_vm._s(_vm.queryError))])]) : _vm._e(), _vm._v(" "), _c('el-row', [_c('el-col', {
    attrs: {
      "span": 14
    }
  }, [_c('el-table', {
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "data": _vm.usersData,
      "border": ""
    }
  }, [_c('el-table-column', {
    attrs: {
      "prop": "loginName",
      "label": "用户名"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "roleName",
      "label": "角色"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "label": "状态",
      "width": "70px"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_vm._v("\n              " + _vm._s(scope.row.status == 1 ? '正常' : '停用') + "\n            ")]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "label": "操作",
      "width": "200px"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('el-button', {
          attrs: {
            "type": "text",
            "size": "small"
          },
          on: {
            "click": function($event) {
              _vm.onCheck(scope.row)
            }
          }
        }, [_vm._v("查看")]), _vm._v(" "), _c('el-button', {
          attrs: {
            "type": "text",
            "size": "small"
          },
          on: {
            "click": function($event) {
              _vm.onEdit(scope.row)
            }
          }
        }, [_vm._v("编辑")]), _vm._v(" "), _c('el-button', {
          attrs: {
            "type": "text",
            "size": "small"
          },
          on: {
            "click": function($event) {
              _vm.onEditRole(scope.row)
            }
          }
        }, [_vm._v("角色修改")]), _vm._v(" "), _c('el-button', {
          staticClass: "el-button--danger",
          attrs: {
            "type": "text",
            "size": "small"
          },
          on: {
            "click": function($event) {
              _vm.onDelete(scope.$index, scope.row)
            }
          }
        }, [_vm._v("删除")])]
      }
    }])
  })], 1)], 1)], 1)], 1) : _vm._e(), _vm._v(" "), (_vm.check || _vm.edit) ? _c('div', {
    staticClass: "user-form"
  }, [_c('el-form', {
    ref: "form",
    attrs: {
      "model": _vm.userData,
      "label-position": "left",
      "label-width": "80px"
    }
  }, [_c('el-form-item', {
    attrs: {
      "label": "用户名"
    }
  }, [_c('span', [_vm._v(_vm._s(_vm.userData.loginName))])]), _vm._v(" "), (_vm.edit) ? _c('el-form-item', {
    attrs: {
      "label": "新密码"
    }
  }, [_c('el-input', {
    on: {
      "focus": function($event) {
        _vm.error = ''
      }
    },
    model: {
      value: (_vm.userData.newPassword),
      callback: function($$v) {
        _vm.userData.newPassword = $$v
      },
      expression: "userData.newPassword"
    }
  })], 1) : _vm._e(), _vm._v(" "), (_vm.check) ? _c('el-form-item', {
    attrs: {
      "label": "角色"
    }
  }, [_c('span', [_vm._v(_vm._s(_vm.userData.roleName))])]) : _vm._e(), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "状态"
    }
  }, [(_vm.check) ? _c('span', [_vm._v(_vm._s(_vm.userData.status == 1 ? '正常' : '停用'))]) : _vm._e(), _vm._v(" "), (_vm.edit) ? _c('el-radio-group', {
    on: {
      "change": function($event) {
        _vm.error = ''
      }
    },
    model: {
      value: (_vm.userData.status),
      callback: function($$v) {
        _vm.userData.status = $$v
      },
      expression: "userData.status"
    }
  }, [_c('el-radio', {
    attrs: {
      "label": "1"
    }
  }, [_vm._v("正常")]), _vm._v(" "), _c('el-radio', {
    attrs: {
      "label": "2"
    }
  }, [_vm._v("停用")])], 1) : _vm._e()], 1), _vm._v(" "), (_vm.check) ? _c('el-form-item', {
    attrs: {
      "label": "姓名"
    }
  }, [_c('span', [_vm._v(_vm._s(_vm.userData.name))])]) : _vm._e(), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "手机"
    }
  }, [(_vm.check) ? _c('span', [_vm._v(_vm._s(_vm.userData.phone))]) : _vm._e(), _vm._v(" "), (_vm.edit) ? _c('el-input', {
    on: {
      "focus": function($event) {
        _vm.error = ''
      }
    },
    model: {
      value: (_vm.userData.phone),
      callback: function($$v) {
        _vm.userData.phone = $$v
      },
      expression: "userData.phone"
    }
  }) : _vm._e()], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "部门"
    }
  }, [(_vm.check) ? _c('span', [_vm._v(_vm._s(_vm.userData.department))]) : _vm._e(), _vm._v(" "), (_vm.edit) ? _c('el-input', {
    on: {
      "focus": function($event) {
        _vm.error = ''
      }
    },
    model: {
      value: (_vm.userData.department),
      callback: function($$v) {
        _vm.userData.department = $$v
      },
      expression: "userData.department"
    }
  }) : _vm._e()], 1), _vm._v(" "), (_vm.error) ? _c('el-form-item', {
    staticClass: "error"
  }, [_c('p', [_vm._v(_vm._s(_vm.error))])]) : _vm._e(), _vm._v(" "), _c('el-form-item', [_c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": _vm.onGoback
    }
  }, [_vm._v("返回")]), _vm._v(" "), (_vm.edit) ? _c('el-button', {
    attrs: {
      "type": "primary",
      "loading": _vm.submitStatus
    },
    on: {
      "click": _vm.onSubmit
    }
  }, [_vm._v("提交")]) : _vm._e()], 1)], 1)], 1) : _vm._e(), _vm._v(" "), (_vm.editRole) ? _c('div', {
    staticClass: "user-form"
  }, [_c('el-form', {
    ref: "form",
    attrs: {
      "model": _vm.userData,
      "rules": _vm.rules,
      "label-position": "left",
      "label-width": "80px"
    }
  }, [_c('el-form-item', {
    attrs: {
      "label": "角色",
      "prop": "roleName"
    }
  }, [_c('el-select', {
    attrs: {
      "placeholder": "请选择角色"
    },
    on: {
      "change": function($event) {
        _vm.roleError = ''
      }
    },
    model: {
      value: (_vm.userData.rid),
      callback: function($$v) {
        _vm.userData.rid = $$v
      },
      expression: "userData.rid"
    }
  }, _vm._l((_vm.roleList), function(role) {
    return _c('el-option', {
      attrs: {
        "label": role.roleName,
        "value": role.rid
      }
    })
  }))], 1), _vm._v(" "), (_vm.roleError) ? _c('el-form-item', {
    staticClass: "error"
  }, [_c('p', [_vm._v(_vm._s(_vm.roleError))])]) : _vm._e(), _vm._v(" "), _c('el-form-item', [_c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": _vm.onGoback
    }
  }, [_vm._v("返回")]), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "primary",
      "loading": _vm.submitRoleStatus
    },
    on: {
      "click": _vm.onSubmitRole
    }
  }, [_vm._v("提交")])], 1)], 1)], 1) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-734cff0b", module.exports)
  }
}

/***/ })

});