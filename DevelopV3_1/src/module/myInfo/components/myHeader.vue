<template>
  <div class="myhead">
    <img :src="myBackImg"/>
    <div class="headPortrait colorFont">
      <div>
        <img :src="headImg"/>
        <span v-model="userName">{{userName}}</span>
      </div>
    </div>
    <div class="headArea colorFont">
      <span @click="mysign()">签到</span>
      <span v-model="coinBuilt">建投币：{{coinBuilt}}</span>
      <a v-model="collection" :href="collectionUrl">收藏：{{collection}}</a>
    </div>
  </div>
</template>
<script>
  export default {
    props:['myBackImg','userName','headImg','coinBuilt','collection','collectionUrl'],
    methods:{
      mysign:function(){
        this.$emit('mysign')
      }
    }
  }
</script>
<style>
.myhead{
  height: 10rem;
  width:100%;
  position:relative;
}
.myhead>img{
  width:100%;
  height:100%;
}
  .headPortrait{
    width:17%;
    margin:0 auto;
  }
  .headPortrait>div{
    /*width:5rem;*/
    border:2px white solid;
    border-radius: 4rem;
    /*height: 5rem;*/
    margin-top: -9rem;
  }
.headPortrait>div>img{
  width:100%;
  border-radius: 33px;
}
.headPortrait>div>span{
  width:100%;
  display:inline-block;
  text-align:center;
}
  .headArea{
    width:100%;
    position:absolute;
    bottom: 0.4rem;
  }
.headArea span,.headArea a{
  color: #ffffff;
  text-decoration:none;
  float:left;
  padding-left:13%;
}
  .colorFont{
    color: #ffffff;
    font-size: 16px;
  }
</style>
