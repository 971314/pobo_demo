<template>
  <div class="qii">
    <div class="content" v-html="content"></div>
    <input class="btn btn-blue btn-asset-block" type="button" @click="confirm" value="我是合格投资者">
  </div>
</template>

<script>
module.exports = {
  data () {
    return {
      content: window.config.QIIContent
    }
  },
  mounted () {
    this.$store.commit('changeTitle', '合格投资者认定');
    $('body').addClass('bgc-white');
  },
  methods: {
    confirm () {
      this.$router.push('/risk/0');
    }
  }
}
</script>
