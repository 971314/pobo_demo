var isApp = typeof pbE != 'undefined';
ReactDOM.render(React.createElement(DealTitleFutures, null), document.getElementById('title'));

if(typeof pbE == 'undefined'){
  window.pbE = {
    WT:function () {
      var obj = {
        wtGetCurrentConnectionCID:function () {

        },
        wtQueryBargainRe:function () {
          var data = {
            functionNO:56004,
            jData:{
              '223':3
            },
            data:[
              {
                '64': '50ETF',
                '54': '',
                '159': 0,
                '129': 200,
                '112': 1,
                '117': 1,
                '130': 222,
                '156': 3,
                '63': '',
                '40':1,
                '113':125,
                '116':'10:10',
                '114':1000
              },
              {
                '64': '50ETF',
                '54': '',
                '159': 123,
                '129': 200,
                '112': 0,
                '117': 0,
                '130': 222,
                '156': 3,
                '63': '',
                '40':1,
                '113':123,
                '116':'11:00',
                '114':1234
              }
            ]
          }
          return JSON.stringify(data);
        },
      }
      return obj;
    },
    SYS:function () {
      var obj1 = {
        stopLoading:function () {

        },
        startLoading:function () {

        }
      }
      return obj1;
    }
  }
}
var refreshFlag = 1;

function callback(message) {
  //console.log(message);
  var msg = JSON.parse(message);
  if (msg.functionNO == 56004) {
      console.log('56004');
    if (msg.jData['223'] == 3) {
      if (!refreshFlag) {
        pbE.SYS().stopLoading();
        refreshFlag = 1;
      }
      setBargain();
       /* dataHis1 = pbE.WT().wtQueryBargainRe(CID);
      if (dataHis1) {
        dataHis = JSON.parse(dataHis1).data;
        //倒序排列
        if (dataHis[0]) {
            dataHis = sortDeal(dataHis);
          // ReactDOM.render(React.createElement(DealContentsFutures, { contents: CONTENTS }), document.getElementById('contents'));
            new Vue({
                el:'#contents'
            })
        }
      }*/
    }
  } else if (msg.functionNO == 56006) {
      setBargain();
    /*  console.log('56006')
      dataHis1 = pbE.WT().wtQueryBargainRe(CID);
    if (dataHis1) {
      dataHis = JSON.parse(dataHis1).data;
      //倒序排列
      if (dataHis[0]) {
          dataHis = sortDeal(dataHis);
        // ReactDOM.render(React.createElement(DealContentsFutures, { contents: CONTENTS3 }), document.getElementById('contents'));
          new Vue({
              el:'#contents'
          })
      }
    }*/
  }
}


function setBargain() {
  pbE.SYS().startLoading();
  var CID = pbE.WT().wtGetCurrentConnectionCID();
  //先取上一次查询结果显示
  dataHis1 = pbE.WT().wtQueryBargainRe(CID);
  if (dataHis1) {
    dataHis = JSON.parse(dataHis1).data;

      for (var i = 0; i < dataHis.length; i++) {
        var market = dataHis[i]['54'],
            code = dataHis[i]['63'];
        var marketInfo = JSON.parse(pbE.WT().wtGetHQInfo(code, market)); //交易信息转换行情信息
        dataHis[i]["name"] = marketInfo.HQName || "";
      }

    if (dataHis[0]) {
      dataHis = sortDeal(dataHis);
        ReactDOM.render(React.createElement(DealContentsFutures, {contents: dataHis}), document.getElementById('contents'));
    }

  }

  pbE.SYS().startLoading();

}

function reload() {
  setBargain();
  /*pbE.SYS().startLoading();
  var CID = pbE.WT().wtGetCurrentConnectionCID();
  //先取上一次查询结果显示
  dataHis1 = pbE.WT().wtQueryBargainRe(CID);
  if (dataHis1) {
    dataHis = JSON.parse(dataHis1).data;
    //倒序排列
    if (dataHis[0]) {
      dataHis = sortDeal(dataHis);
      // ReactDOM.render(React.createElement(DealContentsFutures, { contents: dataHis }), document.getElementById('contents'));
        new Vue({
            el:'#contents'
        })
    }
  }
  pbE.SYS().stopLoading();*/
}

function refresh() {
  pbE.SYS().startLoading();
  refreshFlag = 0;
  pbE.WT().wtSynFlash(CID);
}
function doShow(flag) {
  if (!flag) {
    pbE.SYS().stopLoading(); //离开页面时停止转圈
  }
}
var CID, dataHis1, dataHis;
setBargain();
/*
var CID = pbE.WT().wtGetCurrentConnectionCID();
//先取上一次查询结果显示
pbE.SYS().startLoading();
var dataHis1 = pbE.WT().wtQueryBargainRe(CID);
if (dataHis1) {
  var dataHis = JSON.parse(dataHis1).data;
  //倒序排列
  if (dataHis[0]) {
    dataHis = sortDeal(dataHis);
    // ReactDOM.render(React.createElement(DealContentsFutures, { contents: dataHis }), document.getElementById('contents'));
      new Vue({
        el:'#contents'
      })
  }
}
pbE.SYS().stopLoading();
*/
