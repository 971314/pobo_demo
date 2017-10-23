var HISTORY = 9;
var SELF = 100;
var HOT = 100;

var market = {group:{},pageCount:1,current:0, next:0, last:0};

//最新价保留到价格精度
function decimalDecPrice(decimal, price) {
    price = price + '';
    var decIndex = price.indexOf('.');
    var length = price.length;
    if (decIndex >= 0 && length - 1 - decIndex >= decimal) {
        return price.substr(0, price.indexOf('.') + decimal + 1);
    }
    return (price - 0).toFixed(decimal);
}

var CustButton = React.createClass({
    displayName: 'CustButton',
    render: function () {
        var item = this.props.button;
        var cols = Math.ceil((item.length + 1) / 8);
        var btnWraps = [];
        var creatContents = function (content) {
            var style = {backgroundImage: 'url(images/' + content['image1'] + ')'};
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'a',
                    {className: 'btn btn-default', style: style, href: content['url'], id: content['id']},
                    content['title']
                )
            );
        };
        var createBtns = function (contents) {
            if (contents.length < 8)
                contents.push({
                    image1: "gengduo.png",
                    url: "pobo:uncheck=1&pageId=900005&url=main/view/index-add.html",
                    id: "",
                    title: "添加"
                });
            return contents.map(creatContents);
        }
        for (var i = 0; i < cols; i++)
            btnWraps.push(React.createElement(
                'div',
                {className: 'btn-wrap clearfix'},
                createBtns(item.slice(i * 8, i * 8 + 8))
            ));
        return React.createElement(
            'div',
            {className: 'area clearfix'},
            btnWraps
        );
    }
});

var InfoList = React.createClass({
    displayName: 'InfoList',

    getDefaultProps: function () {
        return {
            dir: ''
        };
    },
    render: function () {
        var creatContents = function (content) {
            var href = this.props.dir + 'info/view/info-de.html?newsId=' + content.ID;
            var time = content.Pubtime.split(' ');
            return React.createElement(
                'a',
                {className: 'list-group-item clearfix', href: href},
                React.createElement('span', {className: 'title', dangerouslySetInnerHTML: {__html: content.Title}}),
                React.createElement(
                    'span',
                    {className: 'time'},
                    time[0]
                )
            );
        };
        return React.createElement(
            'div',
            {className: 'list-group'},
            this.props.contents.map(creatContents, this)
        );
    }
});






function processCustom() {
    var cfg = mainConfig.customs, data = cfg;
    if (isPoboApp) {
        if (pbSYS.isHasLocalFile('main', 1)) {
            data = pbSYS.readLocalFile('main', 1);
//大版本号变动的情况：contents字段长度变化；长度不变，但是模块发生较大变化即id变化；直接覆盖本地文件
//小版本号变动的情况：contents字段长度不变，所有模块id不变
            if (data) {
                data = JSON.parse(data); //本地配置文件保存的
                if (data.isReplace == null || data.isReplace) {
                    prevCustom = null;
                    pbSYS.writeLocalFile('main', 1, JSON.stringify(data = cfg));
                } else if (data.version != cfg.version) {
                    //大版本号不变，小版本号发生变化，替换某些模块
                    data.version = cfg.version;
                    var temp ={},temp2={};
                    for (var i = 0; i < data.contents.length; i++) {
                        temp[data.contents[i].id] = data.contents[i];
                    }
                    for (var i = 0; i < cfg.contents.length; i++) {
                        temp2[cfg.contents[i].id] = cfg.contents[i];
                        if(!temp[cfg.contents[i].id])
                        {
                            cfg.contents[i].checked = "0";
                            data.contents.push(cfg.contents[i]);//没有的增加
                        }
                    }
                    for (var j = 0; j < data.contents.length; j++) {
                        var d = data.contents[j], d2 =temp2[d.id] ;
                        if(d2)
                        {
                                //d.checked = "0";
                                d.title = d2.title;
                                d.image1 = d2.image1;
                                d.image2 = d2.image2;
                                d.url = d2.url;
                        }
                        else//新的没有的删除老的
                        {
                            data.contents.splice(j,1);
                        }
                    }
                    pbSYS.writeLocalFile('main', 1, JSON.stringify(data));
                }
            } else {
                pbSYS.writeLocalFile('main', 1, JSON.stringify(data = cfg));
            }
        } else {
            pbSYS.writeLocalFile('main', 1, JSON.stringify(data = cfg));
        }
    }

    var custom = [];
    for (var i = 0; i < data.contents.length; i++) {
        if (data.contents[i].checked == '1') {
            custom.push(data.contents[i]);
        }
    }

    var length = custom.length,
        num = Math.ceil((length + 1) / 8),
        reactEle;

    if (prevCustom && prevCustom.length == length) {
        for (var i = 0; i < length; i++) {
            if (prevCustom[i].id != custom[i].id)
                break;
        }
        if (i == length)
            return;
    }
    prevCustom = custom;

    ReactDOM.render(React.createElement(CustButton, {button: custom}), document.getElementById('customized'));

    //图标滑动
    var inds = $("#indicator"), s = "";
    if (num > 1)
        for (var i = 0; i < num; i++)
            s += '<li' + (!i ? ' class="ind"' : '') + '></li> ';
    inds.html(s);

    var width = document.documentElement.clientWidth;
    $('#customized .area>div').css({width: width});
    if (num < 2) {
        $('#customized .area').attr('style', "");
    } else {
        $('#customized .area').css('width', width * num);
    }

    if (navScroll)
        navScroll.destroy();
    if (num > 1) {
        inds = inds.find("li");
        navScroll = new IScroll('#customized', {
            eventPassthrough: true,
            scrollX: true,
            scrollY: false,
            preventDefault: false,
            snap: '.btn-wrap',
            tap: true,
            mouseWheelSpeed: 10
        });
        navScroll.on('scrollEnd', function () {
            inds.removeClass().eq(Math.floor(-this.x / width)).addClass("ind");
        });
    }
}

