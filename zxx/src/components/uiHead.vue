<template>
    <div>
        <div id="head" class="head" :class="{'transparent':transparent}">
            <div class="head-back" @click="$back"></div>
            <div class="head-search"></div>
            <div class="head-title" v-text="title"></div>
            <div class="head-kefu"></div>
            <div class="head-msg"></div>
        </div>
        <div v-if="!transparent" style="height:64px;"></div>
    </div>
</template>
<script>
export default {
    props: {
        transparent: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: "资讯"
        }
    }
}
</script>
<style lang="less">
@import "./../assets/css/common.less";
.head {
    position: fixed;
    z-index: 99;
    display: flex;
    width: 100%;
    height: 64px;
    line-height: 44px;
    padding-top: 20px;
    background: @info;
    &.transparent {
        background: transparent;
    }
    .text-color15;
    .head-back {
        width: 30px;
        background: url(./../assets/img/导航栏-返回.png) no-repeat center;
        background-size: 9px 17px;
    }
    .head-search {
        width: 30px;
        margin-right: 8px;
        background: url(./../assets/img/导航栏-搜搜.png) no-repeat center;
        background-size: 17px 17px;
    }
    .head-title {
        flex: 1;
        text-align: center;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        word-break: break-all;
        .font-24;
        .text-color15;
    }
    .head-kefu {
        width: 30px;
        background: url(./../assets/img/导航栏-客服.png) no-repeat center;
        background-size: 17px 18px;
    }
    .head-msg {
        width: 38px;
        background: url(./../assets/img/导航栏-短信.png) no-repeat center;
        background-size: 17px 14px;
    }
}
</style>
