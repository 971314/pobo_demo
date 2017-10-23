<template>
    <div class="full-height bg-color22">
        <!-- <ui-head title="收益计算"></ui-head> -->
        <common-nav>
            <div slot="body">
                收益计算
            </div>
        </common-nav>
        <div class="container">
            <div class="btn-tabs">
                <div class="tabs" :class="{'active':show == 1}">
                    <button @click="show = 1">收益计算器</button>
                </div>
                <div class="tabs" :class="{'active':show == 2}">
                    <button @click="show = 2">资金转换计算</button>
                </div>
            </div>
            <div class="hr-border-10"></div>
            <div v-show="show == 1">
                <div>
                    <!-- <mt-cell title="品种" is-link>
                        <span class="click-value" v-text="v"></span>
                        <select class="cell-select" v-model="v">
                            <option value="111">111</option>
                            <option value="222">222</option>
                            <option value="333">333</option>
                            <option value="444">444</option>
                            <option value="555">555</option>
                        </select>
                    </mt-cell>
                    <mt-cell title="月份" is-link>
                        <span class="click-value" v-text="v"></span>
                        <select class="cell-select" v-model="v">
                            <option value="111">111</option>
                            <option value="222">222</option>
                            <option value="333">333</option>
                            <option value="444">444</option>
                            <option value="555">555</option>
                        </select>
                    </mt-cell> -->
                    <mt-cell title="每手数量">
                        <input class="cell-input" type="number" v-model="sl1">
                    </mt-cell>
                    <mt-cell title="交易手数">
                        <input class="cell-input" type="number" v-model="ss1">
                    </mt-cell>
                    <mt-cell title="价格变动">
                        <input class="cell-input" type="number" v-model="bd1">
                    </mt-cell>
                </div>
                <div style="padding:50px 10px 10px 10px">
                    <mt-button type="danger" size="large">计算收益</mt-button>
                </div>
                <div class="computed-result">
                    <div class="result" v-text="res1"></div>
                    <div class="text">我的盈亏</div>
                </div>
            </div>
            <div v-show="show == 2">
                <div>
                    <mt-cell title="资金量">
                        <input class="cell-input" type="number" v-model="zjl2">
                    </mt-cell>
                    <!-- <mt-cell title="品种" is-link>
                        <span class="click-value" v-text="v"></span>
                        <select class="cell-select" v-model="v">
                            <option value="111">111</option>
                            <option value="222">222</option>
                            <option value="333">333</option>
                            <option value="444">444</option>
                            <option value="555">555</option>
                        </select>
                    </mt-cell>
                    <mt-cell title="月份" is-link>
                        <span class="click-value" v-text="v"></span>
                        <select class="cell-select" v-model="v">
                            <option value="111">111</option>
                            <option value="222">222</option>
                            <option value="333">333</option>
                            <option value="444">444</option>
                            <option value="555">555</option>
                        </select>
                    </mt-cell> -->
                    <mt-cell title="每手数量">
                        <input class="cell-input" type="number" v-model="sl2">
                    </mt-cell>
                    <mt-cell title="现价">
                        <input class="cell-input" type="number" v-model="xj2">
                    </mt-cell>
                    <mt-cell title="保证金比例">
                        <input style="width:60px;" class="cell-input" type="number" v-model="bl2">&nbsp;%
                    </mt-cell>
                </div>
                <div style="padding:50px 10px 10px 10px">
                    <mt-button type="danger" size="large">计算</mt-button>
                </div>
                <div class="computed-result">
                    <div class="result" v-text="res2"></div>
                    <div class="text">可交易数量</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
            return {
                show: 1,
                v: "",
                sl1: 0,
                ss1: 0,
                bd1: 0,
                zjl2: 0,
                sl2: 0,
                xj2: 0,
                bl2: 0
            }
        },
        methods: {

        },
        computed: {
            res1() {
                return _.round(this.sl1 * this.ss1 * this.bd1, 2);
            },
            res2() {
                let res = _.round(_.divide(this.zjl2, (this.xj2 * this.bl2 * this.sl2 * 0.01)));
                return isNaN(res) ? 0 : res;
            }
        }
}
</script>
<style lang="less">
@import "./../assets/css/common.less";
</style>
%
