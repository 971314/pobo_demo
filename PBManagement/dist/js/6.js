webpackJsonp([6],{

/***/ 526:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(533)(
  /* script */
  __webpack_require__(552),
  /* template */
  __webpack_require__(553),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "E:\\ml\\ex\\PBManagement\\src\\components\\UserRoot.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] UserRoot.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-16260d22", Component.options)
  } else {
    hotAPI.reload("data-v-16260d22", Component.options)
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

/***/ 552:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  data: function data() {
    return {
      userInfo: {},
      userRootAuz: {},
      noAuz: false
    };
  },
  mounted: function mounted() {
    this.userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
    this.getSubSysAuz();
  },

  methods: {
    getSubSysAuz: function getSubSysAuz() {
      var _this = this;
      _this.$axios.post(PBConf.routerURL, {
        func: '601',
        uid: _this.userInfo.userId,
        token: _this.userInfo.token,
        data: [{
          sub: PBConf.userRootSub
        }]
      }).then(function (axiosData) {
        if (axiosData.data.retHead == '0') {
          _this.userRootAuz = axiosData.data.data[0];
        } else {
          _this.$alert(axiosData.data.desc, '提示', {
            confirmButtonText: '确定',
            callback: function callback() {
              _this.noAuz = true;
            }
          });
        }
      }).catch(function (error) {
        console.error(error);
      });
    },
    onGoback: function onGoback() {
      this.$router.replace('/');
    }
  }
};

/***/ }),

/***/ 553:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.userRootAuz.children && _vm.userRootAuz.children.length > 0) ? _c('div', {
    staticClass: "menus"
  }, [_c('el-menu', {
    staticClass: "el-menu--vertical",
    attrs: {
      "theme": "dark",
      "default-active": _vm.userRootAuz.children[0].url,
      "router": true,
      "routerReplace": true
    }
  }, _vm._l((_vm.userRootAuz.children), function(auz) {
    return _c('el-menu-item', {
      attrs: {
        "index": auz.url
      }
    }, [_vm._v(_vm._s(auz.description))])
  }))], 1) : _vm._e(), _vm._v(" "), (_vm.userRootAuz.children && _vm.userRootAuz.children.length > 0) ? _c('div', {
    staticClass: "content"
  }, [_c('router-view', {
    attrs: {
      "userRootAuz": _vm.userRootAuz
    }
  })], 1) : _vm._e(), _vm._v(" "), (_vm.noAuz) ? _c('div', {
    staticStyle: {
      "padding": "10px 50px"
    }
  }, [_c('h2', [_vm._v("对不起，您无权访问该系统！")]), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": _vm.onGoback
    }
  }, [_vm._v("返回首页")])], 1) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-16260d22", module.exports)
  }
}

/***/ })

});