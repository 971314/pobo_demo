<template>
  <div class="nsp">
    <div class="content" v-html="content"></div>
    <input class="btn btn-blue btn-asset-block" type="button" @click="agree" value="同意网络服务协议">
  </div>
</template>

<script>
module.exports = {
  data () {
    return {
      content: window.config.NSPContent
    }
  },
  mounted () {
    this.$store.commit('changeTitle', '网络服务协议');
    $('body').addClass('bgc-white');
  },
  methods: {
    agree () {
      this.$router.push('/qii');
    }
  }
}
</script>
