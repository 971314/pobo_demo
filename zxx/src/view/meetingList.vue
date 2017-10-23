<template>
    <div class="full-height">
        <!-- <ui-head :title="active.name"></ui-head> -->
        <common-nav>
            <div slot="body">
                {{active.name}}
            </div>
        </common-nav>
        <div class="container" v-infinite-scroll="query" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
            <template v-if="active.code == codes.hyhd.code">
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
                <div class="hy-list flex font-23 text-color18" v-for="l in list">
                    <div>{{l.authordep}}</div>
                    <div>{{l.occurdate | dateFmt('MM/dd')}}
                        <br>{{l.occurdate | getWeek('周')}}</div>
                    <div>{{l.author}}</div>
                    <div class="zt">
                        <div class="ellipsis">
                            {{l.infotitle}}
                        </div>
                    </div>
                    <div class="bm"></div>
                </div>
            </template>
            <template v-if="active.code == codes.schd.code">
                <div class="sc-list" v-for="l in list">
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
            </template>
        </div>
    </div>
</template>
<script>
import {
    codes
} from "./../common/config/constants.js";
export default {
    data() {
            return {
                active: this.$route.query.active,
                list: [],
                pageNo: 0,
                loading: false,
                noMore: false,
                codes: codes
            }
        },
        methods: {
            query() {
                this.loading = true;
                if (this.noMore) {
                    return this.$toast("没有更多了");
                }
                this.$post("meetingList", {
                    pageNo: 1,
                    pageSize: this.pageSize,
                    needCount: 0,
                    codes: [this.active.code]
                }).then(res => {
                    this.loading = false;
                    if (this.pageSize > res.results.length) {
                        this.noMore = true;
                    }
                    for (let r of res.results) {
                        this.list.push(r);
                    }
                })
            }
        }
}
</script>
<style lang="less">
@import "./../assets/css/common.less";
</style>
