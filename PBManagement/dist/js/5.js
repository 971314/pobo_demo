webpackJsonp([5],{

/***/ 522:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(533)(
  /* script */
  __webpack_require__(540),
  /* template */
  __webpack_require__(541),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "E:\\ml\\ex\\PBManagement\\src\\components\\Main.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Main.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-95db0a4a", Component.options)
  } else {
    hotAPI.reload("data-v-95db0a4a", Component.options)
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

/***/ 540:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});


var websocket = void 0;
var wserrorTimes = 0;
function initWS(WSHost) {
  if (window.location.protocol == 'https:') {
    WSHost = 'wss://' + WSHost;
  } else {
    WSHost = 'ws://' + WSHost;
  }
  if ('WebSocket' in window) {
    websocket = new WebSocket(WSHost);
  } else if ('MozWebSocket' in window) {
    websocket = new MozWebSocket(WSHost);
  } else {
    console.error('WebSocket is not supported by this browser.');
    return;
  }
}
exports.default = {
  data: function data() {
    return {
      loginName: '',
      userType: 0,
      menuTree: []
    };
  },
  mounted: function mounted() {
    var userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
    var menuTree = JSON.parse(window.sessionStorage.getItem('menuTree'));
    this.loginName = userInfo.loginName;
    this.userType = userInfo.userType;
    this.setMenu(menuTree);
    this.initSSO(userInfo);
  },

  methods: {
    getUrl: function getUrl(url) {
      return url ? url : '/';
    },
    handleSelect: function handleSelect(key, keyPath) {
      if (key == '/login') {
        window.sessionStorage.setItem('userInfo', '');
        window.sessionStorage.setItem('menuTree', '');
        websocket && websocket.close();
      }
    },
    setMenu: function setMenu(menuTree) {
      this.menuTree = menuTree;
      this.$router.replace(this.getUrl(menuTree[0].url));
    },
    initSSO: function initSSO(userInfo) {
      var _this = this;
      var WSHost = PBConf.WSHost;
      initWS(WSHost);
      websocket.onopen = function () {
        websocket.send(JSON.stringify({
          uid: userInfo.userId,
          token: userInfo.token
        }));
      };
      websocket.onmessage = function (event) {
        var data = JSON.parse(event.data);
        if (data.status != '0') {
          window.sessionStorage.setItem('userInfo', '');
          window.sessionStorage.setItem('menuTree', '');
          if (data.status == '-100') {
            _this.$alert(data.msg, '提示', {
              confirmButtonText: '确定',
              callback: function callback() {
                websocket.close();
                _this.$router.replace('/login');
              }
            });
          } else {
            _this.$alert('登录异常，请重新登录', '提示', {
              confirmButtonText: '确定',
              callback: function callback() {
                websocket.close();
                _this.$router.replace('/login');
              }
            });
          }
        }
      };
      websocket.onerror = function (event) {
        if (wserrorTimes < 5) {
          wserrorTimes++;
          websocket.close();
          initWS(WSHost);
        }
      };
    }
  }
};

/***/ }),

/***/ 541:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.menuTree.length > 0) ? _c('el-menu', {
    staticClass: "navbar navbar-fixed-top",
    attrs: {
      "default-active": _vm.menuTree[0].url,
      "theme": "dark",
      "router": true,
      "routerReplace": true,
      "mode": "horizontal"
    },
    on: {
      "select": _vm.handleSelect
    }
  }, [_c('el-menu-item', {
    staticClass: "navbar-brand",
    attrs: {
      "index": "/"
    }
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(542)
    }
  }), _c('span', [_vm._v("澎博后台管理")])]), _vm._v(" "), _c('el-submenu', {
    staticClass: "navbar-right",
    attrs: {
      "index": "/"
    }
  }, [_c('template', {
    slot: "title"
  }, [_vm._v(_vm._s(_vm.loginName))]), _vm._v(" "), _c('el-menu-item', {
    attrs: {
      "index": "/password"
    }
  }, [_vm._v("修改密码")]), _vm._v(" "), _c('el-menu-item', {
    attrs: {
      "index": "/login"
    }
  }, [_vm._v("退出")])], 2), _vm._v(" "), _vm._l((_vm.menuTree), function(menu) {
    return _c('el-menu-item', {
      key: menu.code,
      attrs: {
        "index": _vm.getUrl(menu.url)
      }
    }, [_vm._v(_vm._s(menu.description ? menu.description : '管理' + menu.code))])
  })], 2) : _vm._e(), _vm._v(" "), _c('router-view', {
    staticClass: "container"
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-95db0a4a", module.exports)
  }
}

