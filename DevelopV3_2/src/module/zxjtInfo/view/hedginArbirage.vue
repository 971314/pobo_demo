<template>
  <div>
    <common-nav>
      <a slot="body">
        <span slot="body">套保套利</span>
      </a>
    </common-nav>
    <div v-for="(item, index) in items">
      <templet :hrefUrl.sync="item.hrefUrl" :imgUrl.sync="item.imgUrl" v-if="index == '0'" style="margin-top:15px;"></templet>
      <templet :hrefUrl.sync="item.hrefUrl" :imgUrl.sync="item.imgUrl" v-else></templet>
    </div>
  </div>
</template>
<script type="es6">
  import templet from '../components/templet.vue';
  import Axios from 'axios';
  export default{
    data(){
      return {
        items:[]
      }
    },
    components:{
      templet:templet
    },
    created(){
      var _this = this;
      Axios.get('../conf/cfZxjtInfo.json').then(function (data) {
        var arr = data.data.hedgingArbitrage;
        for(var i = 0; i < arr.length; i++){
          _this.items.push({
            hrefUrl:arr[i].url,
            imgUrl:arr[i].img
          })
        }
        console.log(_this.items)
      }).catch(function (err) {
        console.log(err)
      })
    }
  }
</script>
