<template>
 <div>
  <div class="scroll" style="overflow: hidden;">
    <tabbar class="no-margin" activeKey="tabs[0].name" @change="getObjBeforeData" ref="scroll">
        <tabbar-item v-for="item in tabs" :eventKey="item.name">{{item.name}}</tabbar-item>
    </tabbar>
  </div>
 
  <div id="info-list">
   <div class="list-group">
     <div v-for="item in newsList" class="list-group-item clearfix" @click="showDetail(item.ID)"><span class="title">{{item.Title}}</span><span class="time">{{item.Pubtime}}</span></div>
    </div>
  </div>
 </div>
</template>

<script>
  import '../../../assets/js/jroll.min.js'
  
    export default{
      props: ['tabs'],
      
      data: function(){
        return {
          newsList: [],
          data1: [],
          data2: [],
          data3: [],
          data4: [],
          data5: [],
          data6: [],
          data7: [],
          data8: [],
          count: 0
        }
      },
      
      mounted: function () {
        var width = document.documentElement.clientWidth;
        var num = Math.ceil(this.tabs.length/4);
        var scroll = this.$refs.scroll.$el;
        document.getElementsByClassName('no-margin')[0].style.width = num*width + 'px';
        for (var i = 0, j = scroll.children.length; i < j; i++) {
          scroll.children[i].style.width = width/4 + 'px';
          scroll.children[i].style.float = 'left';
        }
        scroll.style.width = width*num;
        //$('.tabbar>tabbar-item').css('float', 'left');
        /*$('.tabbar .tabbar-item').css('width', width/4);
        $('.tabbar').css('width', width*num);*/
        var option = {
          scrollX: true,
          scrollY: false,
          scroller: '.tabbar',
          bounce: false
        },
        jroll = new JRoll(".scroll", option);
        
        this.getData(this.tabs[0]);
        
        window.callback = function (message) {
          var msg = JSON.parse(message);
          if(msg.moduleId == 90004){
            var CONTENTS = msg.jData.Indexes.slice(0, this.count);
            this.newsList = CONTENTS;
            //ReactDOM.render(React.createElement(InfoList, { contents: CONTENTS, dir: dirStr }), document.getElementById('info-list'));
          }
        }.bind(this);
      },
      
      methods: {
        getData: function (obj) {
          this.count = obj.count;
          pbEINFO.infoQueryListWithJson(JSON.stringify({type: 'mu', groupIDs: obj.ids, doc: 'json', count: obj.count}));
        },
        
        getObjBeforeData: function (val) {
          var arr = this.tabs;
          for (var i = 0; i < arr.length; i++) {
            if (arr[i].name == val) {
              this.getData(arr[i]);
              return;
            }
          }
        },
        
        showDetail: function (id) {
          const path = '/details/' + id;
          this.$router.push({path: path})
        }
      }
    }
</script>
<style>
  
</style>