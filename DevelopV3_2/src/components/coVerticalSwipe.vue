<template>
  <ul class="notice-group" id="notice-group" style="top: 0;">
    <li class="notice-item">开通分级基金相关权限</li>
    <li class="notice-item">中信建投第一期次级债</li>
    <li class="notice-item">协议转让设置有效价格</li>
    <li class="notice-item">开通分级基金相关权限</li>
    <li class="notice-item">中信建投第一期次级债</li>
  </ul>
</template>

<script>
export default {
  data () {
    return {
      delay: 3000
    }
  },
  mounted () {
    var noticeDom = document.getElementById('notice-group');
    var t = setInterval(function () {
      var top = parseInt(noticeDom.style.top);
      top = top - 35;
      noticeDom.style.transition = 'top .3s linear';
      noticeDom.style.top = top + 'px';
      if (top + 4 * 35 <= 0) {
        setTimeout(function () {
          noticeDom.style.transition = 'none';
          noticeDom.style.top = '-35px';
        }, 500);
      }
    }, this.delay);
  }
}
</script>

<style>
 .notice .notice-group {
  position: relative;
  margin: 0;
  padding: 0;
  width: calc(100% - 100px);
  list-style-type: none;
}
 .notice .notice-group .notice-item {
  padding-left: 10px;
  height: 35px;
  line-height: 35px;
  text-align: left;
}
</style>
