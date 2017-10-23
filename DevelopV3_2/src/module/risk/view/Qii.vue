<template>
  <div class="qii">
    <div class="body">
      <h3>合格投资者认定</h3>
      <p>根据《私募投资基金监督管理暂行办法》第四章第十四条规定：“私募基金管理人、私募基金销售机构不得向合格投资者之外的单位和个人募集资金，不得通过报刊、电台、电视、互联网等公众传播媒体或者讲座、报告会、分析会和布告、传单、手机短信、微信、博客和电子邮件等方式，向不特定对象宣传推介。”</p>
      <p>中信建投期货有限公司谨遵《私募投资基金监督管理暂行办法》之规定，只向特定的合格投资者宣传推介相关私募投资基金产品。</p>
      <p>如有意进行私募产品投资且满足《私募投资基金监督管理暂行办法》关于“合规投资者”标准之规定，<span style="color: #eb1212;">即具备相应风险识别能力和风险承担能力，投资于单只私募基金的金额不低于100万元，且个人金融类资产不低于300万元或者最近三年个人年均收入不低于50万元人民币。</span>请阁下详细阅读本提示，点击确认方可获得私募产品宣传推介服务。</p>
    </div>
    <div class="footer">
      <router-link class="btn btn-block btn-thirdly" to="/risk">我是合格投资者</router-link>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
    document.getElementById('title').innerHTML = '合格投资者认定';
  }
}
</script>

<style>
.qii {
  height: 100%;
}
.qii .body {
  padding: 30px 38px;
  height: 100%;
  background-color: #fff;
}
.qii .body h3 {
  margin-bottom: 23px;
  font-size: 15px;
  font-weight: normal;
  line-height: 15px;
  color: #eb1212;
  text-align: center;
}
.qii .body p {
  margin-bottom: 0;
  font-size: 13px;
  color: #1a1a1a;
  text-align: left;
  text-indent: 2em;
}
.qii .footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 1px solid #e4e7f0;
  padding: 5px 15px;
  height: 49px;
  background-color: #f7f7fa;
}
.qii .footer .btn-thirdly {
  border: none;
  border-radius: 5px;
  padding: 0;
  height: 38px;
  font-size: 15px;
  line-height:38px;
  color: #fff;
  background-color: #eb1212;
}
</style>
