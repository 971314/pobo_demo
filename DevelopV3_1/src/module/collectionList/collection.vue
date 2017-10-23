<template>
  <div>
    <nav-bar :captionText.sync="tip" :rigthText.sync="navText" @edit="edit" :navIsShow.sync="navIsShow"></nav-bar>
    <div class="collectionlist">
      <collection-list v-for="(item,i) in collection" :isHide.sync="isHide" :title.sync="item.title" :source.sync="item.soure" :time.sync="item.titme" :newsImg.sync="item.imgUrl" :url.sync="item.url" :inputValue.sync="item.inputValue" v-model="inputData" :isSelect.sync="isSelect" :key="item.id" @listSelectClick="listSelectClick(i)" ref="select"></collection-list>
    </div>
    <footer-bar v-show="footIsShow" @deleteClick="deleteClick" @selectClick="selectClick" :num.sync="selectQuantity"></footer-bar>
  </div>
</template>
<script>
  import navBar from './components/collection-nav.vue';
  import footerBar from './components/collection-footer.vue';
  import collectionList from './components/collectionList.vue';
  export default {
      data(){
          return {
            tip:'收藏',//nav标题
            navText:'编辑',//nav右边文字
            bool:true,//判断nav编辑状态
            selectQuantity:'',//选择数量
            footIsShow:false,//编辑框是否显示
            navIsShow:false,//返回箭头是否显示
            isHide:true,//选择按钮是否显示
            collection:[//收藏列表
              {
                  url:'www.baiud.com',
                title:'深交所：紧盯年末“突击创新”严防严管利润操作',
                titme:'03-05 17：35',
                soure:'热点话题',
                imgUrl:'http://192.168.6.83:8080/zhongxin/shouChang/news.png',
                inputValue:'1'
              },
              {
                url:'www.baiud.com',
                title:'深交所：紧盯年末“突击创新”严防严管利润操作',
                titme:'03-05 17：35',
                soure:'热点话题',
                imgUrl:'http://192.168.6.83:8080/zhongxin/shouChang/news.png',
                inputValue:'2'
              },
              {
                url:'www.baiud.com',
                title:'深交所：紧盯年末“突击创新”严防严管利润操作',
                titme:'03-05 17：35',
                soure:'热点话题',
                imgUrl:'http://192.168.6.83:8080/zhongxin/shouChang/news.png',
                inputValue:'4'
              }
            ],
            inputData:[],//选中数组
            isSelect:false,//全选
          }
      },
    components:{
      navBar:navBar,
      footerBar:footerBar,
      collectionList:collectionList
    },
    methods:{
      edit(){
          this.bool = !this.bool;
          if(this.bool){
            this.navText = '编辑';
            this.navIsShow = false;
            this.footIsShow = false;
            this.isHide = true;
          }else{
            this.navText = '取消';
            this.navIsShow = true;
            this.footIsShow = true;
            this.isHide = false;
          }
      },
      selectClick(){
          this.isSelect = !this.isSelect;
          console.log('全选')
      },
      deleteClick(){
          console.log('删除')
      },
      listSelectClick(index){
          var dom = this.$refs.select[index].$el.firstElementChild;
          if(dom.className === 'container select'){
            dom.setAttribute('class','container');
          }else if(dom.className === 'container') {
            dom.setAttribute('class', 'container select');
          }
      }
    }
  }
</script>
<style>
  .collectionlist{
    margin-top:3.2rem;
  }
</style>
