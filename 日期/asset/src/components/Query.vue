<template>
  <div class="query">
    <div class="tab-group">
      <div class="col-xs-4" :class="{ active: appl }" @click="changeTab(0)"><span>预约申请</span></div>
      <div class="col-xs-4" :class="{ active: conf }" @click="changeTab(1)"><span>已确认</span></div>
      <div class="col-xs-4" :class="{ active: canc }" @click="changeTab(2)"><span>已撤销</span></div>
    </div>
    <div v-show="appl">
      <div class="query-item" v-for="applList in applLists">
        <div class="col-xs-3 time">
          <p>认购</p>
          <p>{{ applList.bookingtime.split(' ')[0] }}</p>
          <p>{{ applList.bookingtime.split(' ')[1] }}</p>
        </div>
        <div class="col-xs-6 name">{{ applList.productname }}</div>
        <div class="col-xs-3 status">已申请</div>
      </div>
      <div class="no-data" v-if="!applLists.length">暂无预约申请数据</div>
    </div>
    <div v-show="conf">
      <div class="date-selector">
        <div class="col-xs-5 start-date">
          <input id="conf-start-date" name="conf-start-date">
          <label for="conf-start-date-input"><img src="../images/calendar.png" alt="" /></label>
        </div>
        <div class="col-xs-2 to">至</div>
        <div class="col-xs-5 end-date">
          <input id="conf-end-date" name="conf-end-date">
          <label for="conf-end-date-input"><img src="../images/calendar.png" alt="" /></label>
        </div>
      </div>
      <div class="query-item" v-for="confList in confLists">
        <div class="col-xs-3 time">
          <p>认购</p>
          <p>{{ confList.bookingtime.split(' ')[0] }}</p>
          <p>{{ confList.bookingtime.split(' ')[1] }}</p>
        </div>
        <div class="col-xs-6 name">{{ confList.productname }}</div>
        <div class="col-xs-3 status">已确认</div>
      </div>
      <div class="no-data" v-if="!confLists.length">暂无已确认数据</div>
    </div>
    <div v-show="canc">
      <div class="date-selector">
        <div class="col-xs-5 start-date">
          <input id="canc-start-date" name="canc-start-date">
          <label for="canc-start-date-input"><img src="../images/calendar.png" alt="" /></label>
        </div>
        <div class="col-xs-2 to">至</div>
        <div class="col-xs-5 end-date">
          <input id="canc-end-date" name="canc-end-date">
          <label for="canc-end-date-input"><img src="../images/calendar.png" alt="" /></label>
        </div>
      </div>
      <div class="query-item" v-for="cancList in cancLists">
        <div class="col-xs-3 time">
          <p>认购</p>
          <p>{{ cancList.bookingtime.split(' ')[0] }}</p>
          <p>{{ cancList.bookingtime.split(' ')[1] }}</p>
        </div>
        <div class="col-xs-6 name">{{ cancList.productname }}</div>
        <div class="col-xs-3 status">已撤销</div>
      </div>
      <div class="no-data" v-if="!cancLists.length">暂无已撤销数据</div>
    </div>
    <alert :msg="errMsg" @confirm="confirm"></alert>
  </div>
</template>

