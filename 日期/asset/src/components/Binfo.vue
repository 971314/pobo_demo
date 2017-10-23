<template>
  <div class="binfo">
    <div class="list-group basic-info">
      <div class="list-group-item">
        <span>产品状态</span>
        <span>{{ detlProd.periodstatusname }}</span>
      </div>
      <div class="list-group-item">
        <span>截止时间</span>
        <span>{{ detlProd.expiretime }}</span>
      </div>
      <div class="list-group-item">
        <span>产品形式</span>
        <span>{{ detlProd.fundchannelname }}</span>
      </div>
      <div class="list-group-item">
        <span>存续期限</span>
        <span>{{ getDuration() }}</span>
      </div>
      <div class="list-group-item">
        <span>发行规模</span>
        <span>{{ detlProd.issuesize }}万元</span>
      </div>
      <div class="list-group-item high">
        <p>盈利分配</p>
        <p>{{ detlProd.profitallocation }}</p>
      </div>
    </div>
    <div class="survey">
      <div class="header">投资概况</div>
      <div class="body">
        <p class="title">投资目标</p>
        <p class="content">{{ detlProd.goal }}</p>
        <p class="title">投资范围</p>
        <p class="content">{{ detlProd.scope }}</p>
      </div>
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
    this.$store.commit('changeTitle', '产品信息');
  },
  methods: {
    getDuration () {
      var years = parseInt(this.detlProd.duration / 12);
      var months = this.detlProd.duration % 12;
      var duration = '';
      if (years > 0) {
        duration = years + '年';
      }
      if (months > 0) {
        duration = duration + months + '月';
      }
      return duration;
    }
  }
}
</script>
