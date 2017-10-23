<template>
  <div>
    <div v-for="(item, index) in items">
      <templet :hrefUrl.sync="item.hrefUrl" :imgUrl.sync="item.imgUrl" v-if="index == '0'" style="margin-top:15px;"></templet>
      <templet :hrefUrl.sync="item.hrefUrl" :imgUrl.sync="item.imgUrl" v-else></templet>
    </div>
  </div>
</template>
<script>
  import templet from './components/templet.vue';
  export default{
      data(){
        return {
          items:[
            {
              hrefUrl:'http://www.baidu.com',
              imgUrl:'http://61.172.197.204/xy/1190/zhong/1.png'
            },
            {
              hrefUrl:'http://www.baidu.com',
              imgUrl:'http://61.172.197.204/xy/1190/zhong/1.png'
            },
            {
              hrefUrl:'http://www.baidu.com',
              imgUrl:'http://61.172.197.204/xy/1190/zhong/1.png'
            }
          ]
        }
      },
      components:{
        templet:templet
      }
  }
</script>