<script>
var moment = require('moment');
var Alert = require('./Alert.vue');
module.exports = {
  data () {
    return {
      appl: true,
      conf: false,
      canc: false,
      applLists: [],
      confLists: [],
      cancLists: [],
      errMsg: ''
    }
  },
  components: {
    alert: Alert
  },
  mounted () {
    this.$store.commit('changeTitle', '交易查询');
    $('body').addClass('pt-84');
    this.getBookLists('', '', '1,2');
    var confStartDate = pikadayResponsive($('#conf-start-date'), {
      placeholder: '开始日期',
      checkIfNativeDate: function () {
        return true;
      }
    });
    var confEndDate = pikadayResponsive($('#conf-end-date'), {
      placeholder: '结束日期',
      checkIfNativeDate: function () {
        return true;
      }
    });
    var cancStartDate = pikadayResponsive($('#canc-start-date'), {
      placeholder: '开始日期',
      checkIfNativeDate: function () {
        return true;
      }
    });
    var cancEndDate = pikadayResponsive($('#canc-end-date'), {
      placeholder: '结束日期',
      checkIfNativeDate: function () {
        return true;
      }
    });
    var monthAgo = moment().subtract(1, 'M').format('YYYY-MM-DD');
    var today = moment().format('YYYY-MM-DD');
    confStartDate.setDate(monthAgo);
    confEndDate.setDate(today);
    cancStartDate.setDate(monthAgo);
    cancEndDate.setDate(today);
    $('#conf-start-date').change(function(e) {
      var timer = 0;
      clearTimeout(timer);
      timer = setTimeout(function(){
        if ($('#conf-start-date').val() <= $('#conf-end-date').val()) {
          if (this.conf) {
            this.getBookLists($('#conf-start-date').val(), $('#conf-end-date').val(), '3');
          }
        } else {
          alert('开始日期不得晚于结束日期');
        }
      }.bind(this), 1000);
    }.bind(this));
    $('#conf-end-date').change(function(e) {
      var timer = 0;
      clearTimeout(timer);
      timer = setTimeout(function(){
        if ($('#conf-end-date').val() >= $('#conf-start-date').val() && $('#conf-end-date').val() <= today) {
          if (this.conf) {
            this.getBookLists($('#conf-start-date').val(), $('#conf-end-date').val(), '3');
          }
        } else if ($('#conf-end-date').val() > today) {
          alert('结束日期不得晚于今天');
        } else if ($('#conf-end-date').val() < $('#conf-start-date').val()) {
          alert('结束日期不得早于开始日期');
        }
      }.bind(this), 1000);
    }.bind(this));
    $('#canc-start-date').change(function(e) {
      var timer = 0;
      clearTimeout(timer);
      timer = setTimeout(function(){
        if ($('#canc-start-date').val() <= $('#canc-end-date').val()) {
          if (this.canc) {
            this.getBookLists($('#canc-start-date').val(), $('#canc-end-date').val(), '4');
          }
        } else {
          alert('开始日期不得晚于结束日期');
        }
      }.bind(this), 1000);
    }.bind(this));
    $('#canc-end-date').change(function(e) {
      var timer = 0;
      clearTimeout(timer);
      timer = setTimeout(function(){
        if ($('#canc-end-date').val() >= $('#canc-start-date').val() && $('#canc-end-date').val() <= today) {
          if (this.canc) {
            this.getBookLists($('#canc-start-date').val(), $('#canc-end-date').val(), '4');
          }
        } else if ($('#canc-end-date').val() > today) {
          alert('结束日期不得晚于今天');
        } else if ($('#canc-end-date').val() < $('#canc-start-date').val()) {
          alert('结束日期不得早于开始日期');
        }
      }.bind(this), 1000);
    }.bind(this));
  },
  methods: {
    getBookLists (fromdate, todate, status) {
      var data = {
        uid: this.$store.state.UserId,
        sid: this.$store.state.Token,
        loginname: this.$store.state.LoginName,
        orgid: this.$store.state.jgid,
        data: [
          {
            fromdate: fromdate,
            todate: todate,
            status: status
          }
        ]
      };
      $.ajax({
        method: 'POST',
        url: window.config.serverAdd + window.config.bookListWS,
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: 'application/json',
        xhrFields: {withCredentials: true},
        crossDomain: true,
        async: false,
        success: function (data) {
          if (data.retHead == 1) {
            if (status == '1,2') {
              this.applLists = data.data[0].info;
            } else if (status == '3') {
              this.confLists = data.data[0].info;
            } else if (status == '4') {
              this.cancLists = data.data[0].info;
            }
          } else {
            alert('拉取交易查询信息失败');
          }
        }.bind(this),
        error: function (jqXHR, textStatus, errorThrown) {
          console.error(textStatus);
        }
      });
    },
    changeTab (flag) {
      switch (flag) {
        case 0:
          if (!this.appl) {
            $('body').scrollTop(0);
            this.appl = true;
            this.conf = false;
            this.canc = false;
          }
          break;
        case 1:
          if (!this.conf) {
            $('body').scrollTop(0);
            this.appl = false;
            this.conf = true;
            this.canc = false;
            if (!this.confLists.length) {
              this.getBookLists($('#conf-start-date').val(), $('#conf-end-date').val(), '3');
            }
          }
          break;
        case 2:
          if (!this.canc) {
            $('body').scrollTop(0);
            this.appl = false;
            this.conf  = false;
            this.canc = true;
            if (!this.cancLists.length) {
              this.getBookLists($('#canc-start-date').val(), $('#canc-end-date').val(), '4');
            }
          }
          break;
        default:
          break;
      }
    },
    confirm () {
      $('body').removeClass('modal-open');
      this.errMsg = '';
    }
  }
}
</script>
