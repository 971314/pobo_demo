<template>
  <div>
    <tabbar class="no-margin" activeKey="资金流向" @change="changeHandle" id="marketHot-tabbar">
        <tabbar-item v-for="item in tabs" :eventKey="item.name">{{item.name}}</tabbar-item>
        <a href="pobo:uncheck=1&pageId=800012&type=1"><img src="images/share.png" :style="{width: '20px', height: '20px', marginTop: '7px'}"></a>
    </tabbar>
    
    <router-view></router-view>
    
    <!--<router-view @get-newsPar="get"></router-view>
    
    <news-list :newsPar="newsPar" :tabs="newsTabs"></news-list>-->
  </div>
</template>
<script>
  //import axios from 'axios';
  //import NavBar from '../../components/coNav.vue';
  //import NewsList from './components/news-list.vue';
  
  export default {
    data:function(){
      return{
        tabs: [{
                    name: '资金流向',
                }, {
                    name: '资金沉淀',
                }, {
                    name: '活跃品种',
                }]
        /*news: [],
        newsPar: [],
        data1: {},
        data2: [],
        data3: []*/
      }
    },
    components: {
      //'nav-bar': NavBar,
      //'news-list': NewsList
    },
    
    mounted: function () {
      this.$router.push({path: '/zjlx'});
      /*console.log(this.newsPar);
      axios.post('http://static.yunyesoft.com/consult/newsBase/searchPage',
        {"pageNo": 1, "pageSize": 10, "tags": this.newsPar, "part": ""}
      )
      .then(function(res){
          console.log(res);
          var news = res.data.results;
      })
      .catch(function(err){
          console.log(err);
      })*/
    },
    
    methods:{
      /*get:function(par){
        this.newsPar = par;
        //相关新闻查询top, top: 10, tags: newsPar, ajax
      },*/
      
      changeHandle(val) {
        if(val == "资金流向"){
          this.$router.push('/zjlx')
        }else if (val == "资金沉淀"){
          this.$router.push('/zjcd')
        }else if (val == "活跃品种") {
          this.$router.push('/hypz')
        }
      },
    },
  }
</script>
<style>
</style>