<template>
  <div class="hnv">
    <div class="hnv-header">
      <div class="row">
        <div class="col-xs-3">净值日期</div>
        <div class="col-xs-3">单位净值</div>
        <div class="col-xs-3">累计净值</div>
        <div class="col-xs-3">净值变动</div>
      </div>
    </div>
    <div class="hnv-body" id="wrapper">
      <div id="scroller">
        <div class="row" v-for="hnvList in hnvLists">
          <div class="col-xs-3">{{ hnvList.publishtime }}</div>
          <div class="col-xs-3">{{ hnvList.unitnav ? hnvList.unitnav.toFixed(4) : '----' }}</div>
          <div class="col-xs-3">{{ hnvList.accnav ? hnvList.accnav.toFixed(4) : '----' }}</div>
          <div class="col-xs-3" :class="{ red: hnvList.varnav > 0, green: hnvList.varnav < 0 }">{{ isNaN(hnvList.varnav) ? '--' : hnvList.varnav + '%' }}</div>
        </div>
        <div id="pullUp" :class="{hide: hnvLists.length < 20}">上拉加载更多</div>
      </div>
    </div>
    <div class="no-data" v-if="!hnvLists.length">暂无历史净值数据</div>
  </div>
</template>

<script>
var hnvScroll;
var loadingStep = 0;
module.exports = {
  data () {
    return {
      hnvLists: [],
      pagenum: 1,
    }
  },
  mounted () {
    this.$store.commit('changeTitle', '历史净值');
    $('body').addClass('pt-84');
    hnvScroll = null;
    loadingStep = 0;
    this.getHnvLists('20');
  },
  updated () {
    if (!hnvScroll) {
      hnvScroll = new IScroll('#wrapper', {
        probeType: 2,
        mouseWheel: true,
        momentum: false
      });
      hnvScroll.on('scroll', function(hnvScroll){
        if(loadingStep == 0){
          if (hnvScroll.y < (hnvScroll.maxScrollY - 20)) {
            loadingStep = 1;
            $('#pullUp').html('松开加载更多');
          }
        }
      }.bind(this, hnvScroll));
      hnvScroll.on('scrollEnd',function(){
        if(loadingStep == 1){
          loadingStep = 2;
          $('#pullUp').html('正在加载更多');
          this.getHnvLists('10');
        }
      }.bind(this));
    } else {
      hnvScroll.refresh();
    }
  },
  methods: {
    getHnvLists (pagesize) {
      var data = {
        uid: this.$store.state.UserId,
        sid: this.$store.state.Token,
        loginname: this.$store.state.LoginName,
        orgid: this.$store.state.jgid,
        data: [
          {
            productid: this.$store.state.detlProd.productid + '',
            pagenum: this.pagenum + '',
            pagesize: pagesize
          }
        ]
      };
      $.ajax({
        method: 'POST',
        url: window.config.serverAdd + window.config.prodNavWS,
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: 'application/json',
        xhrFields: {withCredentials: true},
        crossDomain: true,
        async: false,
        success: function (data) {
          if (data.retHead == 1) {
            if (data.data.length) {
              loadingStep = 0;
              this.pagenum = this.pagenum + 1;
              this.hnvLists = this.hnvLists.concat(data.data);
              $('#pullUp').html('上拉加载更多');
            } else {
              loadingStep = 4;
              $('#pullUp').html('已经没有更多');
            }
          } else {
            alert('拉取历史净值信息失败');
          }
        }.bind(this),
        error: function (jqXHR, textStatus, errorThrown) {
          console.error(textStatus);
        }
      });
    }
  }
}
</script>
