/**
 * Created by pobo on 2016/9/20.
 */
// 框架结构
var Frame = React.createClass({
    displayName: "Frame",

    render: function () {
        return React.createElement(
            "div",
            { className: "clearfix" },
            React.createElement(SlideShow, null),
            React.createElement(DivInt, null),
            React.createElement(Nav, null),
            React.createElement(DivInt, null),
            React.createElement(GongGao, null),
            React.createElement(Huodong, null),
            React.createElement(HaiTongZhuan, null)
        );
    }
});
// 图片轮播
var SlideShow = React.createClass({
    displayName: "SlideShow",

    render: function () {
        return React.createElement(
            "div",
            { id: "carousel-example-generic", className: "carousel slide", "data-ride": "carousel", "data-interval": "3000" },
            React.createElement(SlideCon, null),
            React.createElement(SlideImg, null)
        );
    }
});
// 轮播控制
var SlideCon = React.createClass({
    displayName: "SlideCon",

    render: function () {
        return React.createElement(
            "ol",
            { className: "carousel-indicators" },
            React.createElement("li", { "data-target": "#carousel-example-generic", "data-slide-to": "0", className: "active" }),
            React.createElement("li", { "data-target": "#carousel-example-generic", "data-slide-to": "1" }),
            React.createElement("li", { "data-target": "#carousel-example-generic", "data-slide-to": "2" }),
            React.createElement("li", { "data-target": "#carousel-example-generic", "data-slide-to": "3" })
        );
    }
});
// 轮播图片
var SlideImg = React.createClass({
    displayName: "SlideImg",

    render: function () {
        return React.createElement(
            "div",
            { className: "carousel-inner", role: "listbox" },
            React.createElement(
                "div",
                { className: "item active" },
                React.createElement("img", { src: "images/top.png", height: "109", alt: "" })
            ),
            React.createElement(
                "div",
                { className: "item" },
                React.createElement("img", { src: "images/top.png", height: "109", alt: "" })
            ),
            React.createElement(
                "div",
                { className: "item" },
                React.createElement("img", { src: "images/top.png", height: "109", alt: "" })
            )
        );
    }
});
// 空div-间隔
var DivInt = React.createClass({
    displayName: "DivInt",

    render: function () {
        return React.createElement("div", { className: "nav-blank row", style: { borderBottom: 'none' } });
    }
});
// 导航
var Nav = React.createClass({
    displayName: "Nav",

    render: function () {
        return React.createElement(
            "div",
            { id: "customized" },
            React.createElement(
                "div",
                { className: "area" },
                React.createElement(
                    "div",
                    { className: "btn-wrap" },
                    React.createElement(
                        "div",
                        { className: "btn-group clearfix" },
                        React.createElement(
                            "div",
                            null,
                            React.createElement(
                                "a",
                                { className: "btn btn-default", style: { backgroundImage: 'url(images/nav-zx.png)', backgroundSize: '42px 42px' }, href: "" },
                                React.createElement(
                                    "p",
                                    null,
                                    "在线开户"
                                )
                            )
                        ),
                        React.createElement(
                            "div",
                            null,
                            React.createElement(
                                "a",
                                { className: "btn btn-default", style: { backgroundImage: 'url(images/nav-jy.png)', backgroundSize: '42px 42px' }, href: "index-calender.html" },
                                React.createElement(
                                    "p",
                                    null,
                                    "交易日历"
                                )
                            )
                        ),
                        React.createElement(
                            "div",
                            null,
                            React.createElement(
                                "a",
                                { className: "btn btn-default", style: { backgroundImage: "url(images/nav-yw.png)", backgroundSize: "42px 42px" }, href: "index-firm.html" },
                                React.createElement(
                                    "p",
                                    null,
                                    "业务指南"
                                )
                            )
                        ),
                        React.createElement(
                            "div",
                            null,
                            React.createElement(
                                "a",
                                { className: "btn btn-default", style: { backgroundImage: 'url(images/nav-lh.png)', backgroundSize: '42px 42px' }, href: "index-list.html" },
                                React.createElement(
                                    "p",
                                    null,
                                    "龙虎榜"
                                )
                            )
                        ),
                        React.createElement(
                            "div",
                            null,
                            React.createElement(
                                "a",
                                { className: "btn btn-default", style: { backgroundImage: " url(images/nav-cf.png)", backgroundSize: "42px 42px" }, href: "" },
                                React.createElement(
                                    "p",
                                    null,
                                    "财富管家"
                                )
                            )
                        ),
                        React.createElement(
                            "div",
                            null,
                            React.createElement(
                                "a",
                                { className: "btn btn-default", style: { backgroundImage: "url(images/nav-sp.png)", backgroundSize: "42px 42px" }, href: "index-race.html" },
                                React.createElement(
                                    "p",
                                    null,
                                    "实盘大赛"
                                )
                            )
                        ),
                        React.createElement(
                            "div",
                            null,
                            React.createElement(
                                "a",
                                { className: "btn btn-default", style: { backgroundImage: "url(images/nav-px.png)", backgroundSize: "42px 42px" }, href: "index-school.html" },
                                React.createElement(
                                    "p",
                                    null,
                                    "培训课堂"
                                )
                            )
                        ),
                        React.createElement(
                            "div",
                            null,
                            React.createElement(
                                "a",
                                { className: "btn btn-default", style: { backgroundImage: "url(images/nav-zj.png)", backgroundSize: "42px 42px" }, href: "index-haitong.html" },
                                React.createElement(
                                    "p",
                                    null,
                                    "走进海通"
                                )
                            )
                        )
                    )
                )
            )
        );
    }
});
// 公告
var GongGao = React.createClass({
    displayName: "GongGao",

    render: function () {
        return React.createElement(
            "div",
            { className: "row area" },
            React.createElement(
                "p",
                { className: "area-title geng", style: { lineHeight: " 44px", background: "url('images/title-1.png')", backgroundPosition: "0px", backgroundRepeat: "no-repeat", color: "#f2415a" } },
                "公告",
                React.createElement(
                    "span",
                    { className: "area-co" },
                    "探索研究碳排放权期货交易"
                ),
                React.createElement(
                    "a",
                    { href: "", style: { color: "#f2415a" } },
                    React.createElement(
                        "span",
                        { className: "geng-s" },
                        "更多"
                    ),
                    React.createElement("img", { src: "images/title-bor2.png" })
                )
            )
        );
    }
});
// 活动
// 内容
var Indexhd = React.createClass({
    displayName: "Indexhd",

    render: function () {
        return React.createElement(
            "li",
            { className: "clearfloat" },
            React.createElement("img", { src: "images/hu-1.png" }),
            React.createElement(
                "p",
                null,
                "A股期权首秀看涨后市 认沽期权暴跌20%"
            ),
            React.createElement(
                "span",
                null,
                "昨日，沪深两市呈现深强沪弱格局，期指对应地呈现"
            )
        );
    }
});
var Huodong = React.createClass({
    displayName: "Huodong",

    render: function () {
        return React.createElement(
            "div",
            { className: "row area" },
            React.createElement(
                "p",
                { className: "area-title geng", style: { lineHeight: "44px", backgroundImage: "url('images/title-2.png')", backgroundPosition: "0px", backgroundRepeat: "no-repeat", color: "#f78413" } },
                "活动",
                React.createElement(
                    "a",
                    { href: "", style: { color: "#f78413" } },
                    React.createElement(
                        "span",
                        { className: "geng-s" },
                        "更多"
                    ),
                    React.createElement("img", { src: "images/title-bor1.png" })
                )
            ),
            React.createElement(
                "div",
                { id: "info-list" },
                React.createElement(
                    "ul",
                    { className: "clearfloat info-ul", id: "hd" },
                    React.createElement(Indexhd, null)
                )
            )
        );
    }
});
// 海通专栏
// 内容
var IndexHtzl = React.createClass({
    displayName: "IndexHtzl",

    render: function () {
        return React.createElement(
            "li",
            null,
            React.createElement(
                "p",
                null,
                "期权专栏"
            ),
            React.createElement(
                "span",
                null,
                "期权就是一个“有期限的权利”,首先这是一个权利(比如以固定价格买入..."
            )
        );
    }
});
// 整体
var HaiTongZhuan = React.createClass({
    displayName: "HaiTongZhuan",

    render: function () {
        return React.createElement(
            "div",
            { className: "row area" },
            React.createElement(
                "p",
                { className: "area-title geng", style: { lineHeight: "44px", backgroundImage: "url('images/title-3.png')", backgroundRepeat: "no-repeat", backgroundPosition: "0px", color: "#384692" } },
                "海通专栏",
                React.createElement(
                    "a",
                    { href: "", style: { color: "#384692" } },
                    React.createElement(
                        "span",
                        { className: "geng-s" },
                        "更多"
                    ),
                    React.createElement("img", { src: "images/title-bor3.png" })
                )
            ),
            React.createElement(
                "div",
                { id: "info-fist" },
                React.createElement(
                    "ul",
                    { className: "info-ul", id: "htzl" },
                    React.createElement(IndexHtzl, null)
                )
            )
        );
    }
});

ReactDOM.render(React.createElement(Frame, null), document.getElementById('frame'));