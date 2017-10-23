webpackJsonp([4],{

/***/ 531:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(564)
}
var Component = __webpack_require__(533)(
  /* script */
  __webpack_require__(566),
  /* template */
  __webpack_require__(567),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "E:\\ml\\ex\\PBManagement\\src\\components\\AuzQuery.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] AuzQuery.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-cb8d8578", Component.options)
  } else {
    hotAPI.reload("data-v-cb8d8578", Component.options)
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

/***/ 534:
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(535)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ 535:
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),

/***/ 564:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(565);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(534)("5d40b8c4", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-cb8d8578\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./AuzQuery.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-cb8d8578\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./AuzQuery.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 565:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(103)(undefined);
// imports


// module
exports.push([module.i, "\n.user-query .user-auz {\r\n  margin-top: 0;\r\n  margin-bottom: 20px;\n}\n.user-query .user-auz button {\r\n  margin-right: 15px;\n}\n.user-query .auz-tree {\r\n  width: 70%;\n}\n.user-query .auz-tree input {\r\n  margin-bottom: 20px;\n}\n.auz-tree .el-tree {\r\n  border-radius: 5px;\n}\r\n", ""]);

// exports


/***/ }),

/***/ 566:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = {
  props: ['userRootAuz'],
  data: function data() {
    var _ref;

    return _ref = {
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
        code: [{ required: true, message: '请输入节点编号', trigger: 'blur' }],
        description: [{ required: true, message: '请输入节点名称', trigger: 'blur' }]
      }
    }, _defineProperty(_ref, 'error', ''), _defineProperty(_ref, 'query', true), _defineProperty(_ref, 'check', false), _defineProperty(_ref, 'add', false), _defineProperty(_ref, 'edit', false), _ref;
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

  watch: {
    filterText: function filterText(val) {
      this.$refs.auzTree.filter(val);
    }
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
    getAuzsData: function getAuzsData(userData) {
      var _this = this;
      _this.auzError = '';
      _this.$axios.post(PBConf.routerURL, {
        func: '613',
        uid: _this.userInfo.userId,
        token: _this.userInfo.token,
        data: [{
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
    onCheck: function onCheck(userData) {
      this.userData = userData;
      this.getAuzsData(userData);
      this.query = false;
      this.add = false;
      this.edit = false;
      this.check = true;
    },
    filterNode: function filterNode(value, data) {
      if (!value) return true;
      return data.description.indexOf(value) !== -1;
    },
    onAdd: function onAdd(store, data, event) {
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
    onEdit: function onEdit(store, data, event) {
      event.stopPropagation();
      console.dir(data);
      this.auzData = data;
      this.query = false;
      this.check = false;
      this.add = false;
      this.edit = true;
    },
    renderContent: function renderContent(h, _ref2) {
      var _this2 = this;

      var node = _ref2.node,
          data = _ref2.data,
          store = _ref2.store;

      if (data.parentCode == 0) {
        return h(
          'span',
          { style: 'white-space: normal;' },
          [h(
            'span',
            null,
            [h(
              'span',
              null,
              [node.label]
            )]
          ), h(
            'span',
            { style: 'float: right; margin-right: 20px' },
            [h(
              'el-button',
              {
                attrs: { size: 'mini', type: 'info', disabled: true },
                on: {
                  'click': function click($event) {
                    return _this2.onEdit(store, data, $event);
                  }
                }
              },
              ['\u4FEE\u6539']
            ), h(
              'el-button',
              {
                attrs: { size: 'mini', type: 'info' },
                on: {
                  'click': function click($event) {
                    return _this2.onAdd(store, data, $event);
                  }
                }
              },
              ['\u589E\u52A0']
            )]
          )]
        );
      } else if (node.level > 2) {
        return h(
          'span',
          { style: 'white-space: normal;' },
          [h(
            'span',
            null,
            [h(
              'span',
              null,
              [node.label]
            )]
          ), h(
            'span',
            { style: 'float: right; margin-right: 20px' },
            [h(
              'el-button',
              {
                attrs: { size: 'mini', type: 'info' },
                on: {
                  'click': function click($event) {
                    return _this2.onEdit(store, data, $event);
                  }
                }
              },
              ['\u4FEE\u6539']
            ), h(
              'el-button',
              {
                attrs: { size: 'mini', type: 'info', disabled: true },
                on: {
                  'click': function click($event) {
                    return _this2.onAdd(store, data, $event);
                  }
                }
              },
              ['\u589E\u52A0']
            )]
          )]
        );
      } else {
        return h(
          'span',
          { style: 'white-space: normal;' },
          [h(
            'span',
            null,
            [h(
              'span',
              null,
              [node.label]
            )]
          ), h(
            'span',
            { style: 'float: right; margin-right: 20px' },
            [h(
              'el-button',
              {
                attrs: { size: 'mini', type: 'info' },
                on: {
                  'click': function click($event) {
                    return _this2.onEdit(store, data, $event);
                  }
                }
              },
              ['\u4FEE\u6539']
            ), h(
              'el-button',
              {
                attrs: { size: 'mini', type: 'info' },
                on: {
                  'click': function click($event) {
                    return _this2.onAdd(store, data, $event);
                  }
                }
              },
              ['\u589E\u52A0']
            )]
          )]
        );
      }
    },
    onGoback: function onGoback(flag) {
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
    onSubmit: function onSubmit() {
      var _this = this;
      _this.$refs.form.validate(function (valid) {
        if (valid) {
          _this.submitStatus = true;
          var params = {
            func: '615',
            uid: _this.userInfo.userId,
            token: _this.userInfo.token,
            data: [{
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
              var msg = '权限修改成功';
              if (_this.add) {
                msg = '权限增加成功';
              }
              _this.$alert(msg, '提示', {
                confirmButtonText: '确定',
                callback: function callback() {
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
};

/***/ }),

/***/ 567:
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
      value: (_vm.form.username),
      callback: function($$v) {
        _vm.form.username = $$v
      },
      expression: "form.username"
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
      "span": 8
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
      "label": "操作"
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
        }, [_vm._v("查看权限")])]
      }
    }])
  })], 1)], 1)], 1)], 1) : _vm._e(), _vm._v(" "), (_vm.check) ? _c('div', {
    staticClass: "auz-tree"
  }, [_c('p', {
    staticClass: "user-auz"
  }, [_c('el-button', {
    attrs: {
      "type": "primary",
      "icon": "arrow-left"
    },
    on: {
      "click": function($event) {
        _vm.onGoback(1)
      }
    }
  }, [_vm._v("返回")]), _vm._v("\n      " + _vm._s(_vm.userData.loginName) + "的权限\n    ")], 1), _vm._v(" "), (_vm.auzError) ? _c('div', {
    staticClass: "error"
  }, [_c('p', [_vm._v(_vm._s(_vm.auzError))])]) : _vm._e(), _vm._v(" "), _c('el-input', {
    attrs: {
      "placeholder": "输入关键字进行过滤"
    },
    model: {
      value: (_vm.filterText),
      callback: function($$v) {
        _vm.filterText = $$v
      },
      expression: "filterText"
    }
  }), _vm._v(" "), _c('el-tree', {
    ref: "auzTree",
    attrs: {
      "data": _vm.auzsData,
      "props": _vm.auzProps,
      "node-key": "code",
      "default-expand-all": "",
      "filter-node-method": _vm.filterNode
    }
  })], 1) : _vm._e(), _vm._v(" "), (_vm.add || _vm.edit) ? _c('div', {
    staticClass: "user-form"
  }, [_c('el-form', {
    ref: "form",
    attrs: {
      "model": _vm.auzData,
      "rules": _vm.rules,
      "label-position": "left",
      "label-width": "100px"
    }
  }, [_c('el-form-item', {
    attrs: {
      "label": "父节点编号"
    }
  }, [_c('span', [_vm._v(_vm._s(_vm.auzData.parentCode))])]), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "节点名称",
      "prop": "description"
    }
  }, [_c('el-input', {
    model: {
      value: (_vm.auzData.description),
      callback: function($$v) {
        _vm.auzData.description = $$v
      },
      expression: "auzData.description"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "节点序号"
    }
  }, [_c('el-input', {
    model: {
      value: (_vm.auzData.orderNum),
      callback: function($$v) {
        _vm.auzData.orderNum = $$v
      },
      expression: "auzData.orderNum"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "功能编号"
    }
  }, [_c('el-input', {
    model: {
      value: (_vm.auzData.funcCode),
      callback: function($$v) {
        _vm.auzData.funcCode = $$v
      },
      expression: "auzData.funcCode"
    }
  })], 1), _vm._v(" "), (_vm.add || _vm.auzData.children.length == 0) ? _c('el-form-item', {
    attrs: {
      "label": "节点url"
    }
  }, [_c('el-input', {
    model: {
      value: (_vm.auzData.url),
      callback: function($$v) {
        _vm.auzData.url = $$v
      },
      expression: "auzData.url"
    }
  })], 1) : _vm._e(), _vm._v(" "), (_vm.error) ? _c('el-form-item', {
    staticClass: "error"
  }, [_c('p', [_vm._v(_vm._s(_vm.error))])]) : _vm._e(), _vm._v(" "), _c('el-form-item', [_c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": function($event) {
        _vm.onGoback(2)
      }
    }
  }, [_vm._v("返回")]), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "primary",
      "loading": _vm.submitStatus
    },
    on: {
      "click": _vm.onSubmit
    }
  }, [_vm._v("提交")])], 1)], 1)], 1) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-cb8d8578", module.exports)
  }
}

/***/ })

});