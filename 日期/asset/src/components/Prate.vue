<template>
  <div class="prate">
    <div class="list-group prod-rate">
      <div class="list-group-item">
        <span>管理费</span>
        <span>{{ isNaN(detlProd.managefee) ? '--' : detlProd.managefee.toFixed(2) + '%' }}</span>
      </div>
      <div class="list-group-item">
        <span>托管费</span>
        <span>{{ isNaN(detlProd.trusteefee) ? '--' : detlProd.trusteefee.toFixed(2) + '%' }}</span>
      </div>
      <div class="list-group-item high">
        <p>其他费用</p>
        <p>{{ detlProd.fee }}</p>
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
    this.$store.commit('changeTitle', '产品费率');
  }
}
</script>
