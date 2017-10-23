var isApp = typeof pbE != 'undefined';
if(typeof pbE == 'undefined'){
  window.pbE = {
    WT:function () {
      var obj = {
        wtGeneralRequest:function () {
          var data = {
            functionNO:6052,
            jData:{
              data:[
                {
                  '64': '50ETF',
                  '54': 234,
                  '159': '10:10',
                  '129': 111,
                  '112': 0,
                  '117': 0,
                  '130': 222,
                  '156': 3,
                  '63': 12345,
                  '113':333,
                  '126':'否',
                  '163':''
                },
                {
                  '64': '50ETF',
                  '54': 234,
                  '159': '13:00',
                  '129': 110,
                  '112': 1,
                  '117': 0,
                  '130': 220,
                  '156': 4,
                  '63': 12345,
                  '113':330,
                  '126':'否',
                  '163':'备注信息'
                },
                {
                  '64': '50ETF',
                  '54': 234,
                  '159': '13:00',
                  '129': 110,
                  '112': 1,
                  '117': 0,
                  '130': 220,
                  '156': 4,
                  '63': 12345,
                  '113':330,
                  '126':'否'
                }
              ]
            }
          }
          callback(JSON.stringify(data))
        }
      }
      return obj;
    },
    SYS:function () {
      var obj1 = {
        stopLoading:function () {

        },
        startLoading:function () {

        },
      }
      return obj1;
    }
  }
  $('#goBack').click(function () {
    location.href = document.referrer;
  })
}else{
    $('#goBack').click(function () {
      location.href = 'goBack';
    })
}

var dateYesterday = new Date();
var dateThree = new Date();
var dateWeek = new Date();
var dateMonth = new Date();
dateYesterday = new Date(dateYesterday.getTime() - 1000 * 60 * 60 * 24 * 1);
dateThree = new Date(dateThree.getTime() - 1000 * 60 * 60 * 24 * 3);
dateWeek = new Date(dateWeek.getTime() - 1000 * 60 * 60 * 24 * 7);
dateMonth = new Date(dateMonth.getTime() - 1000 * 60 * 60 * 24 * 30);
var strYesterday = dateYesterday.format('yyyyMMdd'),
    strThree = dateThree.format('yyyyMMdd'),
    strWeek = dateWeek.format('yyyyMMdd'),
    strMonth = dateMonth.format('yyyyMMdd');
var TIMES = {
  yesterday: strYesterday,
  three: strThree,
  week: strWeek,
  month: strMonth
};
var dataTime = {
  '171': strThree,
  '172': strYesterday
};


ReactDOM.render(React.createElement(NavHeader, { name: '历史委托' }), document.getElementById('nav-header'));
ReactDOM.render(React.createElement(TimeTitle, { times: TIMES, entrust: true, futures: true }), document.getElementById('time-title'));
ReactDOM.render(React.createElement(EntrustTitleFutures, null), document.getElementById('title'));

//先取上一次查询结果显示
/*var data1 = pbE.WT().wtGeneralRequestRe(CID, 6052);
if (data1) {
  var data2 = JSON.parse(data1).data;
  if (data2[0]) {
    //倒序排列
    sortEntrust(data2);
    ReactDOM.render(<EntrustContentsFutures contents={data2} history={true}/>, document.getElementById('contents'));
  }
}*/

var dataThree = null;
var dataWeek = null;
var dataMonth = null;
var dataRandom = null;
function callback(message) {
  pbE.SYS().stopLoading();
  var msg = JSON.parse(message);
  if (msg.functionNO == 6052) {
    var CONTENTS = msg.jData.data;
    sortEntrust(CONTENTS);
    if (dataTime['171'] == strThree && dataTime['172'] == strYesterday) {
      dataThree = CONTENTS;
    } else if (dataTime['171'] == strWeek && dataTime['172'] == strYesterday) {
      dataWeek = CONTENTS;
    } else if (dataTime['171'] == strMonth && dataTime['172'] == strYesterday) {
      dataMonth = CONTENTS;
    } else {
      dataRandom = CONTENTS;
    }
    ReactDOM.render(React.createElement(EntrustContentsFutures, { contents: CONTENTS, history: true }), document.getElementById('contents'));
  }
}

pbE.SYS().startLoading();
pbE.WT().wtGeneralRequest(CID, 6052, JSON.stringify(dataTime));

var dateFrom = pikadayResponsive($('#date-from')[0], {
  format: 'YYYY-MM-DD',
  outputFormat: 'YYYYMMDD',
  placeholder: '起始日期'
});
var dateTo = pikadayResponsive($('#date-to')[0], {
  format: 'YYYY-MM-DD',
  outputFormat: 'YYYYMMDD',
  placeholder: '终止日期'
});
dateFrom.setDate(moment(strYesterday, 'YYYYMMDD'), 'YYYY-MM-DD');
dateTo.setDate(moment(strYesterday, 'YYYYMMDD'), 'YYYY-MM-DD');
$('#date-from').change(function (e) {
  var timer = 0;
  clearTimeout(timer);
  timer = setTimeout(function () {
    if ($('#date-from').val() <= $('#date-to').val()) {
      dataTime = {
        '171': $('#date-from').val(),
        '172': $('#date-to').val()
      };
      pbE.SYS().startLoading();
      pbE.WT().wtGeneralRequest(CID, 6052, JSON.stringify(dataTime));
    } else {
      alert('起始日期不得晚于终止日期');
    }
  }, 2000);
});
$('#date-to').change(function (e) {
  var timer = 0;
  clearTimeout(timer);
  timer = setTimeout(function () {
    if ($('#date-to').val() >= $('#date-from').val() && $('#date-to').val() <= strYesterday) {
      dataTime = {
        '171': $('#date-from').val(),
        '172': $('#date-to').val()
      };
      pbE.SYS().startLoading();
      pbE.WT().wtGeneralRequest(CID, 6052, JSON.stringify(dataTime));
    } else if ($('#date-to').val() > strYesterday) {
      alert('终止日期不得晚于昨天');
    } else if ($('#date-to').val() < $('#date-from').val()) {
      alert('终止日期不得早于起始日期');
    }
  }, 2000);
});

function doShow(flag) {
  if (!flag) pbE.SYS().stopLoading();
}

if(isApp){
  process(JSON.parse(pbE.SYS().readConfig('future/conf/future.json')));
}else{
  $.get('../conf/future.json',process);
}
function process(config) {
  var con = config.historyEntrust.fields;
  if(con[0].isShow){
    $('.deal0').css('display','block')
  }else{
    $('.deal0').css('display','none')
  }
  if(con[1].isShow){
    $('.deal1').css('display','block')
  }else{
    $('.deal1').css('display','none')
  }
  if(con[2].isShow){
    $('.deal2').css('display','block')
  }else{
    $('.deal2').css('display','none')
  }
  if(con[3].isShow){
    $('.deal3').css('display','block')
  }else{
    $('.deal3').css('display','none')
  }
}
