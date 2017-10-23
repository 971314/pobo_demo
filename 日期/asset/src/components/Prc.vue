<template>
  <div class="prc">
    <div class="list-group risk-ctrl">
      <div class="list-group-item">
        <span>风险等级</span>
        <span>{{ detlProd.risklevelname }}</span>
      </div>
      <div class="list-group-item">
        <span>预警线净值</span>
        <span>{{ detlProd.warnnav ? detlProd.warnnav.toFixed(4) : '----' }}</span>
      </div>
      <div class="list-group-item">
        <span>止损线净值</span>
        <span>{{ detlProd.stoplossnav ? detlProd.stoplossnav.toFixed(4) : '----' }}</span>
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
    this.$store.commit('changeTitle', '产品风控');
  }
}
</script>
