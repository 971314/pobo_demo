<template>
  <div id="back">
    <div class="invitation">
    <div class="above">
      <img :src="headImg">
      <span>{{nickname}}</span>
    </div>
    <div class="qimages"><img :src="QRCode"/></div>
    <span class="fonter">扫面/长按二维码，下载<span>{{corporate}}</span>期货公司客户端</span>
  </div>
  </div>
</template>
<script>
  export default{
      data(){
          return {
            headImg:'http://61.172.197.204/xy/1190/zhong/haoYouYaoQing.png',
            nickname:'张小澜',
            QRCode:'http://61.172.197.204/xy/1190/zhong/haoYouYaoQing.png',
            corporate:'XX'
          }
      }
  }
</script>
<style>
  html, body{font-family:Helvetica,"Microsoft YaHei",Arial,sans-serif;background:#ffffff;margin:0}
  .invitation{
    width:70%;
    margin:0 auto;
    padding-top:6rem;
  }
  .above img,.above span{
    display: inline-block;
  }
  .above img{
    width:27%;
    /*height:4rem;*/
    vertical-align: middle
  }
  .above span{
    padding-left:1rem;
    font-size: 23px;
  }
  .qimages img{
    margin-top:2.5rem;
    margin-bottom: 3rem;
    width:100%;
  }
  .fonter{
    font-size: 12px;
    color:#808086;
  }
</style>
