<template>
    <div class="full-height">
        <!-- <ui-head title="机构动向"></ui-head> -->
        <!-- <common-nav>
            <div slot="body">
                机构动向
            </div>
        </common-nav> -->
        <common-nav :goBack="true">
            <div slot="body">
                <span @click="showBase = !showBase">机构动向&nbsp;&nbsp;<img src="./../assets/img/b-下拉选择.png" height="8" width="14"></span>
            </div>
        </common-nav>
        <ui-drop-menu name="机构动向" :showBase="showBase" v-model="showBase"></ui-drop-menu>
        <div class="container">
            <div class="share">最新更新时间：<span>{{date | dateFmt('yyyy-MM-dd hh:mm:ss')}}</span><span class="btn-share"></span></div>
            <div class="btn-group" style="padding :0 10px">
                <button :class="{'active':show}" @click="initType">选择品种</button>
                <router-link tag="button" :class="{'active':!show}" to="checkCompany">{{show?'选择公司':companyname}}</router-link>
            </div>
            <div v-show="show" class="select-group" style="padding:10px">
                <div class="select" :class="{'active':showFuturesExchanges}" style="width:140px;" @click="showFuturesExchanges = !showFuturesExchanges">
                    <div class="select-value" v-text="futuresExchange.exchName"></div>
                    <div class="select-options">
                        <div class="option" :class="{'active':f.exchId == futuresExchange.exchId}" v-for="f in futuresExchanges" v-text="f.exchName" @click="selectFuturesExchange(f)"></div>
                    </div>
                </div>
                <div class="select" :class="{'active':showFuturesVaritys}" style="width:140px;" @click="showFuturesVaritys = !showFuturesVaritys">
                    <div class="select-value" v-text="futuresVarity.chnName"></div>
                    <div class="select-options">
                        <div class="option" :class="{'active':f.varityCode == futuresVarity.varityCode}" v-for="f in futuresVaritys" v-text="f.chnName" @click="selectFuturesVarity(f)"></div>
                    </div>
                </div>
                <div class="select" :class="{'active':showVarityCodes}" style="width:140px;" @click="showVarityCodes = !showVarityCodes">
                    <div class="select-value" v-text="varityCode"></div>
                    <div class="select-options">
                        <div class="option" :class="{'active':varityCode == v}" v-for="v in varityCodes" v-text="v" @click="selectVarityCode(v)"></div>
                    </div>
                </div>
            </div>
            <div v-if="!show" class="bg-color15" style="height:10px;"></div>
            <div class="hr-border-10"></div>
            <div class="btn-tabs">
                <div class="tabs" :class="{'active':typeId == 2}" @click="changeTypeId(2)">
                    <button>多头持仓</button>
                </div>
                <div class="tabs" :class="{'active':typeId == 3}" @click="changeTypeId(3)">
                    <button>空头持仓</button>
                </div>
                <div class="tabs" :class="{'active':typeId == 4}" @click="changeTypeId(4)">
                    <button>净持仓</button>
                </div>
            </div>
            <div class="hr-border-10"></div>
            <div v-show="show" class="table">
                <div class="tr font-23 text-color17" style="padding-left:10px;padding-right:10px;">
                    <div class="th th1">序号</div>
                    <div class="th">公司简介</div>
                    <template v-if="typeId == 2">
                        <div class="th text-right">多头持仓</div>
                        <div class="th text-right">多头增减</div>
                        <div class="th text-right">多头均价</div>
                    </template>
                    <template v-if="typeId == 3">
                        <div class="th text-right">空头持仓</div>
                        <div class="th text-right">空持增减</div>
                        <div class="th text-right">空头均价</div>
                    </template>
                    <template v-if="typeId == 4">
                        <div class="th text-right">净持仓</div>
                        <div class="th text-right">净增减</div>
                        <div class="th text-right">净均价</div>
                    </template>
                </div>
                <div class="tr font-26 text-color18" style="padding-left:10px;padding-right:10px;">
                    <div class="td td1 text-center"></div>
                    <div class="td text-center">中信建投</div>
                    <div class="td text-right text-color3">1808</div>
                    <div class="td text-right text-color2">-30</div>
                    <div class="td text-right">多头均价</div>
                </div>
                <div class="tr font-26 text-color18" v-for="(product,index) in productRanking" style="padding-left:10px;padding-right:10px;">
                    <div class="td td1 text-center" :class="index<3?'order'+index:'order'" v-text="index<3?'':index+1"></div>
                    <div class="td text-center" v-text="product.name"></div>
                    <div class="td text-right" v-text="product.volume">1808</div>
                    <div class="td text-right" :class="{'text-color2':product.change > 0,'text-color3':product.change < 0}" v-text="product.change">-30</div>
                    <div class="td text-right" v-text="product.priceAvg?product.priceAvg:'--'">多头均价</div>
                </div>
                <div class="show-more">点击显示全部</div>
            </div>
            <div v-show="!show" class="table">
                <div class="tr font-23 text-color17" style="padding-left:10px;padding-right:10px;">
                    <div style="width:30px"></div>
                    <div class="th">品种</div>
                    <template v-if="typeId == 2">
                        <div class="th text-right">多头持仓</div>
                        <div class="th text-right">多头增减</div>
                        <div class="th text-right">多头均价</div>
                    </template>
                    <template v-if="typeId == 3">
                        <div class="th text-right">空头持仓</div>
                        <div class="th text-right">空持增减</div>
                        <div class="th text-right">空头均价</div>
                    </template>
                    <template v-if="typeId == 4">
                        <div class="th text-right">净持仓</div>
                        <div class="th text-right">净增减</div>
                        <div class="th text-right">净均价</div>
                    </template>
                </div>
                <template v-for="product in productRankingByCompany">
                    <div class="tr font-26 text-color18" @click="showContractRanking(product)" style="padding-left:10px;padding-right:10px;">
                        <router-link tag="div" :to="{name:'institutionChart',query:{memberId:companyid,tickerCode:product.code,typeId:typeId}}" class="icon-tb"></router-link>
                        <div class="td text-center" v-text="product.name"></div>
                        <div class="td text-right" v-text="product.volume"></div>
                        <div class="td text-right" :class="{'text-color2':product.change > 0,'text-color3':product.change < 0}" v-text="product.change">-30</div>
                        <div class="td text-right" v-text="product.priceAvg?product.priceAvg:'--'"></div>
                    </div>
                    <div v-if="product.show" class="tr font-26 text-color18" style="background:#f9f9f9;padding-left:10px;padding-right:10px" v-for="c in product.contractRanking">
                        <div style="width:30px"></div>
                        <div class="td text-center" v-text="c.name"></div>
                        <div class="td text-right" v-text="c.volume"></div>
                        <div class="td text-right" :class="{'text-color2':c.change > 0,'text-color3':c.change < 0}" v-text="c.change">-30</div>
                        <div class="td text-right" v-text="c.priceAvg?c.priceAvg:'--'"></div>
                    </div>
                </template>
                <div class="show-more">点击显示全部</div>
            </div>
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
            date: new Date(),
            companyid: this.$route.query.companyid,
            companyname: this.$route.query.companyname,
            typeId: 2,
            news: [],
            futuresExchange: {},
            futuresExchanges: [],
            showFuturesExchanges: false,
            futuresVarity: {},
            futuresVaritys: [],
            showFuturesVaritys: false,
            varityCode: "",
            varityCodes: [],
            showVarityCodes: false,
            productRanking: [],
            productRanking: false,
            productRankingByCompany: [],
            productRankingByCompanyMore: false,
            part: '',
            parts: parts
        }
    },
    created() {
        this.part = this.parts.pbxgxw.part;
        this.queryNewsType(this.part);
        if (this.companyid) {
            this.initCompany();
        } else {
            this.initType();
        }
    },
    methods: {
        initType() {
            this.show = true;
            this.queryAllFuturesExchange();
        },
        initCompany() {
            this.show = false;
            this.productRankingByCompanyMore = false;
            this.$post([1, "queryProductRankingByCompanyId"], {
                pageNo: 1,
                pageSize: this.pageSize,
                needCount: 0,
                memberId: this.companyid / 1,
                typeId: this.typeId
            }).then(res => {
                this.date = new Date();
                this.productRankingByCompany = res.results;
                if (this.productRankingByCompany.length == this.pageSize) {
                    this.productRankingByCompanyMore = true;
                }
            });
        },
        changeTypeId(typeId) {
            if (this.typeId != typeId) {
                this.typeId = typeId;
                if (this.companyid) {
                    this.initCompany();
                } else {
                    if (this.futuresVarity && this.futuresVarity.varityCode) {
                        if (this.varityCode) {
                            this.queryContractRankingByFuturesCode();
                        } else {
                            this.queryProductRankingByTypeId();
                        }
                    }
                }
            }
        },
        queryAllFuturesExchange() {
            this.$get([1, "queryAllFuturesExchange"]).then(res => {
                this.futuresExchanges = res;
                this.selectFuturesExchange(this.futuresExchanges[0]);
            });
        },
        queryProductRankingByTypeId() {
            this.productRankingMore = false;
            this.$post([1, "queryProductRankingByTypeId"], {
                pageNo: 1,
                pageSize: this.pageSize,
                needCount: 0,
                tickerCode: this.futuresVarity.varityCode,
                typeId: this.typeId
            }).then(res => {
                this.date = new Date();
                this.productRanking = res.results;
                if (this.productRanking.length == this.pageSize) {
                    this.productRankingMore = true;
                }
            });
        },
        queryContractRankingByFuturesCode() {
            this.productRankingMore = false;
            this.$post([1, "queryContractRankingByFuturesCode"], {
                pageNo: 1,
                pageSize: this.pageSize,
                needCount: 0,
                tickerCode: this.varityCode,
                typeId: this.typeId
            }).then(res => {
                this.date = new Date();
                this.productRanking = res.results;
                if (this.productRanking.length == this.pageSize) {
                    this.productRankingMore = true;
                }
            });
        },
        selectFuturesExchange(f) {
            this.futuresExchange = f;
            this.futuresVarity = {};
            this.varityCode = "";
            this.$get([1, "queryFuturesVarityByExchId"], this.futuresExchange.exchId).then(res => {
                this.futuresVaritys = res;
                this.selectFuturesVarity(this.futuresVaritys[0]);
            });
        },
        selectFuturesVarity(f) {
            this.futuresVarity = f;
            this.varityCode = "";
            this.varityCodes = [];
            let date = new Date();
            for (let i = 0; i < 12; i++) {
                let year = date.getYear() - 100;
                let month = date.getMonth() + 1;
                if (month + i > 12) {
                    month = month + i - 12;
                    year = year + 1;
                } else {
                    month = month + i;
                }
                if (month < 10) {
                    month = "0" + month;
                }
                this.varityCodes.push(f.varityCode + year + month);
            }
            this.queryProductRankingByTypeId();
        },
        selectVarityCode(v) {
            this.varityCode = v;
            this.queryContractRankingByFuturesCode();
        },
        showContractRanking(product) {
            product.show = !product.show;
            this.$forceUpdate();
            if (!product.contractRanking) {
                this.$post([1, "queryContractRankingCompanyId"], {
                    pageNo: 1,
                    pageSize: 2,
                    needCount: 0,
                    futuresCode: product.code,
                    memberId: this.companyid / 1,
                    typeId: this.typeId
                }).then(res => {
                    product.contractRanking = res.results;
                    this.$forceUpdate();
                });
            }
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
.share {
    margin: 0 10px;
    padding: 5px 0;
    .font-23;
    .text-color17;
    .btn-share {
        float: right;
        display: block;
        width: 17px;
        height: 20px;
        background: url("./../assets/img/分享-默认.png") no-repeat center right;
        background-size: 17px 17px;
    }
}

.order {
    position: relative;
    line-height: 25px;
    color: #fff;
    font-size: 10px;
    &:before {
        content: "";
        position: absolute;
        z-index: -1;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 20px;
        margin-top: -10px;
        margin-left: -10px;
        border-radius: 20px;
        background: #f06c6a;
    }
}

.order0 {
    background: url(./../assets/img/2金牌.png) no-repeat center;
    background-size: 15px 20px;
}

.order1 {
    background: url(./../assets/img/2银牌.png) no-repeat center;
    background-size: 15px 20px;
}

.order2 {
    background: url(./../assets/img/2铜牌.png) no-repeat center;
    background-size: 15px 20px;
}

.icon-tb {
    width: 30px;
    background: url(./../assets/img/行情-默认.png) no-repeat center;
    background-size: 17.5px 16px
}

.show-more {
    height: 35px;
    line-height: 35px;
    text-align: center;
    .font-13;
    .text-color2;
    &:before {
        content: "";
        display: inline-block;
        width: 10px;
        height: 12px;
        margin-right: 3px;
        background: url(./../assets/img/手势-默认.png) no-repeat center;
        background-size: 10px 12px;
    }
}
</style>
