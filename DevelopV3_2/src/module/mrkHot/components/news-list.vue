<template>
 <div>
   <tabbar class="no-margin" activeKey="tabs[0].name" @change="getNews">
      <tabbar-item v-for="item in tabs" :eventKey="item.name">{{item.name}}</tabbar-item>
  </tabbar>
  <group>
      <cell v-for="item in newsList">
         <a href="'pobo:pageId=900004&title=新闻详情&url=http://static.yunyesoft.com/consult/newsBase/searchPage/'+item.detailId">
          <media>
              <media-body>
                  <p :style="{fontSize: '14px', color: '#1a1a1a'}">{{item.infotitle}}</p>
                  <p :style="{fontSize: '10px', color: '#808086'}">{{item.typecode}} {{item.pushdate}}</p>
              </media-body>
              <media-object>
                  <img :style="{width: '92px', height: '63px'}" v-bind:src="'http://static.yunyesoft.com/static/img/'+item.thumbid +'.png'">
              </media-object>
          </media>
        </a>
      </cell>
  </group>
 </div>
</template>

<script>
  import axios from 'axios';
    export default{
      props: ['newsPar', 'tabs', 'tags'],
      data: function () {
        return {
                newsList: [],  //新闻列表
                parArr: {}  //以tabs中name为key的参数对象
                /*data1: [],
                data2: [],
                data3: []*/
              }
      },
      watch: {
        'newsPar': function () {  //首页使用时newsPar一直为空，watch不会调用
          if (this.tags) {
            /*if (!this.data1.length) {  //第一次发查新闻请求
              this.getNews(this.tabs[0].name);
              console.log("第一次渲染");
            }*/
            this.getNews(this.tabs[0].name);
          }
          //console.log(this.newsPar);
        }
      },
      
      mounted() {
        for (var i = 0, j= this.tabs.length; i < j; i++) {
          this.parArr[this.tabs[i].name] = this.tabs[i].par;
        }
        
        console.log(this.parArr);
        
        if (!this.tags) {  //首页使用
          this.newsPar = null; //首页使用时tags需传null
          this.getNews(this.tabs[0].name);
        }
      },
      /*{"pageNo": 1, "pageSize": 10, "tags": this.newsPar, "part": ""}*/
      methods: {
        getNews: function (val) {
          var news = [], _this = this;
          console.log(this.parArr[val]);
          console.log(this.newsPar);
          axios.post('http://static.yunyesoft.com/consult/newsBase/api',
            {"func":"7001", "data":[{
                    "pageNo":1,"pageSize":10, "tags": _this.newsPar.split(','), "part": _this.parArr[val]
                    /*"pageNo":1,"pageSize":10, "tags": ["黄金"], "part": _this.parArr[val]*/
                }]
            }
          )
          .then(function(res){
            _this.newsList = res.data.data[0].results;
          })
          .catch(function(err){
              console.log(err);
          })
        }
      }
    }
</script>
<style>
  .tabbar-item {color: #1a1a1a; font-size: 14px; line-height: 35px; height: 35px;}
  .tabbar {height: 35px;}
  .tabbar-item.active {color: #eb1212; border-bottom-color: #eb1212;}
  .tabbar-indicator {background-color: #eb1212;}
</style>