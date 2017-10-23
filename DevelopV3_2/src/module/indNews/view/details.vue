<template>
  <div>
   <navbar theme="default">
      <router-link :to="{path: '/hyzx'}">
          <icon name="chevron-left" size="lg"></icon>
      </router-link>
      <span slot="body">详细信息</span>
  </navbar>
   
    <!--<div style="width: 100%;">
      <div class="navbar">
        <a href="goBack" class="goBack">
          <img src="images/goback.png" alt="返回">
        </a>
        <span class="text">详细信息</span>
      </div>
    </div>-->
    
    <div class="news">
      <h4 id="title"></h4>
      <p id="info">来源：&nbsp;<span id="provider"></span><span id="time"><!--2017-4-1 8:03:57--></span></p>
      <p id="content"></p>
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
      console.log(data);
      pbEINFO.infoQueryDetailWithJson(JSON.stringify(data));
      
      window.callback = function (message) {
        message = message.replace(/\n/g, '<br>');
        message = message.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
        message = message.replace(/\s/g, '&nbsp;');
        var msg = JSON.parse(message);
        if(msg.moduleId == 90004){
          var newsDetail = msg.jData.News;
          console.log(newsDetail);
          if (newsDetail.Text.substring(0, 5) == '{url:') {
            window.location.href='pobo:uncheck=1&pageId=900004&url=' + newsDetail.Text + '?title=详细信息';
            return;
          }
          document.getElementById('title').innerHTML = newsDetail.Title;
          document.getElementById('time').innerHTML = newsDetail.Pubtime;
          document.getElementById('provider').innerHTML = newsDetail.Source;
          document.getElementById('content').innerHTML = newsDetail.Text;
        }
      }.bind(this);
    }
  }
</script>

<style scoped>
  .fa-chevron-left:before {
      content:url(../../../assets/images/back.png);
  }
  html, body {font-family: Microsoft Yahei, Arial, Helvetica, sans-serif;}
  .navbar {background-color: #eb1212; top: 0; position: fixed; right: 0; left: 0; z-index: 1030; color: #fff; font-size: 18px;}
  .news {margin-top: 54px;}
  .news h4 {font-size: 16px;}
  #title {margin-top: 0; margin-bottom: 10px;}
  #info {
    margin-left: -8px;
    margin-right: -8px; margin-bottom: 10px;
    padding-left: 8px;
    padding-right: 8px;
    padding-bottom: 5px;
    font-size: 12px;
    color: lightgray;
    border-bottom: 1px solid #e4e7f0;
  }
  #time {
    margin-left: 10px;
  }
  #content {
    margin-top: 8px;
    border: none;
    background-color: transparent;
    font-size: 16px;
    line-height: 24px;
    overflow-wrap: break-word;
  }
</style>
