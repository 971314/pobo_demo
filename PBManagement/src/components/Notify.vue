<template>
  <div>
    <iframe ref="iframe" :src="pageUrl"></iframe>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pageUrl: ''
    }
  },
  mounted () {
    let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
    this.pageUrl = 'http://192.168.1.111:18080/?uid=' + userInfo.userId + '&token=' + escape(userInfo.token);
  }
}
</script>

<style>
  iframe {
    margin-bottom: -4px;
    border: none;
    width: 100%;
    min-height: 650px;
  }
</style>
