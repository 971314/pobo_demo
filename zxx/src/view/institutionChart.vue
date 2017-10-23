<template>
    <div class="full-height">
        <!-- <ui-head title="机构动向"></ui-head> -->
        <common-nav>
            <div slot="body">
                机构动向
            </div>
        </common-nav>
        <div class="container">
            <div class="share">
                <div class="select-group" style="display:inline-block;">
                    <div class="select" :class="{'active':showOptions}" style="width:100px;" @click="showOptions = !showOptions">
                        <div class="select-value" v-text="tradeDate.name"></div>
                        <div class="select-options">
                            <div v-for="t in tradeDates" class="option" :class="{'active':tradeDate.value == t.value}" v-text="t.name" @click="selectDate(t)"></div>
                        </div>
                    </div>
                </div>
                <span class="btn-share"></span>
            </div>
            <div v-for="chart in charts" :ref="chart" style="height:300px"></div>
        </div>
    </div>
</template>
<script>
import moment from "moment";
import echarts from "echarts";
export default {
    data() {
            return {
                showOptions: false,
                memberId: this.$route.query.memberId,
                tickerCode: this.$route.query.tickerCode,
                typeId: this.$route.query.typeId,
                tradeDate: {},
                tradeDates: [{
                    name: "最近一周",
                    value: 7
                }, {
                    name: "最近一个月",
                    value: 30
                }, {
                    name: "最近三个月",
                    value: 90
                }],
                charts: ["c1", "c2", "c3"],
                myCharts: []
            }
        },
        created() {
            this.basicOption = {
                title: {
                    left: "center",
                    // text: "中信建投 铜合约持仓量走势图"
                },
                color: ['#9bd183', '#fe1b1b', '#2868e8'],
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    x: 'left',
                    padding: [30, 30, 30, 30],
                    data: ['多持', '空持', '净头寸'],
                    selected: {
                        '多持': true,
                        '空持': true,
                        '净头寸': true
                    }
                },
                grid: {
                    left: '10',
                    right: '20',
                    bottom: '0',
                    top: '18%',
                    containLabel: true
                },
                xAxis: {
                    type: 'time',
                    boundaryGap: false,
                    splitLine: { //网格线
                        show: true,
                        lineStyle: {
                            color: ['#b1b1b1'],
                            type: 'dashed'
                        }
                    }
                },
                yAxis: {
                    type: "value",
                    splitLine: { //网格线
                        show: true,
                        lineStyle: {
                            color: ['#b1b1b1'],
                            type: 'dashed'
                        }
                    }
                },
                series: [{
                    name: '多持',
                    type: 'line',
                    symbol: 'none'
                }, {
                    name: '空持',
                    type: 'line',
                    symbol: 'none'
                }, {
                    name: '净头寸',
                    type: 'line',
                    symbol: 'none'
                }]
            };
        },
        mounted() {
            for (let i = 0; i < this.charts.length; i++) {
                this.myCharts[i] = echarts.init(this.$refs[this.charts[i]][0]);
                this.myCharts[i].showLoading();
                this.myCharts[i].setOption(this.basicOption);

            }
            this.setOption();
            this.selectDate(this.tradeDates[0]);
        },
        methods: {
            selectDate(tradeDate) {
                if (this.tradeDate.value == tradeDate.value) {
                    return;
                }
                this.tradeDate = tradeDate;
                this.setOption();
            },
            setOption() {
                this.$post([1, "lineChart"], {
                    memberId: this.memberId / 1,
                    tickerCode: this.tickerCode,
                    typeId: this.typeId / 1,
                    tradeDate: this.tradeDate.value
                }).then(res => {
                    for (let i = 0; i < res.length; i++) {
                        let series = [];
                        for (let j = 0; j < res[i].length; j++) {
                            let data = [];
                            for (let k = 0; k < res[i][j].length; k++) {
                                data.push([moment(res[i][j][k].tradeDate, "YYYYMMDD").format("YYYY-MM-DD"), res[i][j][k].volume]);
                            }
                            series[j] = {
                                data: data
                            }
                        }
                        this.myCharts[i].setOption({
                            series: series
                        });
                        this.myCharts[i].hideLoading();
                    }
                });
                // this.$http.get("static/json.json").then(r => {
                //     let res = r.body.data;
                //     for (let i = 0; i < res.length; i++) {
                //         let series = [];
                //         for (let j = 0; j < res[i].length; j++) {
                //             let data = [];
                //             for (let k = 0; k < res[i][j].length; k++) {
                //                 data.push([moment(res[i][j][k].tradeDate, "YYYYMMDD").format("YYYY-MM-DD"), res[i][j][k].volume]);
                //             }
                //             series[j] = {
                //                 data: data
                //             }
                //         }
                //         this.myCharts[i].setOption({
                //             series: series
                //         });
                //     }
                // });
            }
        }
}
</script>
<style lang="less">
@import "./../assets/css/common.less";
</style>
