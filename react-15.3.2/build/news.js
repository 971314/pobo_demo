function GetQueryString(name) {
  var urls = decodeURI(window.location.search.substr(1));
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  var r = urls.match(reg);
  if (r) return unescape(r[2]);return null;
}

var InfoList = React.createClass({
  displayName: 'InfoList',

  render: function () {
    var creatContents = function (content) {
      var href = 'news-detail.html?newsId=' + content.ID;
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

var groupID = GetQueryString('groupID');

function info_an() {
  if (typeof pbEngine != "undefined") {

    var data = { type: 'mu', groupIDs: [groupID], doc: 'json', count: '10' };

    function callback(message) {
      var msg = JSON.parse(message);
      if (msg.moduleId == 90004) {
        var CONTENTS = msg.jData.Indexes.slice(0, 10);
        ReactDOM.render(React.createElement(InfoList, { contents: CONTENTS }), document.getElementById('info-list'));
      }
    }

    pbEngine.queryInfoListWithJson(JSON.stringify(data));

    function reload() {
      pbEngine.queryInfoListWithJson(JSON.stringify(data));
    }
  } else {
    $.post(data, function (data) {
      var CONTENTS = JSON.parse(data).Indexes;
      ReactDOM.render(React.createElement(InfoList, { contents: CONTENTS }), document.getElementById('info-list'));
    });
    function reload() {
      $.post(url(groupID)[1], function (data) {
        var CONTENTS = JSON.parse(data).Indexes;
        ReactDOM.render(React.createElement(InfoList, { contents: CONTENTS }), document.getElementById('info-list'));
      });
    }
  }
}

// --------------------------------index--------------------

function info_index() {
  var tit = title();
  // console.log(tit);
  for (var i = 0; i < tit.length; i++) {
    $(".nav-tabs").append('<li id="tab-' + i + '"><a href="javascript:void(0);">' + tit[i].title + '</a></li>');
    $(".nav-tabs>li:nth-of-type(1)").attr('class', 'activate');
  }
  var width = document.documentElement.clientWidth;
  var num = $('.nav-tabs').children('li').length;
  $('.nav-tabs>li').css('width', width / 4);
  $('.nav-tabs').css('width', width / 4 * num);
  if (typeof pbEngine != "undefined") {
    var flag = 0;
    var data0 = null,
        data1 = null,
        data2 = null,
        data3 = null,
        data4 = null,
        data5 = null,
        data6 = null,
        data7 = null,
        data8 = null;
    var data = { type: 'mu', groupIDs: ['10101'], doc: 'json', count: '30' };
    var infoListDom = document.getElementById('info-list');
    var dirStr = 'pobo:info/';
    function changeTab(n) {
      if (n == flag) {
        return;
      }
      switch (n) {
        case 0:
          $('.activate').removeClass('activate');
          $('#tab-0').addClass('activate');
          data.groupIDs = ['10101'];
          if (!data0) {
            pbEngine.queryInfoListWithJson(JSON.stringify(data));
          } else {
            ReactDOM.render(React.createElement(InfoList, { contents: data0, dir: dirStr }), infoListDom);
          }
          flag = 0;
          break;
        case 1:
          $('.activate').removeClass('activate');
          $('#tab-1').addClass('activate');
          data.groupIDs = ['10301'];
          if (!data1) {
            pbEngine.queryInfoListWithJson(JSON.stringify(data));
          } else {
            ReactDOM.render(React.createElement(InfoList, { contents: data1, dir: dirStr }), infoListDom);
          }
          flag = 1;
          break;
        case 2:
          $('.activate').removeClass('activate');
          $('#tab-2').addClass('activate');
          data.groupIDs = ['40102', '40202'];
          if (!data2) {
            pbEngine.queryInfoListWithJson(JSON.stringify(data));
          } else {
            ReactDOM.render(React.createElement(InfoList, { contents: data2, dir: dirStr }), infoListDom);
          }
          flag = 2;
          break;
        case 3:
          $('.activate').removeClass('activate');
          $('#tab-3').addClass('activate');
          data.groupIDs = ['40101', '40201'];
          if (!data3) {
            pbEngine.queryInfoListWithJson(JSON.stringify(data));
          } else {
            ReactDOM.render(React.createElement(InfoList, { contents: data3, dir: dirStr }), infoListDom);
          }
          flag = 3;
          break;
        case 4:
          $('.activate').removeClass('activate');
          $('#tab-4').addClass('activate');
          data.groupIDs = ['40104', '40204'];
          if (!data4) {
            pbEngine.queryInfoListWithJson(JSON.stringify(data));
          } else {
            ReactDOM.render(React.createElement(InfoList, { contents: data4, dir: dirStr }), infoListDom);
          }
          flag = 4;
          break;
        case 5:
          $('.activate').removeClass('activate');
          $('#tab-5').addClass('activate');
          data.groupIDs = ['40105', '40205'];
          if (!data5) {
            pbEngine.queryInfoListWithJson(JSON.stringify(data));
          } else {
            ReactDOM.render(React.createElement(InfoList, { contents: data5, dir: dirStr }), infoListDom);
          }
          flag = 5;
          break;
        case 6:
          $('.activate').removeClass('activate');
          $('#tab-6').addClass('activate');
          data.groupIDs = ['40103', '40203'];
          if (!data6) {
            pbEngine.queryInfoListWithJson(JSON.stringify(data));
          } else {
            ReactDOM.render(React.createElement(InfoList, { contents: data6, dir: dirStr }), infoListDom);
          }
          flag = 6;
          break;
        case 7:
          $('.activate').removeClass('activate');
          $('#tab-7').addClass('activate');
          //      data.groupIDs = ['100101', '100102', '100201', '100202', '100203'];
          data.groupIDs = ['30101', '30102'];
          if (!data7) {
            pbEngine.queryInfoListWithJson(JSON.stringify(data));
          } else {
            ReactDOM.render(React.createElement(InfoList, { contents: data7, dir: dirStr }), infoListDom);
          }
          flag = 7;
          break;
        case 8:
          $('.activate').removeClass('activate');
          $('#tab-8').addClass('activate');
          data.groupIDs = ['30101', '30102'];
          if (!data8) {
            pbEngine.queryInfoListWithJson(JSON.stringify(data));
          } else {
            ReactDOM.render(React.createElement(InfoList, { contents: data8, dir: dirStr }), infoListDom);
          }
          flag = 8;
          break;
        default:
          break;
      }
    }

    $('.nav-tabs>li').each(function (n, e) {
      $(e).on('tap', function () {
        changeTab(n);
      });
    });

    function callback(message) {
      var msg = JSON.parse(message);
      var CONTENTS = msg.jData.Indexes;
      if (data.groupIDs.indexOf('10101') > -1) {
        data0 = CONTENTS;
      } else if (data.groupIDs.indexOf('10301') > -1) {
        data1 = CONTENTS;
      } else if (data.groupIDs.indexOf('40102') > -1) {
        data2 = CONTENTS;
      } else if (data.groupIDs.indexOf('40101') > -1) {
        data3 = CONTENTS;
      } else if (data.groupIDs.indexOf('40104') > -1) {
        data4 = CONTENTS;
      } else if (data.groupIDs.indexOf('40105') > -1) {
        data5 = CONTENTS;
      } else if (data.groupIDs.indexOf('40103') > -1) {
        data6 = CONTENTS;
      } else if (data.groupIDs.indexOf('100101') > -1) {
        data7 = CONTENTS;
      } else if (data.groupIDs.indexOf('30101') > -1) {
        data8 = CONTENTS;
      }
      ReactDOM.render(React.createElement(InfoList, { contents: CONTENTS, dir: dirStr }), infoListDom);
    }

    pbEngine.queryInfoListWithJson(JSON.stringify(data));
  } else {
    var flag = 0;
    var data0 = null,
        data1 = null,
        data2 = null,
        data3 = null,
        data4 = null,
        data5 = null,
        data6 = null,
        data7 = null,
        data8 = null;
    // var data = 'http://192.168.6.18/HdNews2/Web/Hd_LatestNewsList.aspx?type=mu&gcount=2&group1=10101&doc=json&count=30';
    var data = [10101];
    var infoListDom = document.getElementById('info-list');
    var dirStr = 'pobo:info/';
    function changeTab(n) {
      if (n == flag) {
        return;
      }
      switch (n) {
        case 0:
          $('.activate').removeClass('activate');
          $('#tab-0').addClass('activate');
          data = [10101];
          if (!data0) {
            $.post(url(data)[0], function (data) {
              var CONTENTS = JSON.parse(data).Indexes;
              ReactDOM.render(React.createElement(InfoList, { contents: CONTENTS, dir: dirStr }), infoListDom);
            });
          } else {
            ReactDOM.render(React.createElement(InfoList, { contents: data0, dir: dirStr }), infoListDom);
          }
          flag = 0;
          break;
        case 1:
          $('.activate').removeClass('activate');
          $('#tab-1').addClass('activate');
          data = [10301];
          if (!data1) {
            $.post(url(data)[0], function (data) {
              var CONTENTS = JSON.parse(data).Indexes;
              ReactDOM.render(React.createElement(InfoList, { contents: CONTENTS, dir: dirStr }), infoListDom);
            });
          } else {
            ReactDOM.render(React.createElement(InfoList, { contents: data1, dir: dirStr }), infoListDom);
          }
          flag = 1;
          break;
        case 2:
          $('.activate').removeClass('activate');
          $('#tab-2').addClass('activate');
          data = ['40102', '40202'];
          if (!data2) {
            $.post(url(data)[0], function (data) {
              var CONTENTS = JSON.parse(data).Indexes;
              ReactDOM.render(React.createElement(InfoList, { contents: CONTENTS, dir: dirStr }), infoListDom);
            });
          } else {
            ReactDOM.render(React.createElement(InfoList, { contents: data2, dir: dirStr }), infoListDom);
          }
          flag = 2;
          break;
        case 3:
          $('.activate').removeClass('activate');
          $('#tab-3').addClass('activate');
          data = ['40101', '40201'];
          if (!data3) {
            $.post(url(data)[0], function (data) {
              var CONTENTS = JSON.parse(data).Indexes;
              ReactDOM.render(React.createElement(InfoList, { contents: CONTENTS, dir: dirStr }), infoListDom);
            });
          } else {
            ReactDOM.render(React.createElement(InfoList, { contents: data3, dir: dirStr }), infoListDom);
          }
          flag = 3;
          break;
        case 4:
          $('.activate').removeClass('activate');
          $('#tab-4').addClass('activate');
          data = ['40104', '40204'];
          if (!data4) {
            $.post(url(data)[0], function (data) {
              var CONTENTS = JSON.parse(data).Indexes;
              ReactDOM.render(React.createElement(InfoList, { contents: CONTENTS, dir: dirStr }), infoListDom);
            });
          } else {
            ReactDOM.render(React.createElement(InfoList, { contents: data4, dir: dirStr }), infoListDom);
          }
          flag = 4;
          break;
        case 5:
          $('.activate').removeClass('activate');
          $('#tab-5').addClass('activate');
          data = ['40105', '40205'];
          if (!data5) {
            $.post(url(data)[0], function (data) {
              var CONTENTS = JSON.parse(data).Indexes;
              ReactDOM.render(React.createElement(InfoList, { contents: CONTENTS, dir: dirStr }), infoListDom);
            });
          } else {
            ReactDOM.render(React.createElement(InfoList, { contents: data5, dir: dirStr }), infoListDom);
          }
          flag = 5;
          break;
        case 6:
          $('.activate').removeClass('activate');
          $('#tab-6').addClass('activate');
          data = ['40103', '40203'];
          if (!data6) {
            $.post(url(data)[0], function (data) {
              var CONTENTS = JSON.parse(data).Indexes;
              ReactDOM.render(React.createElement(InfoList, { contents: CONTENTS, dir: dirStr }), infoListDom);
            });
          } else {
            ReactDOM.render(React.createElement(InfoList, { contents: data6, dir: dirStr }), infoListDom);
          }
          flag = 6;
          break;
        case 7:
          $('.activate').removeClass('activate');
          $('#tab-7').addClass('activate');
          data = ['30101', '30102'];
          if (!data7) {
            $.post(url(data)[0], function (data) {
              var CONTENTS = JSON.parse(data).Indexes;
              ReactDOM.render(React.createElement(InfoList, { contents: CONTENTS, dir: dirStr }), infoListDom);
            });
          } else {
            ReactDOM.render(React.createElement(InfoList, { contents: data7, dir: dirStr }), infoListDom);
          }
          flag = 7;
          break;
        case 8:
          $('.activate').removeClass('activate');
          $('#tab-8').addClass('activate');
          data = ['30101', '30102'];
          if (!data8) {
            $.post(url(data)[0], function (data) {
              var CONTENTS = JSON.parse(data).Indexes;
              ReactDOM.render(React.createElement(InfoList, { contents: CONTENTS, dir: dirStr }), infoListDom);
            });
          } else {
            ReactDOM.render(React.createElement(InfoList, { contents: data8, dir: dirStr }), infoListDom);
          }
          flag = 8;
          break;
        default:
          break;
      }
    }

    $('.nav-tabs>li').each(function (n, e) {
      $(e).on('tap', function () {
        changeTab(n);
      });
    });
    $.post(url(data)[0], function (data) {
      var CONTENTS = JSON.parse(data).Indexes;
      ReactDOM.render(React.createElement(InfoList, { contents: CONTENTS, dir: dirStr }), infoListDom);
    });
  }

  // 滑动插件
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