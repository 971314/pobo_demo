<template>
  <div class="rslt">
    <p class="header">您的风险测评结果为：</p>
    <div class="type">
      <img :src="rsltImgSrc" alt="" />
      <p>{{typeText}}</p>
    </div>
    <p class="basis">根据您的投资风险等级</p>
    <p class="fit">适合{{riskRank}}风险等级产品</p>
    <input class="btn btn-blue btn-asset-block" type="button" @click="complete" value="完成">
  </div>
</template>

<script>
module.exports = {
  data () {
    return {
      rsltImgSrc: '',
      typeText: '',
      riskRank: ''
    }
  },
  created () {
    var level = this.$store.state.level;
    var levelConfig = window.config.rslt;
    this.rsltImgSrc = levelConfig['level-' + level].rsltImgSrc;
    this.typeText = levelConfig['level-' + level].typeText;
    this.riskRank = levelConfig['level-' + level].riskRank;
  },
  mounted () {
    this.$store.commit('changeTitle', '测评结果');
    $('body').addClass('bgc-white');
  },
  methods: {
    complete () {
      $('body').removeClass('bgc-white');
      this.$router.push('/private');
    }
  }
}
</script>
