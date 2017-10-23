<template>
    <div class="full-height">
        <!-- <ui-head title="详情"></ui-head> -->
        <common-nav>
            <div slot="body">
                详情
            </div>
        </common-nav>
        <div class="container">
            <div class="detail">
                <div class="detail-title" v-text="detail.infotitle"></div>
                <div class="detail-info">
                    <div class="detail-info-text">{{detail.source}} {{detail.pushdate | dateFmt('MM-dd hh:mm')}}</div>
                    <div class="detail-btn-text" @click="show = ! show"></div>
                </div>
                <div class="detail-html" v-html="reHtml" :style="{fontSize:size+'px'}"></div>
            </div>
            <div class="operate">
                <div class="sc">
                    <button>收藏</button>
                </div>
                <div class="zan">
                    <button>51</button>
                </div>
                <div class="fx">
                    <a :href="'pobo:pageId=800012&type=0&url='+share+'&title='+detail.infotitle +'&des='+detail.infotitle"></a>
                </div>
            </div>
        </div>
        <transition name="bottom-transition">
            <div v-show="show" class="setting-font">
                <div class="setting-finsh">
                    <button @click="show = false">完成</button>
                </div>
                <div class="font-size">
                    <button class="small" :class="{active:size == 11}" @click="changeSize(-2,11)">小</button>
                    <button class="middle" :class="{active:size == 14}" @click="changeSize(2,14)">中</button>
                    <button class="large" :class="{active:size == 17}" @click="changeSize(5,17)">大</button>
                </div>
        </transition>
        </div>
</template>
<script>
import {
    shareUrl
} from "./../common/config/constants.js";
export default {
    data() {
            return {
                share: "",
                show: false,
                size: "14",
                cId: this.$route.query.cId,
                detail: {},
                reHtml: ''
            }
        },
        created() {
            this.share = this.$encodeURI(shareUrl + this.$route.fullPath);
            this.$get("newsDetail", this.cId).then(res => {
                this.detail = res;
                this.reHtml = this.detail.infoDetail ? this.detail.infoDetail.content : "";
            });
        },
        methods: {
            changeSize(size1, size2) {
                this.show = false;
                this.size = size2;
                this.reHtml = this.detail.infoDetail.cContent.replace(/font-size:(\d{1,2})px/g, function(m, $1) {
                    return 'font-size:' + ($1 / 1 + size1) + 'px';
                });
            }
        }
}
</script>
<style lang="less">
@import "./../assets/css/common.less";
.detail {
    padding: 0 10px;
    .detail-title {
        padding: 5px 0;
        .font-34;
        .text-color18;
    }
    .detail-info {
        display: flex;
        .font-14;
        .text-color18;
        .detail-info-text {
            flex: 1;
        }
        .detail-btn-text {
            width: 25px;
            height: 25px;
            background: url(./../assets/img/字体-默认.png) no-repeat right center;
            background-size: 15px 15px;
            &:active {
                background-image: url(./../assets/img/字体-@2x.png);
            }
        }
    }
    .detail-html {
        padding-bottom: 38px;
    }
}

.operate {
    display: flex;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 37px;
    padding: 0 10px;
    border-top: 1px solid @color47;
    background: @color15;
    .sc {
        flex: 1;
        button {
            height: 37px;
            padding-left: 20px;
            background: url(./../assets/img/收藏-默认.png) no-repeat 0 center;
            background-size: 17.5px 15px;
            &.active {
                background-image: url(./../assets/img/收藏-选中.png);
            }
        }
    }
    .zan {
        button {
            height: 37px;
            padding-left: 20px;
            padding-right: 10px;
            background: url(./../assets/img/赞-默认.png) no-repeat 0 9px;
            background-size: 16.5px 16.5px;
            &.active {
                background-image: url(./../assets/img/赞--选中.png);
            }
        }
    }
    .fx {
        a {
            display: inline-block;
            width: 16.5px;
            height: 37px;
            background: url(./../assets/img/转发-默认.png) no-repeat 0 center;
            background-size: 16.5px 15px;
            &.active {
                background-image: url(./../assets/img/转发-选中.png);
            }
        }
    }
}

.setting-font {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    .setting-finsh {
        height: 37px;
        background: #eff0f1;
        text-align: right;
        button {
            height: 100%;
        }
    }
    .font-size {
        button {
            height: 30px;
            width: 100%;
            background: #d0d2d7;
            border-bottom: 1px solid @color23;
            .text-color18;
            &:last-child {
                border-bottom: none;
            }
            &.small {
                .font-13;
            }
            &.middle {
                .font-26;
            }
            &.large {
                .font-24;
            }
            &.active {
                .text-color2;
            }
        }
    }
}

.bottom-transition-enter,
.bottom-transition-leave-active {
    bottom: -100%;
}

.bottom-transition-enter-active,
.bottom-transition-leave-active {
    // transition: bottom 1s;
    transition: bottom .5s;
}
</style>
