<template>
    <div class="full-height bg-color22">
        <!-- <ui-head title="走进中信建投"></ui-head> -->
        <common-nav>
            <div slot="body">
                走进中信建投
            </div>
        </common-nav>
        <div class="container">
            <div class="btn-tabs">
                <div class="tabs" :class="{'active':show == 1}">
                    <button @click="show = 1">公司简介</button>
                </div>
                <div class="tabs" :class="{'active':show == 2}">
                    <button @click="show = 2">人才招聘</button>
                </div>
            </div>
            <div class="hr"></div>
            <div v-show="show == 1">
                <template v-if="company.showType != 'FROM'">
                    <div v-html="company.content"></div>
                    <div class="company-info">
                        <img class="ewm" :src="company.company">
                        <div>邮箱：{{company.mail}}</div>
                        <div>电话：{{company.phone}}</div>
                    </div>
                </template>
                <template v-else>
                    <iframe :src="company.url"></iframe>
                </template>
            </div>
            <div v-show="show == 2">
                <ui-infos :infos="infos"></ui-infos>
            </div>
        </div>
    </div>
</template>
<script>
import {
    parts
} from "./../common/config/constants.js";
import uiInfos from "./../components/uiInfos.vue";
export default {
    components: {
        "ui-infos": uiInfos
    },
    data() {
        return {
            show: 1,
            company: {},
            infos: []
        }
    },
    created() {
        this.$get("getCompany", "BRIEF_INFO").then(res => {
            this.company = res;
        });
        this.$post("newsBase", {
            pageNo: 1,
            pageSize: 100,
            tags: null,
            part: parts.pbrczp.part
        }).then(res => {
            this.infos = res.results;
        });
    }
}
</script>
<style lang="less">
@import "./../assets/css/common.less";
.company-info {
    text-align: center;
    img {
        margin: 10px auto;
        width: 100px;
        height: 100px;
    }
}
</style>
