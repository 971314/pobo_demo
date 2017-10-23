<template>
    <div class="full-height bg-color22">
        <!-- <ui-head title="国债收益"></ui-head> -->
        <common-nav>
            <div slot="body">
                国债收益
            </div>
        </common-nav>
        <div class="container">
            <div class="text-center" style="padding:10px;">
                <div>通过国债期货价格推算收益率</div>
                <div>通过收益率推算国债期货价格</div>
            </div>
            <div class="hr"></div>
            <div class="btn-tabs">
                <div class="tabs" :class="{'active':show == 1}">
                    <button @click="show = 1">收益计算器</button>
                </div>
                <div class="tabs" :class="{'active':show == 2}">
                    <button @click="show = 2">资金转换计算</button>
                </div>
            </div>
            <div class="hr"></div>
            <div class="hr-10"></div>
            <div v-show="show == 1">
                <div>
                    <mt-cell title="买卖价格">
                        <input v-model="price" class="cell-input" type="number" placeholder="请输入价格">&nbsp;元
                    </mt-cell>
                    <mt-cell title="5年国债">
                        <input class="cell-input" type="number" v-model="fiveYearsRate" readonly>&nbsp;%
                    </mt-cell>
                    <mt-cell title="10年国债">
                        <input class="cell-input" type="number" v-model="tenYearsRate" readonly>&nbsp;%
                    </mt-cell>
                </div>
                <div style="padding:50px 10px 10px 10px">
                    <mt-button type="danger" size="large" @click="priceToRate">计算</mt-button>
                </div>
            </div>
            <div v-show="show == 2">
                <div>
                    <mt-cell title="收益率">
                        <input v-model="rate" class="cell-input" type="number" placeholder="收益率">&nbsp;%
                    </mt-cell>
                    <mt-cell title="5年国债">
                        <input v-model="fiveYearsPrice" class="cell-input" type="number" readonly>&nbsp;元
                    </mt-cell>
                    <mt-cell title="10年国债">
                        <input v-model="tenYearsPrice" class="cell-input" type="number" readonly>&nbsp;元
                    </mt-cell>
                </div>
                <div style="padding:50px 10px 10px 10px">
                    <mt-button type="danger" size="large" @click="rateToPrice">计算</mt-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
            return {
                price: "",
                fiveYearsRate: null,
                tenYearsRate: null,
                rate: "",
                fiveYearsPrice: null,
                tenYearsPrice: null,
                show: 1
            }
        },
        methods: {
            priceToRate() {
                if (this.price) {
                    this.$get("priceToRate", this.price).then(res => {
                        this.fiveYearsRate = res.fiveYearsRate;
                        this.tenYearsRate = res.tenYearsRate;
                    });
                } else {
                    this.$toast("请输入价格");
                }
            },
            rateToPrice() {
                if (this.rate) {
                    this.$get("rateToPrice", this.rate).then(res => {
                        this.fiveYearsPrice = res.fiveYearsPrice;
                        this.tenYearsPrice = res.tenYearsPrice;
                    });
                } else {
                    this.$toast("请输入收益率");
                }
            }
        }
}
</script>
<style lang="less">
@import "./../assets/css/common.less";
.computed-result {
    height: 150px;
    background: @color22 url(./../assets/img/椭圆-3-拷贝@2x.png) no-repeat center;
    background-size: 128px 128px;
    .result {
        padding-top: 50px;
        text-align: center;
        .font-36;
        .text-color2;
    }
    .text {
        padding-top: 10px;
        text-align: center;
        .font-26;
        .text-color17;
    }
}
</style>
