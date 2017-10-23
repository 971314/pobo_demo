<template>
  <div class="detail">
    <div class="detail-top">
      <p class="header">{{ detlProd.productname }}</p>
      <div class="body">
        <div class="col-xs-6">
          <p>{{ detlProd.unitnav ? detlProd.unitnav.toFixed(4) : '----' }}</p>
          <p>单位净值</p>
        </div>
        <div class="col-xs-6">
          <p>{{ detlProd.accnav ? detlProd.accnav.toFixed(4) : '----' }}</p>
          <p>累计净值</p>
        </div>
      </div>
      <div class="footer">
        <img :src="getImg()" alt="" />
        <span>起投金额:&nbsp;</span>
        <span>{{ detlProd.subscribeline }}万元</span>
        <span>*更新至{{ getPublishDate() }}*</span>
      </div>
    </div>
    <div class="list-group">
      <div class="list-group-item">
        <span class="title">产品指标</span>
        <router-link class="link" to="/hnv">查看历史净值</router-link>
      </div>
      <div class="list-group-item quota-item">
        <div>
          <span>年化收益率</span>
          <span :class="{ red: detlProd.annualroa > 0, green: detlProd.annualroa < 0 }">{{ isNaN(detlProd.annualroa) ? '--' : detlProd.annualroa + '%' }}</span>
        </div>
      </div>
      <div class="list-group-item quota-item">
        <div>
          <span>最大回撤率</span>
          <span :class="{ red: detlProd.maxdd > 0, green: detlProd.maxdd < 0 }">{{ isNaN(detlProd.maxdd) ? '--' : detlProd.maxdd + '%' }}</span>
        </div>
      </div>
      <div class="list-group-item quota-item">
        <div>
          <span>半年回报率</span>
          <span :class="{ red: detlProd.nav6month > 0, green: detlProd.nav6month < 0 }">{{ isNaN(detlProd.nav6month) ? '--' : detlProd.nav6month + '%' }}</span>
        </div>
      </div>
      <div class="list-group-item quota-item">
        <div>
          <span>季度回报率</span>
          <span :class="{ red: detlProd.nav3month > 0, green: detlProd.nav3month < 0 }">{{ isNaN(detlProd.nav3month) ? '--' : detlProd.nav3month + '%' }}</span>
        </div>
      </div>
      <div class="list-group-item quota-item">
        <div>
          <span>月回报率</span>
          <span :class="{ red: detlProd.nav1month > 0, green: detlProd.nav1month < 0 }">{{ isNaN(detlProd.nav1month) ? '--' : detlProd.nav1month + '%' }}</span>
        </div>
      </div>
      <div class="list-group-item quota-item">
        <div>
          <span>周回报率</span>
          <span :class="{ red: detlProd.nav1week > 0, green: detlProd.nav1week < 0 }">{{ isNaN(detlProd.nav1week) ? '--' : detlProd.nav1week + '%' }}</span>
        </div>
      </div>
      <router-link class="list-group-item" to="/binfo">
        <span>基本信息</span>
        <img src="../images/arrow-right.png" alt="" />
      </router-link>
      <router-link class="list-group-item" to="/prate">
        <span>产品费率</span>
        <img src="../images/arrow-right.png" alt="" />
      </router-link>
      <router-link class="list-group-item" to="/prc">
        <span>产品风控</span>
        <img src="../images/arrow-right.png" alt="" />
      </router-link>
      <router-link class="list-group-item" to="/oinfo">
        <span>其他信息</span>
        <img src="../images/arrow-right.png" alt="" />
      </router-link>
    </div>
    <div class="fixed-bottom">
      <input class="btn btn-blue btn-asset-block" type="button" @click="order" value="预约购买">
    </div>
  </div>
</template>

<script>
module.exports = {
  data () {
    return {
      detlProd: this.$store.state.detlProd
    }
  },
  mounted () {
    this.$store.commit('changeGoBack', 'goBack');
    this.$store.commit('changeTitle', '产品详情');
    $('body').addClass('pb-48');
    if (!this.detlProd.advisor) {
      var data = {
        uid: this.$store.state.UserId,
        sid: this.$store.state.Token,
        loginname: this.$store.state.LoginName,
        orgid: this.$store.state.jgid,
        data: [
          {
            productid: this.detlProd.productid + ''
          }
        ]
      };
      $.ajax({
        method: 'POST',
        url: window.config.serverAdd + window.config.prodDetlWS,
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: 'application/json',
        xhrFields: {withCredentials: true},
        crossDomain: true,
        async: false,
        success: function (data) {
          if (data.retHead == 1) {
            this.detlProd = {
              ...this.detlProd,
              ...data.data[0].info
            };
            this.$store.commit('changeDetlProd', this.detlProd);
          } else {
            alert('拉取产品详情信息失败');
          }
        }.bind(this),
        error: function (jqXHR, textStatus, errorThrown) {
          console.error(textStatus);
        }
      });
    }
  },
  methods: {
    getImg () {
      return window.config.private['level-' + this.detlProd.risklevel].rankImgSrc;
    },
    getPublishDate () {
      var date = moment(this.detlProd.navpublishtime);
      return (date.month() + 1) + '月' + date.date() + '日';
    },
    order () {
      this.$store.commit('changeOrderPhoneNum', '');
      this.$router.push('/order/1');
    }
  }
}
</script>
