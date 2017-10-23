webpackJsonp([10],{

/***/ 532:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(533)(
  /* script */
  __webpack_require__(568),
  /* template */
  __webpack_require__(569),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "E:\\ml\\ex\\PBManagement\\src\\components\\OperationsLog.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] OperationsLog.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a27552f4", Component.options)
  } else {
    hotAPI.reload("data-v-a27552f4", Component.options)
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

/***/ 568:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moment = __webpack_require__(0);

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  props: ['userRootAuz'],
  data: function data() {
    return {
      userInfo: {},
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick: function onClick(picker) {
            var end = new Date();
            var start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick: function onClick(picker) {
            var end = new Date();
            var start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick: function onClick(picker) {
            var end = new Date();
            var start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      form: {
        name: '',
        time: ['', ''],
        type: ''
      },
      queryError: '',
      queryStatus: false,
      opsData: []
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
    getDate: function getDate(date) {
      return (0, _moment2.default)(date).format('YYYY-MM-DD');
    },
    onQuery: function onQuery() {
      var _this = this;
      _this.queryStatus = true;
      _this.queryError = '';
      _this.$axios.post(PBConf.routerURL, {
        func: '618',
        uid: _this.userInfo.userId,
        token: _this.userInfo.token,
        data: [{
          loginName: _this.form.name,
          desc: _this.form.type,
          funcCode: '',
          startTime: _this.form.time[0] ? _this.getDate(_this.form.time[0]) : '',
          endTime: _this.form.time[1] ? _this.getDate(_this.form.time[1]) : ''
        }]
      }).then(function (axiosData) {
        _this.queryStatus = false;
        if (axiosData.data.retHead == '0') {
          _this.opsData = axiosData.data.data;
        } else {
          _this.queryError = axiosData.data.desc;
          return false;
        }
      }).catch(function (error) {
        _this.queryStatus = false;
        console.error(error);
      });
    }
  }
};

/***/ }),

/***/ 569:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "opslog"
  }, [_c('el-form', {
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
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "操作日期"
    }
  }, [_c('el-date-picker', {
    attrs: {
      "type": "daterange",
      "align": "right",
      "placeholder": "选择日期范围",
      "picker-options": _vm.pickerOptions
    },
    model: {
      value: (_vm.form.time),
      callback: function($$v) {
        _vm.form.time = $$v
      },
      expression: "form.time"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "操作类型"
    }
  }, [_c('el-select', {
    attrs: {
      "placeholder": "请选择操作类型"
    },
    model: {
      value: (_vm.form.type),
      callback: function($$v) {
        _vm.form.type = $$v
      },
      expression: "form.type"
    }
  }, [_c('el-option', {
    attrs: {
      "value": "用户登录操作"
    }
  }), _vm._v(" "), _c('el-option', {
    attrs: {
      "value": "获取指定用户列表"
    }
  })], 1)], 1), _vm._v(" "), _c('el-form-item', [_c('el-button', {
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
      "span": 19
    }
  }, [_c('el-table', {
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "data": _vm.opsData,
      "max-height": "500"
    }
  }, [_c('el-table-column', {
    attrs: {
      "prop": "loginName",
      "label": "用户名",
      "width": "100px"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "time",
      "label": "操作时间",
      "width": "180px"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "ip",
      "label": "IP地址",
      "width": "150px"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "funcDesc",
      "label": "操作类型"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "result",
      "label": "状态",
      "width": "70px"
    }
  })], 1)], 1)], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-a27552f4", module.exports)
  }
}

/***/ })

});