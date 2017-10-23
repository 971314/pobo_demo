<template>
  <div>
    <common-nav :goback="false">
      <segmented-control activeKey="建投优选" @change="changeHandle" slot="body">
          <segmented-control-item eventKey="建投优选">建投优选</segmented-control-item>
          <segmented-control-item eventKey="行业资讯">行业资讯</segmented-control-item>
      </segmented-control>
   </common-nav>
   
    
    <router-view :tabs="tabs"></router-view>
    
    <!--<news-list :news-list="news" :tabs="tabs"></news-list>-->
  </div>
</template>
<script>
  export default {
    data:function(){
      return{
        tip:'行业资讯',
        tabs: [{
          "name":"国内资讯",
          "ids":["10101"],
          "count": 30
        },
        {
          "name":"金融财经",
          "ids":["10301"],
          "count": 30
        },
        {
          "name":"稀贵金属",
          "ids":["40102","40202"],
          "count": 30
        },
        {
          "name":"金属市场",
          "ids":["40101","40201"],
          "count": 30
        },
        {
          "name":"农产品",
          "ids":["40104","40204"],
          "count": 30
        },
        {
          "name":"能源化工",
          "ids":["40105","40205"],
          "count": 30
        },
        {
          "name":"黑色金属",
          "ids":["40103","40203"],
          "count": 30
        },
        {
          "name":"股指期货",
          "ids":["30101","30102"],
          "count": 30
        }]
      }
    },
    components: {
      //'nav-bar': NavBar,
      //'news-list': NewsList
    },
    
    mounted: function () {
      this.$router.push({path: '/jtyx'});
    },
    
    methods: {
      changeHandle(val) {
        if(val == "建投优选"){
          this.$router.push('/jtyx')
        }else if (val == "行业资讯"){
          this.$router.push('/hyzx')
        }
      },
    },
  }
</script>
<style>
  
</style>