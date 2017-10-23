<template>
    <div class="full-height">
        <!-- <ui-head title="仓单库存"></ui-head> -->
        <common-nav :goBack="true">
            <div slot="body">
                <span @click="showBase = !showBase">仓单库存&nbsp;&nbsp;<img src="./../assets/img/b-下拉选择.png" height="8" width="14"></span>
            </div>
        </common-nav>
        <ui-drop-menu name="仓单库存" :showBase="showBase" v-model="showBase"></ui-drop-menu>
        <div class="container">
            <div class="share">
                <div style="display:inline-block;">
                    <div class="select-group" style="width:250px;">
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
                <span class="btn-share"></span>
            </div>
            <div ref="chart" style="height:300px"></div>
            <div class="hr-border-10"></div>
            <div class="btn-tabs tab-color">
                <div class="tabs" :class="{'active':part == parts.pbxgxw.part}" @click="queryNewsType(parts.pbxgxw.part)">
                    <button>相关新闻</button>
                </div>
                <div class="tabs" :class="{'active':part == parts.pbpzyb.part}" @click="queryNewsType(parts.pbpzyb.part)">
                    <button>品种研报</button>
                </div>
                <div class="tabs" :class="{'active':part == parts.pbgjscgg.part}" @click="queryNewsType(parts.pbgjscgg.part)">
                    <button>市场公告</button>
                </div>
            </div>
            <div class="hr"></div>
            <ui-infos :infos="news"></ui-infos>
        </div>
    </div>
</template>
<script>
import moment from "moment";
import echarts from "echarts";
import uiInfos from "./../components/uiInfos.vue";
import uiDropMenu from "./../components/uiDropMenu.vue";
import {
    parts
} from "./../common/config/constants.js";
export default {
    components: {
        "ui-infos": uiInfos,
        "ui-drop-menu": uiDropMenu
    },
    data() {
        return {
            showBase: false,
            part: '',
            parts: parts,
            news: [],
            futuresExchange: {},
            futuresExchanges: [],
            showFuturesExchanges: false,
            futuresVarity: {},
            futuresVaritys: [],
            showFuturesVaritys: false,
            myCharts: null,
            basicOption: {
                title: {
                    left: "center",
                    // text: "中信建投 铜合约持仓量走势图"
                },
                color: ['#87c46c', '#5689ed'],
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    x: 'left',
                    top: "-8%",
                    padding: [30, 30, 30, 30],
                    data: ['库存', '增减'],
                    selected: {
                        '库存': true,
                        '增减': true
                    }
                },
                grid: {
                    left: '10',
                    right: '20',
                    bottom: '10',
                    top: '10%',
                    containLabel: true
                },
                xAxis: {
                    type: 'time',
                    boundaryGap: false,
                    splitLine: { //网格线
                        show: true,
                        lineStyle: {
                            color: ['#b1b1b1'],
                            type: 'solid'
                        }
                    }
                },
                yAxis: [{
                    type: "value",
                    splitLine: { //网格线
                        show: true,
                        lineStyle: {
                            color: ['#b1b1b1'],
                            type: 'solid'
                        }
                    }
                }, {
                    type: "value",
                    splitLine: { //网格线
                        show: true,
                        lineStyle: {
                            color: ['#b1b1b1'],
                            type: 'solid'
                        }
                    }
                }],
                series: [{
                    name: '库存',
                    type: 'line',
                    symbol: 'none',
                    yAxisIndex: 0,
                    areaStyle: {
                        normal: {
                            color: "#d9edd0"
                        }
                    },
                }, {
                    name: '增减',
                    type: 'line',
                    symbol: 'none',
                    yAxisIndex: 1
                }]
            }
        }
    },
    created() {
        this.part = this.parts.pbxgxw.part;
        this.queryNewsType(this.part);
        this.queryAllFuturesExchange();
    },
    mounted() {
        this.myCharts = echarts.init(this.$refs.chart);
        this.myCharts.setOption(this.basicOption);
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
            this.setOption();
        },
        setOption() {
            this.$get([1, "queryInventoryWeekShTop"], this.futuresVarity.varityCode + "/12").then(res => {
                let series = [{
                    data: []
                }, {
                    data: []
                }];
                for (let i = 0; i < res.length; i++) {
                    series[0].data.push([moment(res[i].tradeDate, "YYYYMMDD").format("YYYY-MM-DD"), res[i].f6]);
                    series[1].data.push([moment(res[i].tradeDate, "YYYYMMDD").format("YYYY-MM-DD"), res[i].f8]);
                }
                this.myCharts.setOption({
                    series: series
                });
            });
        },
        queryNewsType(part) {
            this.part = part;
            this.$post("newsBase", {
                pageNo: 1,
                pageSize: this.pageSize,
                tags: null,
                part: part
            }).then(res => {
                this.news = res.results;
            });
        }
    }
}
</script>
<style lang="less">
@import "./../assets/css/common.less";
</style>
