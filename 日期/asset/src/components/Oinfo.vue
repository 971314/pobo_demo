<template>
  <div class="oinfo">
    <div class="list-group other-info">
      <div class="list-group-item">
        <span>认购起点</span>
        <span>{{ detlProd.subscribeline }}万元</span>
      </div>
      <div class="list-group-item high">
        <p>申购和赎回</p>
        <p>{{ detlProd.subsandred }}</p>
      </div>
      <div class="list-group-item">
        <span>投资顾问</span>
        <span>{{ detlProd.advisor }}</span>
      </div>
      <div class="list-group-item">
        <span>投资经理</span>
        <span>{{ detlProd.manager }}</span>
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
    this.$store.commit('changeTitle', '其他信息');
  }
}
</script>