function queryNews(data) {
    if (isPoboApp)
        pbINFO.infoQueryListWithJson(JSON.stringify({type: 'mu', groupIDs: data.ids, doc: 'json', count: data.count}));
    else {
        var gp = {gcount: data.ids.length, count: data.count};
        for (var i = 0; i < gp.gcount; i++) {
            gp["group" + (i + 1)] = data.ids[i];
        }
        $.get(mainConfig.news.webservice, gp, function (result) {
            newsData[newsCurrent] = JSON.parse(result).Indexes.slice(0, data.count);
            ReactDOM.render(React.createElement(InfoList, {contents: newsData[newsCurrent]}), document.getElementById('info-list'));
        });
    }
}


function processFirst(config,prevConfig)
{
    //banners
    var cfg = config.banners, container = $("#carousel-example-generic");
    if (!prevConfig || prevConfig.banners.version != cfg.version) {
        if (cfg.isShow ) {
            container.show();
            var s = "", s2 = "";
            cfg.data.forEach(function (d, i) {
                s += "<a class='item" + (!i ? " active" : "") + "'" + (d.url ? " href='" + d.url + "'" : "") + ">"
                    + "<img src='" + d.img + "'/></a>";
                s2 += "<li data-target='#carousel-example-generic' data-slide-to='" + i + "'"
                    + (!i ? " class='active'" : "") + "></li> ";
            });
            if (window.bannersInit) {
                container.carousel({
                    interval: 2000
                });
                setTimeout(function () {
                    container.find(".carousel-inner").html(s);
                    container.find(".carousel-indicators").html(s2);
                    container.carousel('cycle');
                }, 1000);
            } else {

                container.find(".carousel-inner").html(s);
                container.find(".carousel-indicators").html(s2);
                bannersInit = true;
            }
        } else
            container.hide();
    }
}

function processConfig(config,isFirst) {
    if (mainConfig)
        prevConfig = mainConfig;
    mainConfig = config;

    if (prevConfig && prevConfig.version != config.version) {
        //页面，css，js有改动
        location.reload();
        return;
    }

    if(isFirst)
        processFirst(config,prevConfig);


    //custom
    if (config.customs.isShow) {
        $("#customContainer").show();
        processCustom();
    } else
        $("#customContainer").hide();

    //news
    cfg = config.news, container = $("#info");
    if (!prevConfig || prevConfig.news.version != cfg.version) {
        if (cfg.isShow) {
            container.show();
            var s = "";
            cfg.data.forEach(function (d) {
                s += "<i>" + d.name + "</i>";
            });
            container.find(".area-title span").html(s);
            newsCurrent = 0;
            if (cfg.data.length > 1) {
                container.find(".area-title i").on("click", function () {
                    var t = $(this), index = t.index();
                    t.addClass("active").siblings().removeClass();
                    newsCurrent = index;
                    if (newsData[index])
                        ReactDOM.render(React.createElement(InfoList, {
                            contents: newsData[index],
                            dir: 'pobo:uncheck=0&info/'
                        }), document.getElementById('info-list'));
                    else
                        queryNews(cfg.data[index]);
                }).eq(0).addClass("active");
            }
        } else
            container.hide();
    }
    if (cfg.isShow && cfg.data.length > 0) {
        newsData = [];
        queryNews(cfg.data[newsCurrent]);
    }
}


var isPoboApp = typeof pbE != "undefined";
var contract, contractInterval, prevCustom, navScroll, newsData, newsCurrent, mainConfig, prevConfig, marketScroll;
var dirStr = 'pobo:uncheck=0&pageId=904002&url=';
if (isPoboApp) {
    var pbHQ = pbE.HQ(), pbSYS = pbE.SYS(), pbINFO = pbE.INFO(),
        pbZX = pbE.ZX();
}

/*function reload() {
    doReload(false);
}*/

function doReload(isFirst)
{
    if (isPoboApp) {
        processConfig(JSON.parse(pbSYS.readConfig("main/conf/main.json")),isFirst);
    } else {
        $.get("conf/main.json?" + Date.now(), function(data){processConfig(data,isFirst)} );
    }
}

doReload(true);

$(function () {
    var option = {
        callbacks: [
            {module: 90004, callback: function(msg){
                newsData[newsCurrent] = msg.jData.Indexes.slice(0, mainConfig.news.data[newsCurrent].count);
                ReactDOM.render(React.createElement(InfoList, {
                    contents: newsData[newsCurrent],
                    dir: dirStr
                }), document.getElementById('info-list'));
            }}],

        reload: function () {
            doReload(false);
        },
        refresh: function () {

        },
        fresh: function () {

        },
        doShow: function (flag) {

        }
    };
    pbPage.initPage(option);
});


