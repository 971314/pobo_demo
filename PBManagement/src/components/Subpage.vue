<template>
  <div>
    <iframe :src="pageUrl"></iframe>
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
    this.pageUrl = 'http://192.168.1.111:18080/#/send';
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
