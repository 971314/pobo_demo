<template>
  <div class="rslt">
    <p class="header">基金/资管</p>
    <div class="type">
      <img :src="rsltImgSrc" alt="" />
    </div>
    <p class="level">您的风险级别</p>
    <router-link class="btn btn-block btn-fourthly" to="/risk">重新测评</router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
      levelConfig: {
        'level-1': {
          rsltImgSrc: '../images/result1.png',
          typeText: '保守型',
          riskRank: '低'
        },
        'level-2': {
          rsltImgSrc: '../images/result2.png',
          typeText: '稳健型',
          riskRank: '中/低'
        },
        'level-3': {
          rsltImgSrc: '../images/result3.png',
          typeText: '积极型',
          riskRank: '高/中/低'
        },
        'level-4': {
          rsltImgSrc: '../images/result4.png',
          typeText: '积极型',
          riskRank: '高/中/低'
        },
        'level-5': {
          rsltImgSrc: '../images/result5.png',
          typeText: '积极型',
          riskRank: '高/中/低'
        }
      },
      rsltImgSrc: '../images/result.png',
      typeText: '',
      riskRank: ''
    }
  },
  created () {
    var level = this.$route.params.rslt;
    this.rsltImgSrc = this.levelConfig['level-' + level].rsltImgSrc;
    this.typeText = this.levelConfig['level-' + level].typeText;
    this.riskRank = this.levelConfig['level-' + level].riskRank;
  },
  mounted () {
    document.getElementById('title').innerHTML = '风险测评';
  }
}
</script>

<style>
.rslt .header {
  margin: 57px auto 42px;
  font-size: 17px;
  line-height: 17px;
  color: #1a1a1a;
  text-align: center;
}
.rslt .type {
  position: relative;
  margin: 0 auto 10px;
  width: 39%;
  text-align: center;
}
.rslt .type img {
  max-width: 100%;
}
.rslt .level {
  font-size: 14px;
  color: #808086;
  text-align: center;
}
.rslt .btn-fourthly {
  margin: 53px auto 0;
  border: 1px solid #eb1212;
  border-radius: 20px;
  width: 160px;
  color: #eb1212;
}
</style>
