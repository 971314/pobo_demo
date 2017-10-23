function _classCallCheck(e, t) {
    if (!(e instanceof t))throw new TypeError("Cannot call a class as a function")
}
function _possibleConstructorReturn(e, t) {
    if (!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}
function _inherits(e, t) {
    if ("function" != typeof t && null !== t)throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var _createClass = function () {
    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var l = t[a];
            l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(e, l.key, l)
        }
    }

    return function (t, a, l) {
        return a && e(t.prototype, a), l && e(t, l), t
    }
}(), selfModule = function (e) {
    function t(e) {
        _classCallCheck(this, t);
        var a = _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
        return a.state = {arr: []}, a
    }

    return _inherits(t, e), _createClass(t, [{
        key: "componentWillMount", value: function () {
            try {
                var e = JSON.parse(localStorage.getItem("selfModules"))
            } catch (e) {
                localStorage.setItem("selfModules", "")
            }
            e || (e = []);
            var t = this;
            t.setState({arr: e})
        }
    }, {
        key: "onAddItem", value: function (e) {
            var t = {};
            if (t.name = $("#inputName").val().trim(), t.addr = $("#inputAddr").val().trim(), "" == t.name || "" == t.addr)return void alert("输入有误");
            var a = this.state.arr;
            a.push(t), this.setState({arr: a}), localStorage.setItem("selfModules", JSON.stringify(a)), console.log(this.state.arr)
        }
    }, {
        key: "onButtonClick", value: function (e) {
            $("#inputName").val(""), $("#inputAddr").val(""), $("#myModal").modal(myModal)
        }
    }, {
        key: "onDelete", value: function (e, t) {
            this.setState({
                arr: this.state.arr.filter(function (t, a) {
                    return e !== a
                })
            }), console.log(this.state.arr)
        }
    }, {
        key: "render", value: function () {
            var e = this, t = this.state.arr;
            return localStorage.setItem("selfModules", JSON.stringify(t)), React.createElement("div", null, React.createElement("div", {
                className: "form-group",
                style: {marginTop: "50px"}
            }, React.createElement("div", {
                className: "",
                style: {paddingTop: "10px"}
            }, React.createElement("button", {
                className: "btn btn-info ",
                onClick: this.onButtonClick.bind(this)
            }, "增加"))), React.createElement("div", {
                className: "form-group item-list",
                style: {marginTop: "30px"}
            }, React.createElement("table", {
                className: "table table-hover",
                style: {tableLayout: "fixed"}
            }, React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", {className: "iname"}, "名称"), React.createElement("th", {className: "iaddr"}, "地址"), React.createElement("th", {className: "iclose"}, "操作"))), React.createElement("tbody", null, t.map(function (t, a) {
                return React.createElement("tr", null, React.createElement("td", null, t.name), React.createElement("td", null, React.createElement("a", {
                    href: t.addr,
                    style: {overflow: "hidden"}
                }, t.addr)), React.createElement("td", null, React.createElement("button", {
                    type: "button",
                    class: "btn btn-default btn-sm",
                    onClick: e.onDelete.bind(e, a)
                }, React.createElement("span", {class: "glyphicon glyphicon-remove"}), "删除")))
            })))), React.createElement("div", {
                className: "modal fade",
                style: {marginTop: "50px"},
                id: "myModal"
            }, React.createElement("div", {className: "modal-dialog"}, React.createElement("div", {className: "modal-content"}, React.createElement("div", {className: "modal-header"}, React.createElement("button", {
                type: "button",
                className: "close",
                "data-dismiss": "modal",
                "aria-hidden": "true"
            }, "×"), React.createElement("h4", {
                className: "modal-title",
                id: "myModalLabel"
            }, "添加地址")), React.createElement("div", {className: "modal-body"}, React.createElement("div", {className: "form-group"}, React.createElement("label", {
                for: "inputEmail3",
                className: "col-sm-4 control-label"
            }, "名称:"), React.createElement("div", {className: "col-sm-8"}, React.createElement("input", {
                type: "text",
                className: "form-control",
                id: "inputName",
                name: "name",
                placeholder: "名称"
            }))), React.createElement("div", {className: "form-group"}, React.createElement("label", {
                for: "inputPassword3",
                className: "col-sm-4 control-label"
            }, "地址："), React.createElement("div", {className: "col-sm-8"}, React.createElement("input", {
                type: "text",
                className: "form-control",
                id: "inputAddr",
                name: "age",
                placeholder: "地址"
            }))), React.createElement("div", {className: "form-group"}, React.createElement("div", {className: "col-sm-offset-5 col-sm-3 text-right"}, React.createElement("input", {
                type: "button",
                id: "addbt",
                className: "btn btn-info ",
                "data-dismiss": "modal",
                onClick: this.onAddItem.bind(this),
                value: "添加"
            }))))))))
        }
    }]), t
}(React.Component);