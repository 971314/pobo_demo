<template>
    <div>
        <router-link :to="{name:'detail',query:{cId:info.id}}" tag="div" class="list" v-for="info in infos">
            <div class="list-info">
                <div class="info-title" v-text="info.infotitle"></div>
                <div class="info-more"><span v-text="info.source"></span> {{info.pushdate | dateFmt('MM-dd hh:mm')}}</div>
            </div>
            <div class="list-img">
                <img>
            </div>
        </router-link>
    </div>
</template>
<script>
export default {
    props: {
        infos: {
            type: Array,
            default: []
        }
    }
}
</script>
<style lang="less">
@import "./../assets/css/common.less";
.list {
    display: flex;
    padding: 10px 10px;
    height: 83px;
    border-bottom: 1px solid @hr;
    .list-info {
        flex: 1;
        .info-title {
            height: 42px;
            line-height: 1.5;
            margin-top: 2px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            .font-26;
            .text-color18;
        }
        .info-more {
            margin-top: 2px;
            .font-14;
            .text-color17;
        }
    }
    .list-img {
        width: 102px;
        img {
            display: block;
            width: 92px;
            height: 63px;
            margin-left: 10px;
        }
    }
}
</style>
