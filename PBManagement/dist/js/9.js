webpackJsonp([9],{

/***/ 530:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(533)(
  /* script */
  __webpack_require__(562),
  /* template */
  __webpack_require__(563),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "E:\\ml\\ex\\PBManagement\\src\\components\\RoleAdd.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] RoleAdd.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8d84c3ce", Component.options)
  } else {
    hotAPI.reload("data-v-8d84c3ce", Component.options)
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

/***/ 562:
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
        roleName: '',
        remark: ''
      },
      rules: {
        roleName: [{ required: true, message: '请输入角色', trigger: 'blur' }]
      },
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
  },

  methods: {
    onSubmit: function onSubmit() {
      var _this = this;
      _this.$refs.form.validate(function (valid) {
        if (valid) {
          _this.submitStatus = true;
          _this.$axios.post(PBConf.routerURL, {
            func: '610',
            uid: _this.userInfo.userId,
            token: _this.userInfo.token,
            data: [{
              roleName: _this.form.roleName,
              remark: _this.form.remark
            }]
          }).then(function (axiosData) {
            _this.submitStatus = false;
            if (axiosData.data.retHead == '0') {
              _this.$alert('角色增加成功', '提示', {
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

/***/ 563:
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
      "label": "角色",
      "prop": "roleName"
    }
  }, [_c('el-input', {
    on: {
      "focus": function($event) {
        _vm.error = ''
      }
    },
    model: {
      value: (_vm.form.roleName),
      callback: function($$v) {
        _vm.form.roleName = $$v
      },
      expression: "form.roleName"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "备注",
      "prop": "remark"
    }
  }, [_c('el-input', {
    on: {
      "focus": function($event) {
        _vm.error = ''
      }
    },
    model: {
      value: (_vm.form.remark),
      callback: function($$v) {
        _vm.form.remark = $$v
      },
      expression: "form.remark"
    }
  })], 1), _vm._v(" "), (_vm.error) ? _c('el-form-item', {
    staticClass: "error"
  }, [_c('p', [_vm._v(_vm._s(_vm.error))])]) : _vm._e(), _vm._v(" "), _c('el-form-item', [_c('el-button', {
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
     require("vue-hot-reload-api").rerender("data-v-8d84c3ce", module.exports)
  }
}

/***/ })

});