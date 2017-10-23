webpackJsonp([8],{

/***/ 528:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(533)(
  /* script */
  __webpack_require__(556),
  /* template */
  __webpack_require__(557),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "E:\\ml\\ex\\PBManagement\\src\\components\\UserAdd.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] UserAdd.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-fcbc8db8", Component.options)
  } else {
    hotAPI.reload("data-v-fcbc8db8", Component.options)
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

/***/ 556:
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
        loginName: '',
        password: '',
        rid: '',
        name: '',
        phone: '',
        department: ''
      },
      rules: {
        loginName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        rid: [{ required: true, message: '请选择角色', trigger: 'change' }],
        name: [{ required: true, message: '请选择姓名', trigger: 'blur' }]
      },
      roleList: [],
      error: '',
      submitStatus: false
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
    _this.getRoleList();
  },

  methods: {
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
    resetForm: function resetForm() {
      this.$refs.form.resetFields();
    },
    onSubmit: function onSubmit() {
      var _this = this;
      _this.$refs.form.validate(function (valid) {
        if (valid) {
          _this.submitStatus = true;
          _this.$axios.post(PBConf.routerURL, {
            func: '606',
            uid: _this.userInfo.userId,
            token: _this.userInfo.token,
            data: [{
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
                callback: function callback() {
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
};

/***/ }),

/***/ 557:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "user-query"
  }, [_c('div', {
    staticClass: "user-form"
  }, [_c('el-form', {
    ref: "form",
    attrs: {
      "model": _vm.form,
      "rules": _vm.rules,
      "label-position": "left",
      "label-width": "80px"
    }
  }, [_c('el-form-item', {
    attrs: {
      "label": "用户名",
      "prop": "loginName"
    },
    on: {
      "focus": function($event) {
        _vm.error = ''
      }
    }
  }, [_c('el-input', {
    model: {
      value: (_vm.form.loginName),
      callback: function($$v) {
        _vm.form.loginName = $$v
      },
      expression: "form.loginName"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "密码",
      "prop": "password"
    },
    on: {
      "focus": function($event) {
        _vm.error = ''
      }
    }
  }, [_c('el-input', {
    model: {
      value: (_vm.form.password),
      callback: function($$v) {
        _vm.form.password = $$v
      },
      expression: "form.password"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "角色",
      "prop": "rid"
    }
  }, [_c('el-select', {
    attrs: {
      "placeholder": "请选择角色"
    },
    on: {
      "change": function($event) {
        _vm.error = ''
      }
    },
    model: {
      value: (_vm.form.rid),
      callback: function($$v) {
        _vm.form.rid = $$v
      },
      expression: "form.rid"
    }
  }, _vm._l((_vm.roleList), function(role) {
    return _c('el-option', {
      attrs: {
        "label": role.roleName,
        "value": role.rid
      }
    })
  }))], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "姓名",
      "prop": "name"
    },
    on: {
      "focus": function($event) {
        _vm.error = ''
      }
    }
  }, [_c('el-input', {
    model: {
      value: (_vm.form.name),
      callback: function($$v) {
        _vm.form.name = $$v
      },
      expression: "form.name"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "手机",
      "prop": "phone"
    },
    on: {
      "focus": function($event) {
        _vm.error = ''
      }
    }
  }, [_c('el-input', {
    model: {
      value: (_vm.form.phone),
      callback: function($$v) {
        _vm.form.phone = $$v
      },
      expression: "form.phone"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "部门",
      "prop": "department"
    },
    on: {
      "focus": function($event) {
        _vm.error = ''
      }
    }
  }, [_c('el-input', {
    model: {
      value: (_vm.form.department),
      callback: function($$v) {
        _vm.form.department = $$v
      },
      expression: "form.department"
    }
  })], 1), _vm._v(" "), (_vm.error) ? _c('el-form-item', {
    staticClass: "error"
  }, [_c('p', [_vm._v(_vm._s(_vm.error))])]) : _vm._e(), _vm._v(" "), _c('el-form-item', [_c('el-button', {
    on: {
      "click": function($event) {
        _vm.resetForm('ruleForm')
      }
    }
  }, [_vm._v("重置")]), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "primary",
      "loading": _vm.submitStatus
    },
    on: {
      "click": _vm.onSubmit
    }
  }, [_vm._v("提交")])], 1)], 1)], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-fcbc8db8", module.exports)
  }
}

/***/ })

});