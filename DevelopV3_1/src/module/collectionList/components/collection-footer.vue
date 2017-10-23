<template>
  <div class="cellectionFooter">
    <span @click="selectClick">全选</span>
    <span @click="deleteClick" class="red">删除{{num}}</span>
  </div>
</template>
<script>
  export default {
      props:['num'],
    methods:{
      selectClick(){
          this.$emit('selectClick')
      },
      deleteClick(){
          this.$emit('deleteClick')
      }
    }
  }
</script>
<style>
.cellectionFooter{
  width:100%;
  position:fixed;
  bottom:0;
  height:3.2rem;
  line-height:3.2rem;
  background:#f7f7fa;
  border-top:1px solid #c0c6cd;
}
  .cellectionFooter span{
    width:49%;
    font-size:20px;
    display:inline-block;
    text-align: center;
  }
.red{
  color:#eb1212;
}
</style>
