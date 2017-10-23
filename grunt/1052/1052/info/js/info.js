
var InfoListPc = React.createClass({
    displayName: 'InfoList',

    getDefaultProps: function () {
        return {
            dir: ''
        };
    },
    render: function () {
        var creatContents = function (content) {
            var href = this.props.dir + 'view/info-de.html?newsId=' + content.ID;
            var time = content.Pubtime.split(' ');
            return React.createElement(
                'a',
                { className: 'list-group-item clearfix', href: href },
                React.createElement('span', { className: 'title', dangerouslySetInnerHTML: { __html: content.Title } }),
                React.createElement(
                    'span',
                    { className: 'time' },
                    time[0]
                )
            );
        };
        return React.createElement(
            'div',
            { className: 'list-group' },
            this.props.contents.map(creatContents, this)
        );
    }
});
function index(data) {
    if(isPoboApp){
        var gp = {gcount: data.ids.length, count: data.count};
        for(var i=0; i<gp.gcount; i++){
            gp["group"+(i+1)] = data.ids[i];
        }
        $.get(url.index.webservice, gp, function(result){
            var CONTENTS= JSON.parse(result).Indexes.slice(0, data.count);
            ReactDOM.render(React.createElement(InfoListPc, {contents: CONTENTS}), document.getElementById('info-list'));
        });
    }else{
        count = data.count;
        pbE.INFO().infoQueryListWithJson(JSON.stringify({type: 'mu', groupIDs: data.ids, doc: 'json', count: data.count}));
    }
}

function success(dat) {
    url = dat;
    var data = dat.index,
        con = $(".nav-tabs"),
        t = '',
        elem = $("#info-nav");
    data.data.forEach(function(d,i){
        t += '<li id="tab-'+i+'"><a href="javascript:void(0);">'+d.name+'</a></li>';
    });
    con.html(t);
    $(".nav-tabs>li:nth-of-type(1)").attr('class','activate');
    var width = document.documentElement.clientWidth;
    var num = $('.nav-tabs').children('li').length;
    $('.nav-tabs>li').css('width', width / 4);
    $('.nav-tabs').css('width', width / 4 * num);
    CONTENTS = [];
    current = 0;

    if(data.data.length > 1){
        elem.find(".nav-tabs>li").on('click',function () {
            var i = $(this), num = i.index();
            i.addClass("activate").siblings().removeClass();
            current = num;
            if(CONTENTS[num])
                ReactDOM.render(React.createElement(InfoList, { contents: CONTENTS[num], dir:dirStr  }), document.getElementById('info-list'));
            else
                index(data.data[num]);
        }).eq(0).addClass("active");
    }

    if(data.data.length > 0){
        CONTENTS = [];
        index(data.data[0]);
    }
    $(document).ready(function () {
        var navScroll = new IScroll('#info-nav', {
            eventPassthrough: true,
            scrollX: true,
            scrollY: false,
            preventDefault: false,
            snap: 'li',
            tap: true
        });
    });
}

var isPoboApp = typeof pbE == "undefined";
var url,CONTENTS,count;
var dirStr = 'pobo:uncheck=1&pageId=904002&url=';
function reload() {
    if (isPoboApp) {
        $.get("conf/info.json?" + Date.now(), success);
    } else {
        success(JSON.parse(pbE.SYS().readConfig('info/conf/info.json')))
    }
}

function callback(message) {
    var msg = JSON.parse(message);
    if(msg.moduleId == 90004){
        var CONTENTS = msg.jData.Indexes.slice(0,count);
        ReactDOM.render(React.createElement(InfoList, { contents: CONTENTS, dir: dirStr }), document.getElementById('info-list'));
    }
}
reload();