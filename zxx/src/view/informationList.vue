<template>
    <div class="full-height">
        <!-- <ui-head title="建投优选"></ui-head> -->
        <common-nav>
            <common-nav :goback="false" class="indNews">
                <ul slot="body" style="line-height: 44px;">
                    <li class='ventor active' onclick="window.location.href='indNews/index.html'">
                        <span>建投优选</span>
                    </li><li class='ventor'>
                        <span>行业资讯</span>
                    </li>
                </ul>
            </common-nav>
        </common-nav>
        <div class="container" v-infinite-scroll="query" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
            <div class="btn-tabs tab-no-divide">
                <div class="tabs" :class="{'active':show == parts.pbcjyw.part}" @click="change(parts.pbcjyw.part)">
                    <button>财经要闻</button>
                </div>
                <div class="tabs" :class="{'active':show == parts.pbyfbg.part}" @click="change(parts.pbyfbg.part)">
                    <button>研发报告</button>
                </div>
                <div class="tabs" :class="{'active':show == parts.pbzxrdjd.part}" @click="change(parts.pbzxrdjd.part)">
                    <button>热点解读</button>
                </div>
                <div class="tabs" :class="{'active':show == parts.pbmrzp.part}" @click="change(parts.pbmrzp.part)">
                    <button>每日早评</button>
                </div>
            </div>
            <div class="hr-border-10"></div>
            <ui-infos :infos="infos"></ui-infos>
        </div>
    </div>
</template>
<script>
import uiInfos from "./../components/uiInfos.vue";
import {
    parts
} from "./../common/config/constants.js";
export default {
    components: {
        "ui-infos": uiInfos
    },
    data() {
        return {
            parts: parts,
            show: parts.pbcjyw.part,
            pageNo: 0,
            infos: [],
            loading: false,
            noMore: false
        }
    },
    methods: {
        change(e) {
            this.noMore = false;
            this.loading = false;
            this.show = e;

            this.infos = [];
            this.pageNo = 0;
            this.query();
        },
        query() {
            this.loading = true;
            if (this.noMore) {
                return this.$toast("没有更多了");
            }
            this.pageNo++;
            this.$post("newsBase", {
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                tags: null,
                part: this.show
            }).then(res => {
                for (let r of res.results) {
                    this.infos.push(r);
                }
                if (res.results.length < this.pageSize) {
                    this.noMore = true;
                }
                this.loading = false;
            });
        }
    }
}
</script>
<style lang="less">
@import "./../assets/css/common.less";
.indNews ul {
    list-style: none;
}

.indNews .ventor {
    display: inline-block;
    cursor: pointer;
    font-size: 16px;
    width: 50%;
    line-height: 30px;
    font-size: 15px;
    border: 1px solid #fff;
    border-radius: 2px;
}

.indNews .active,
.indNews .ventor:hover {
    color: #eb2121;
    background: #fff;
}

.indNews ul li:first-child {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}

.indNews ul li:last-child {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}
</style>