/***/ }),

/***/ 542:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjM5OTgzOEE3QTAxMjExRTZCMDhGRjFGN0RBMkU1RkYxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjM5OTgzOEE4QTAxMjExRTZCMDhGRjFGN0RBMkU1RkYxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Mzk5ODM4QTVBMDEyMTFFNkIwOEZGMUY3REEyRTVGRjEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Mzk5ODM4QTZBMDEyMTFFNkIwOEZGMUY3REEyRTVGRjEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6NGhWuAAAET0lEQVR42rxXTWxUVRg997773vy3M7R0UIYCpS0NoLYkDf7VjYs2auLCqDGNkNRoMCYmLjTqzo1GEmJ0YUplQViYuGBBggts/YkWhjpAgDbtIGmhf7a0HdrOdDrv777rfVMxBEvSGdo5yVvMZDLnfOd+3/nuI8e7ukAIgWVZuJToQ/xcL/yBIGLV2zE1NQWFCHDOVUVVNzGmNd9JzbXkuNKQscSOxdnp8Ettz6OtrY0bhoFCoKoaTSQS4+xBP3BFUUJU09RrFc3XPjgx325U1u0gu56Ctm0PtC21ME9/hecONKOjowPFoKysjK0qQBLDNvUKbtuHkrP6J9bupytDb76MQLQGRFHgWAaIJwB4fNCNHIqFbugmW40c3H48OTL2+Wiw/sXQwXcRrm6AyGXg5BYBIaQ98qEUcBw8LNj/ya0DI3N2Z7rp1caK1rehQPbA/NS/50Lds7l7SFgP/CeAyoqkuXvH0+a3uWcPN1a1dkAspcBdi91qNwjUbTZFnisRPHIlOXw00/ja/mhbB5z0DBxzY8nzDtiWCVPn5EI8/tb5dKA19sZ7cDIpCNtcsXyDQTm3oOvZulO//flh5IX3pSUCjrFcEvK8ANO0aPzCxYPLNS1VZTWPgWfm5bcKSgUqK638JXHtUOSZV8DlqJUa9GIi0ZyN7Ix5t9ZCGNl7xqxEAq4nky1k6z4olK2ETInBclAatNgeGa+6/LhWAWLdxLJUxtjuidWDeGW2K2zNAoi/HIRp8Hq8RZP7fD6w9J3ZsH72O7lc/BAFZDtRPXBuXUV39yQs24Jp2gVQC7mOVVwZvA7mga280xhEKBgEL0CAqjL8nNZwZjCFH3PDgAy0tXeeHHOZNcpQj2ByJ+OzL75EKBQq2ELH+QjxSzk88vqnEMsLa15QVLpnzv0Nc/Zajjmy6kwmXZQAw5BVy7uBSy6WF9cmQDav4wnCnB5BhV8bp3dvPw8HUtDjOqCPDqC6qmKIlnzwpQAhXeDj/aiKVv1RWgGSmLjXuNu3EE7fnLZsO15iBwSUQDkWzp/Czs2hk5zbM6UTIBzQYARLY0kEb/bO+zT1RHph0WGlIieqF0Lum9SZb9D+5L6j0Wg0yR0BVhJypoKWb8b4D0ew1x79dX9Te2egPCwczjdYgMwYqnlByipx+6cTqJ/+vb9x964PpKSUoev5aWAbVXU+8YJhabuK6dNfo3rkbH9TfewwVbWr90Y+W88Oz29zGWruZqW+MuQmbiDb04VNo+e6a2qqP6ZMvezct2/YyniK4gNQLhZ3M0K+qhHmzVevz4xiqe8YtGTPwhNbgkeUbY8e54TOOrLplPvmjskXEi0UDBXFr2keCD0FKzWZz3ZrIglnoh/eub8m6kLq96amn9S0yA1CmSk7bvULSTabHe7sPLYUjkQc27YLINdweWCIqAPnYU8m9LBHGfMrfEheMnp1P+2jDp9TmGo57mukm4AP+J9/BBgA5GrTp4SswQQAAAAASUVORK5CYII="

/***/ })

});