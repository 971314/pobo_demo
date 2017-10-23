<template>
    <div class="full-height bg-color22">
        <!-- <ui-head title="保证金计算"></ui-head> -->
        <common-nav>
            <div slot="body">
                保证金计算
            </div>
        </common-nav>
        <div class="container">
            <div class="computed-result">
                <div class="result" v-text="res">0000.00</div>
                <div class="text">保证金占用</div>
            </div>
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
                    <input class="cell-input" type="number" v-model="sl">
                </mt-cell>
                <mt-cell title="昨天结算价">
                    <input class="cell-input" type="number" v-model="jsj">
                </mt-cell>
                <mt-cell title="交易手数">
                    <input class="cell-input" type="number" v-model="ss">
                </mt-cell>
            </div>
            <div style="padding:50px 10px 10px 10px">
                <mt-button type="danger" size="large">计算</mt-button>
            </div>
            <div style="padding:10px" class="font-11 text-color18">
                保证金占用=保证金比例*昨天结算价*没手数量*手数以上所有合约保证金按照15%的比例计算，实际保证金占用按照真实账户收取为准
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
            return {
                v: "",
                sl: 0,
                jsj: 0,
                ss: 0
            }
        },
        methods: {

        },
        computed: {
            res() {
                return _.round((this.sl ? this.sl : 0) * (this.jsj ? this.jsj : 0) * (this.ss ? this.ss : 0) * 0.15, 2);
            }
        }
}
</script>
<style lang="less">
</style>
