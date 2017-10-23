/**
 * Created by pobo on 2016/9/20.
 */
// 框架结构
    var Frame = React.createClass({
    render:function () {
        return(
            <div className="clearfix">
                <SlideShow />
                <DivInt />
                <Nav />
                <DivInt />
                <GongGao />
                <Huodong />
                <HaiTongZhuan />
            </div>
        )
    }
})
// 图片轮播
var SlideShow = React.createClass({
    render:function () {
        return(
            <div id="carousel-example-generic" className="carousel slide"  data-ride="carousel" data-interval="3000">
                <SlideCon />
                <SlideImg />
            </div>
        )
    }
});
// 轮播控制
var SlideCon = React.createClass({
    render:function () {
        return(
            <ol className="carousel-indicators">
            <li data-target="#carousel-example-generic" data-slide-to="0" className="active"></li>
            <li data-target="#carousel-example-generic" data-slide-to="1"></li>
            <li data-target="#carousel-example-generic" data-slide-to="2"></li>
            <li data-target="#carousel-example-generic" data-slide-to="3"></li>
            </ol>
        )
    }
});
// 轮播图片
var SlideImg = React.createClass({
    render:function () {
        return(
            <div className="carousel-inner" role="listbox">
            <div className="item active">
            <img src="images/top.png" height="109" alt=""/>
            </div>
            <div className="item">
            <img src="images/top.png" height="109" alt=""/>
            </div>
            <div className="item">
            <img src="images/top.png" height="109" alt=""/>
            </div>
            </div>
        )
    }
});
// 空div-间隔
var DivInt = React.createClass({
    render:function () {
        return(
            <div className="nav-blank row" style={{borderBottom:'none'}}>
            </div>
        )
    }
});
// 导航
var Nav = React.createClass({
    render:function () {
        return(
            <div id="customized">
            <div className="area">
            <div className="btn-wrap">
            <div className="btn-group clearfix">
            <div>
            <a className="btn btn-default" style={{backgroundImage: 'url(images/nav-zx.png)', backgroundSize: '42px 42px'}} href="">
            <p>在线开户</p>
            </a>
            </div>
            <div>
            <a className="btn btn-default" style={{backgroundImage:'url(images/nav-jy.png)', backgroundSize:'42px 42px'}} href="index-calender.html">
            <p>交易日历</p></a></div><div>
            <a className="btn btn-default" style={{backgroundImage: "url(images/nav-yw.png)",backgroundSize:"42px 42px"}} href="index-firm.html">
            <p>业务指南</p>
            </a>
            </div>
            <div>
            <a className="btn btn-default" style={{backgroundImage:'url(images/nav-lh.png)',backgroundSize:'42px 42px'}} href="index-list.html">
            <p>龙虎榜</p>
            </a>
            </div>
            <div>
            <a className="btn btn-default" style={{backgroundImage:" url(images/nav-cf.png)", backgroundSize: "42px 42px"}} href="">
            <p>财富管家</p>
            </a>
            </div><div>
            <a className="btn btn-default" style={{backgroundImage: "url(images/nav-sp.png)", backgroundSize:"42px 42px"}} href="index-race.html">
            <p>实盘大赛</p>
            </a>
            </div>
            <div>
            <a className="btn btn-default" style={{backgroundImage: "url(images/nav-px.png)",backgroundSize:"42px 42px"}} href="index-school.html">
            <p>培训课堂</p>
            </a>
            </div>
            <div>
            <a className="btn btn-default" style={{backgroundImage: "url(images/nav-zj.png)", backgroundSize:"42px 42px"}} href="index-haitong.html">
            <p>走进海通</p>
            </a>
            </div>
            </div>
            </div>
            </div>
            </div>
        )
    }
});
// 公告
var GongGao = React.createClass({
    render:function () {
        return(
            <div className="row area">
            <p className="area-title geng" style={{lineHeight:" 44px",background:"url('images/title-1.png')",backgroundPosition:"0px",backgroundRepeat:"no-repeat",color:"#f2415a"}}>公告
            <span className="area-co">探索研究碳排放权期货交易</span>
            <a href="" style={{color:"#f2415a"}}>
            <span className="geng-s">更多</span>
            <img src="images/title-bor2.png"/>
            </a>
            </p>
            </div>
        )
    }
});
// 活动
// 内容
var Indexhd = React.createClass({
    render:function () {
        return (
            <li className="clearfloat">
            <img src="images/hu-1.png"/>
            <p>A股期权首秀看涨后市 认沽期权暴跌20%</p>
        <span>昨日，沪深两市呈现深强沪弱格局，期指对应地呈现</span>
        </li>
        )
    }
});
var Huodong = React.createClass({
    render:function () {
        return(
            <div className="row area">
            <p className="area-title geng" style={{lineHeight:"44px",backgroundImage:"url('images/title-2.png')",backgroundPosition:"0px",backgroundRepeat:"no-repeat",color:"#f78413"}}>活动
            <a href="" style={{color:"#f78413"}}>
            <span className="geng-s">更多</span>
            <img src="images/title-bor1.png"/>
            </a>
            </p>
            <div id="info-list">
            <ul className="clearfloat info-ul" id="hd">
                <Indexhd />
            </ul>
        </div>
        </div>
        )
    }
});
// 海通专栏
// 内容
var IndexHtzl = React.createClass({
    render:function () {
        return(
            <li>
            <p>期权专栏</p>
            <span>期权就是一个“有期限的权利”,首先这是一个权利(比如以固定价格买入...</span>
            </li>
        )
    }
});
// 整体
var HaiTongZhuan = React.createClass({
    render:function () {
        return(
            <div className="row area">
            <p className="area-title geng" style={{lineHeight: "44px",backgroundImage:"url('images/title-3.png')",backgroundRepeat:"no-repeat",backgroundPosition:"0px",color:"#384692"}}>海通专栏
            <a href="" style={{color:"#384692"}}>
            <span className="geng-s">更多</span>
            <img src="images/title-bor3.png"/>
            </a>
            </p>
            <div id="info-fist">
            <ul className="info-ul" id="htzl">
            <IndexHtzl />
            </ul>
            </div>
            </div>
        )
    }
})








ReactDOM.render(
    <Frame/>,document.getElementById('frame')
)

















