<template>
  <div>
    <div style="width: 100%;">
      <div class="navbar">
        <a href="goBack" class="goBack">
          <img src="images/goback.png" alt="返回">
        </a>
        <span class="text">详细信息</span>
      </div>
    </div>
    
    <div class="news">
      <h4 class="title"></h4>
      <p class="info">来源：&nbsp;<span class="provider"></span><span class="time"><!--2017-4-1 8:03:57--></span></p>
      <p class="content"></p>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
  
    mounted: function () {
      var data = {doc: 'json', newsId: this.$route.params.id, type: 'mu'};
      pbEINFO().infoQueryDetailWithJson(JSON.stringify(data));
      
      window.callback = function (message) {
        message = message.replace(/\n/g, '<br>');
        message = message.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
        message = message.replace(/\s/g, '&nbsp;');
        var msg = JSON.parse(message);
        if(msg.moduleId == 90004){
          var newsDetail = msg.jData.News;
          if (newsDetail.Text.substring(0, 5) == '{url:') {
            window.location.href='pobo:uncheck=1&pageId=900004&url=' + newsDetail.Text + '?title=详细信息';
            return;
          }
          document.getElementsByClassName('.title').innerHTML(newsDetail.Title);
          document.getElementsByClassName('.time').innerHTML(newsDetail.Pubtime);
          document.getElementsByClassName('.provider').innerHTML(newsDetail.Source);
          document.getElementsByClassName('.content').innerHTML(newsDetail.Text);
        }
      }
    }
  }
</script>

<style scoped>
  html, body {font-family: Microsoft Yahei, Arial, Helvetica, sans-serif;}
  .navbar {background-color: #eb1212; height: 18px; padding: 13px 2.5%; border: none; top: 0; position: fixed; right: 0; left: 0; z-index: 1030; text-align: center; }
  .goBack {float: left; }
  .goBack a {text-decoration: none;}
  .text {color: #fff; line-height: 18px;}

  .news {margin-top: 54px;}
  .news h4 {font-size: 16px;}
  .title {margin-top: 0; margin-bottom: 10px;}
  .info {
    margin-left: -8px;
    margin-right: -8px; margin-bottom: 10px;
    padding-left: 8px;
    padding-right: 8px;
    padding-bottom: 5px;
    font-size: 12px;
    color: lightgray;
    border-bottom: 1px solid #e4e7f0;
  }
  .time {
    margin-left: 10px;
  }
  .content {
    margin-top: 8px;
    border: none;
    background-color: transparent;
    font-size: 14px;
    line-height: 24px;
    overflow-wrap: break-word;
  }
</style>
