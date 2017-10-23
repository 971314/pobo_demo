<template>
    <div class="full-height">
        <!-- <ui-head title="培训信息"></ui-head> -->
        <common-nav>
            <div slot="body">
                培训信息
            </div>
        </common-nav>
        <div class="container">
            <ui-carousel :carousels="carousels"></ui-carousel>
            <div>
                <mt-cell title="会议活动" :to="{name:'meetingList',query:{active:codes.hyhd}}" is-link value="更多">
                    <span class="hyhd" slot="icon"></span>
                </mt-cell>
                <div class="hr"></div>
                <div class="hy-list flex bg-color22 font-23 text-color17" style="height: 25px;">
                    <div>地点</div>
                    <div>时间</div>
                    <div>嘉宾</div>
                    <div class="zt">
                        <div class="ellipsis">
                            主题
                        </div>
                    </div>
                    <div>报名</div>
                </div>
                <div class="hy-list flex font-23 text-color18" v-for="l in list1">
                    <div>{{l.authordep}}</div>
                    <div>{{l.occurdate | dateFmt('MM/dd')}}
                        <br>{{l.occurdate | getWeek('周')}}</div>
                    <div>{{l.author}}</div>
                    <div class="zt">
                        <div class="ellipsis">
                            {{l.infotitle}}
                        </div>
                    </div>
                    <router-link tag="div" :to="{name:'signUp',query:{infoid:l.id,info:l.infotitle}}" class="bm"></router-link >
                </div>
            </div>
            <div class="hr-10"></div>
            <div>
                <mt-cell title="市场活动" :to="{name:'meetingList',query:{active:codes.schd}}" is-link value="更多">
                    <span class="hyhg" slot="icon"></span>
                </mt-cell>
                <div class="hr"></div>
                <div class="sc-list" v-for="l in list2">
                    <div class="sc-img">
                        <img :src="l.imageid">
                    </div>
                    <div class="sc-info">
                        <div style="padding:5px;">
                            <div class="ellipsis font-10 text-color18">
                                {{l.infotitle}}
                            </div>
                            <div class="ellipsis font-13 text-color17">
                                {{l.occurdate | dateFmt('MM/dd')}}-{{l.occurdate | dateFmt('MM/dd')}}
                            </div>
                        </div>
                    </div>
                    <div class="sc-state text-color2">
                        进行中
                    </div>
                </div>
            </div>
            <div class="hr-10"></div>
            <div>
                <mt-cell title="会议回顾" value="更多">
                    <span class="hyhg" slot="icon"></span>
                </mt-cell>
                <div class="hr"></div>
                <ui-infos :infos="infos"></ui-infos>
            </div>
        </div>
    </div>
</template>
<script>
import {
    codes,
    parts
} from "./../common/config/constants.js";
import uiInfos from "./../components/uiInfos.vue";
import uiCarousel from "./../components/uiCarousel.vue";
export default {
    components: {
        "ui-infos": uiInfos,
        "ui-carousel": uiCarousel
    },
    data() {
        return {
            carousels:[],
            list1: [],
            list2: [],
            infos: [],
            codes: codes
        }
    },
    created() {
        this.$post("newsBase", {
            pageNo: 1,
            pageSize: 100,
            tags: null,
            part: parts.pbpxxxgg.part
        }).then(res => {
            for(let r of res.results){
                this.carousels.push({
                    name:r.imageid
                });
            }
        });
        this.$post("meetingList", {
            pageNo: 1,
            pageSize: 3,
            needCount: 0,
            codes: [codes.hyhd.code]
        }).then(res => {
            this.list1 = res.results;
        });
        this.$post("meetingList", {
            pageNo: 1,
            pageSize: 3,
            needCount: 0,
            codes: [codes.schd.code]
        }).then(res => {
            this.list2 = res.results;
        });
        this.$post("newsBase", {
            pageNo: 1,
            pageSize: 100,
            tags: null,
            part: parts.pbhyhg.part
        }).then(res => {
            this.infos = res.results;
        });
    }
}
</script>
<style lang="less">
@import "./../assets/css/common.less";
.hyhd,
.hyhg {
    display: inline-block;
    width: 10px;
    height: 8px;
    background: no-repeat center;
    background-size: 8px;
}

.hyhd {
    background-image: url(./../assets/img/b-会议活动.png);
}

.hyhg {
    background-image: url(./../assets/img/b-会议回顾.png);
}

.hy-list {
    border-bottom: 1px solid @hr;
    height: 38px;
    >div {
        width: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        &.zt {
            flex: 1;
            position: relative;
            text-align: left;
            >div {
                position: absolute;
                width: 100%;
            }
        }
        &.bm {
            // background: url();
        }
    }
}

.sc-list {
    display: flex;
    border-bottom: 1px solid @hr;
    height: 50px;
    .sc-img {
        padding: 5px 10px;
        >img {
            height: 100%;
        }
    }
    .sc-info {
        flex: 1;
        position: relative;
        text-align: left;
        >div {
            position: absolute;
            width: 100%;
        }
    }
    .sc-state {
        width: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        .font-26;
        padding-right: 10px;
    }
}
</style>
