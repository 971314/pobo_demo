<template>
    <div class="full-height">
        <!-- <ui-head title="选择公司"></ui-head> -->
        <common-nav>
            <div slot="body">
                选择公司
            </div>
        </common-nav>
        <div class="container">
            <div class="k-search" :class="{'active':keyworld}">
                <input type="text" v-model="keyworld">
            </div>
            <mt-index-list>
                <mt-index-section :index="k" v-for="(vs,k) in companys">
                    <mt-cell :title="v.memberName" v-for="v in vs" :href="'#/institution?companyid='+v.memberId+'&companyname='+v.memberName"></mt-cell>
                </mt-index-section>
            </mt-index-list>
        </div>
    </div>
</template>
<script>
export default {
    data() {
            return {
                keyworld: '',
                cs: {}
            }
        },
        created() {
            this.$get([1, "queryFuturesMember"], -1).then(res => {
                this.cs = res;
            });
        },
        computed: {
            companys() {
                let cs = {};
                for (let k in this.cs) {
                    let v = _.filter(this.cs[k], (c) => {
                        return c.memberName.match(this.keyworld);
                    })
                    if (v.length != 0) {
                        cs[k] = v;
                    }
                }
                return cs;
            }
        }
}
</script>
<style lang="less">
@import "./../assets/css/common.less";
.k-search {
    position: relative;
    height: 44px;
    padding: 8px 10px;
    background: #dedede;
    input {
        width: 100%;
        height: 100%;
        background: #fff;
        border-radius: 5px;
        padding-left: 32px;
        .font-10;
        .text-color18;
    }
    &:after {
        content: "搜索";
        position: absolute;
        width: 34px;
        height: 28px;
        line-height: 28px;
        left: 50%;
        margin-left: -17px;
        padding-left: 24px;
        background: url(./../assets/img/搜索-默认.png) no-repeat 0 center;
        background-size: 16px 16px;
        .font-10;
        .text-color47;
    }
    &.active,
    &:hover {
        &:after {
            content: "";
            width: 32px;
            left: 8px;
            margin-left: 0;
            padding-left: 0;
            background-position: center;
        }
    }
}
</style>
