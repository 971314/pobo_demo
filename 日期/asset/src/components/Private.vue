<template>
  <div class="private">
    <div class="tab-group">
      <div class="col-xs-6" :class="{ active: asset }" @click="changeTab(0)">资管产品</div>
      <div class="col-xs-6" :class="{ active: !asset }" @click="changeTab(1)">财富产品</div>
    </div>
    <div v-show="asset">
      <div class="private-item" v-for="assetProd in assetProds" @click="gotoDetail(assetProd.risklevel, assetProd)">
        <div class="header">
          <img :src="getImg(assetProd.risklevel)" alt="" />
          <span class="name">{{assetProd.productname}}</span>
          <span class="min">{{ assetProd.subscribeline }}万起</span>
        </div>
        <div class="body">
          <div class="col-xs-6">
            <p class="price">{{ assetProd.unitnav ? assetProd.unitnav.toFixed(4) : '----' }}</p>
            <p>{{ assetProd.navpublishtime ? assetProd.navpublishtime : '暂未发布净值' }}</p>
          </div>
          <div class="col-xs-6">
            <p>存续期: {{ getDuration(assetProd.duration) }}</p>
            <p>截止: {{ assetProd.expiretime }}</p>
          </div>
        </div>
      </div>
      <div class="no-data" v-if="!assetProds.length">暂无资管产品数据</div>
    </div>
    <div v-show="!asset">
      <div class="private-item" v-for="wealthProd in wealthProds" @click="gotoDetail(wealthProd.risklevel, wealthProd)">
        <div class="header">
          <img :src="getImg(wealthProd.risklevel)" alt="" />
          <span class="name">{{wealthProd.productname}}</span>
          <span class="min">{{ wealthProd.subscribeline }}万起</span>
        </div>
        <div class="body">
          <div class="col-xs-6">
            <p class="price">{{ wealthProd.unitnav ? wealthProd.unitnav.toFixed(4) : '----' }}</p>
            <p>{{ wealthProd.navpublishtime ? wealthProd.navpublishtime : '暂未发布净值' }}</p>
          </div>
          <div class="col-xs-6">
            <p>存续期: {{ getDuration(wealthProd.duration) }}</p>
            <p>截止: {{ wealthProd.expiretime }}</p>
          </div>
        </div>
      </div>
      <div class="no-data" v-if="!wealthProds.length">暂无财富产品数据</div>
    </div>
    <div class="my-modal" :class="{ hide: hide }">
      <div class="my-modal-backdrop"></div>
      <div class="my-modal-dialog">
        <div class="my-modal-content">
          <div class="my-modal-header">
            提示
          </div>
          <div class="my-modal-body">
            <div class="tips-img">
              <img src="../images/tips.png" alt="" />
            </div>
            <p class="tips-text">您的风险等级低于所浏览的产品风险等级。请查看其他产品或重做<span class="red">风险测评</span></p>
          </div>
          <div class="my-modal-footer">
            <input class="btn-left" type="button" @click="cancel" value="取消">
            <input class="btn-right" type="button" @click="reset" value="重新测评">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  data () {
    return {
      asset: true,
      hide: true,
      assetProds: [],
      wealthProds: []
    }
  },
  mounted () {
    this.$store.commit('changeGoBack', 'close');
    this.$store.commit('changeTitle', '私募产品');
    $('body').addClass('pt-84');
    if (this.$store.state.assetProds.length == 0 && this.$store.state.wealthProds ==0) {
      var data = {
        uid: this.$store.state.UserId,
        sid: this.$store.state.Token,
        loginname: this.$store.state.LoginName,
        orgid: this.$store.state.jgid,
        data: []
      };
      $.ajax({
        method: 'POST',
        url: window.config.serverAdd + window.config.prodListWS,
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: 'application/json',
        xhrFields: {withCredentials: true},
        crossDomain: true,
        async: false,
        success: function (data) {
          if (data.retHead == 1) {
            this.assetProds = data.data[0].list1;
            this.wealthProds = data.data[0].list2;
            this.$store.commit('changeAssetProds', data.data[0].list1);
            this.$store.commit('changeWealthProds', data.data[0].list2);
          } else {
            alert('拉取产品列表信息失败');
          }
        }.bind(this),
        error: function (jqXHR, textStatus, errorThrown) {
          console.error(textStatus);
        }
      });
    } else {
      this.assetProds = this.$store.state.assetProds;
      this.wealthProds = this.$store.state.wealthProds;
    }
  },
  methods: {
    changeTab (flag) {
      if (flag) {
        if (this.asset) {
          $('body').scrollTop(0);
          this.asset = false;
        }
      } else {
        if (!this.asset) {
          $('body').scrollTop(0);
          this.asset = true;
        }
      }
    },
    getImg (rank) {
      if (window.config.private['level-' + rank]) {
        return window.config.private['level-' + rank].rankImgSrc;
      }
    },
    getDuration (totalMonths) {
      var years = parseInt(totalMonths / 12);
      var months = totalMonths % 12;
      var duration = '';
      if (years > 0) {
        duration = years + '年';
      }
      if (months > 0) {
        duration = duration + months + '月';
      }
      return duration;
    },
    gotoDetail (rank, prod) {
      if (rank <= this.$store.state.level) {
        $('body').removeClass('pt-84');
        this.$store.commit('changeDetlProd', prod);
        this.$router.push('/detail');
      } else {
        this.hide = false;
      }
    },
    cancel () {
      this.hide = true;
    },
    reset () {
      $('body').removeClass('pt-84');
      this.$router.push('/risk/1');
    }
  }
}
</script>
