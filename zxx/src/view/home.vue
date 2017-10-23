<template>
    <div class="full-height">
        <!-- <ui-head title="菜单"></ui-head> -->
        <common-nav>
            <div slot="body">
                菜单
            </div>
        </common-nav>
        <div class="container">
            <router-link :to="{name:'institution'}">机构动向</router-link>
            <br>
            <router-link :to="{name:'meeting'}">培训信息</router-link>
            <br>
            <router-link :to="{name:'informationList'}">资讯</router-link>
            <br>
            <router-link :to="{name:'standardContract'}">标准合约</router-link>
            <br>
            <router-link :to="{name:'mapList'}">网点查询</router-link>
            <br>
            <router-link :to="{name:'marginComputed'}">保证金计算</router-link>
            <br>
            <router-link :to="{name:'incomeComputed'}">收益计算</router-link>
            <br>
            <router-link :to="{name:'nationalDebt'}">国债收益</router-link>
            <br>
            <router-link :to="{name:'tradeCalendar'}">交易日历</router-link>
            <br>
            <router-link :to="{name:'inventory'}">仓单库存</router-link>
            <br>
            <router-link :to="{name:'companyIntroduce'}">走进中信建投</router-link>
        </div>
    </div>
</template>
<script>
export default {
    components: {
        
    },
    data() {
        return {
            carousels: [],
        }
    },
    created() {

    },
    methods: {

    }
}
</script>
<style lang="less">
@import "./../assets/css/common.less";
</style>
