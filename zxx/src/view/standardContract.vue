<template>
    <div class="full-height">
        <!-- <ui-head title="标准合约"></ui-head> -->
        <common-nav>
            <div slot="body">
                标准合约
            </div>
        </common-nav>
        <div class="container">
            <div class="flex">
                <div class="hyxz">合约选择</div>
                <div class="flex-1">
                    <div class="select-group" style="padding:10px">
                        <div class="select" :class="{'active':showFuturesExchanges}" @click="showFuturesExchanges = !showFuturesExchanges">
                            <div class="select-value" v-text="futuresExchange.exchName"></div>
                            <div class="select-options">
                                <div class="option" :class="{'active':f.exchId == futuresExchange.exchId}" v-for="f in futuresExchanges" v-text="f.exchName" @click="selectFuturesExchange(f)"></div>
                            </div>
                        </div>
                        <div class="select" :class="{'active':showFuturesVaritys}" @click="showFuturesVaritys = !showFuturesVaritys">
                            <div class="select-value" v-text="futuresVarity.chnName"></div>
                            <div class="select-options">
                                <div class="option" :class="{'active':f.varityCode == futuresVarity.varityCode}" v-for="f in futuresVaritys" v-text="f.chnName" @click="selectFuturesVarity(f)"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="contract-title">
                基金信息
            </div>
            <div class="contract-line">
                <label>品种</label>
                <div>{{info.kind}}</div>
            </div>
            <div class="contract-line">
                <label>代码</label>
                <div>{{info.contractCode}}</div>
            </div>
            <div class="contract-line">
                <label>交易所</label>
                <div>{{info.market}}</div>
            </div>
            <div class="contract-line">
                <label>合约单位</label>
                <div>{{info.contractUnit}}</div>
            </div>
            <div class="contract-line">
                <label>最小变动价位</label>
                <div>{{info.step}}</div>
            </div>
            <div class="contract-line">
                <label>最大下单手数</label>
                <div>{{info.maxUnit}}</div>
            </div>
            <div class="contract-line">
                <label>最后交易日</label>
                <div>{{info.endDate}}</div>
            </div>
            <div class="contract-line">
                <label>交易时间</label>
                <div>
                    夜盘：21：00-1：00
                    <br> 白盘：9：00-10：15 10：30-11：30 13：30-15：00
                    <br>
                </div>
            </div>
            <div class="contract-line">
                <label>最后交易日
                    <br>交易时间</label>
                <div>{{info.endDate}}</div>
            </div>
            <div class="contract-line">
                <label>交割月交易单位</label>
                <div>{{info.deliveryUnit}}</div>
            </div>
            <div class="contract-title">
                保证金
            </div>
            <div class="contract-line">
                <label>合约挂牌之日起</label>
                <div>{{info.cash}}</div>
            </div>
            <div class="contract-line">
                <label>交割月前一月第
                    <br>一个交易日起</label>
                <div>交易月前一个月第一个交易日起：
                    <br>{{info.preCash}}（+1%）</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'demoComponent',
    data() {
        return {
            futuresExchange: {},
            futuresExchanges: [],
            showFuturesExchanges: false,
            futuresVarity: {},
            futuresVaritys: [],
            showFuturesVaritys: false,
            info: {}
        }
    },
    created() {
        this.queryAllFuturesExchange();
    },
    methods: {
        queryAllFuturesExchange() {
            this.$get([1, "queryAllFuturesExchange"]).then(res => {
                this.futuresExchanges = res;
                this.selectFuturesExchange(res[0]);
            });
        },
        selectFuturesExchange(f) {
            this.futuresExchange = f;
            this.futuresVarity = {};
            this.$get([1, "queryFuturesVarityByExchId"], this.futuresExchange.exchId).then(res => {
                this.futuresVaritys = res;
                this.selectFuturesVarity(res[0]);
            });
        },
        selectFuturesVarity(f) {
            this.futuresVarity = f;
            this.query();
        },
        query() {
            this.info = {};
            this.$post("f10Info", {}, this.futuresExchange.exchId + "/" + this.futuresVarity.varityCode).then(res => {
                this.info = res;
            });
        }
    }
}
</script>
<style lang="less">
@import "./../assets/css/common.less";
.hyxz {
    line-height: 45px;
    padding-left: 10px;
}

.contract-title {
    height: 30px;
    text-align: center;
    line-height: 30px;
    background: #ececec;
    .font-10;
    .text-color18;
}

.contract-line {
    display: flex;
    min-height: 30px;
    border-bottom: 1px solid @color23;
    >label {
        width: 120px;
        padding: 5px 0 5px 10px;
        border-right: 1px solid @color23;
        .font-23;
        .text-color17;
    }
    >div {
        flex: 1;
        padding: 5px 0 5px 10px;
        .font-23;
        .text-color18;
    }
}
</style>
