<template>
    <div class="my-modal" v-show="showBase">
        <div class="my-modal-backdrop" @click="close"></div>
        <div class="my-modal-dialog" @click="close">
            <ul>
                <li :class="{active: name == '市场热点'}">市场热点</li>
                <li :class="{active: name == '机构动向'}">机构动向</li>
                <li :class="{active: name == '套利分析'}">套利分析</li>
                <li :class="{active: name == '仓单库存'}">仓单库存</li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        showBase: {
            type: Boolean,
            default: false
        },
        name: {
            type: String
        }
    },
    methods: {
        close() {
            this.$emit("input", false);
        }
    }
}
</script>
<style lang="less">
@import "./../assets/css/common.less";
.my-modal {
    position: relative;
    .my-modal-backdrop {
        position: fixed;
        z-index: 9;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
    }
    .my-modal-dialog {
        position: relative;
        z-index: 10;
        background: #fff;
        border-radius: 0 0 5px 5px;
        ul {
            text-align: center;
            li {
                height: 30px;
                line-height: 30px;
                border-bottom: 1px solid @hr;
                &.active {
                    .text-color2;
                }
                &:last-child {
                    border-bottom: none;
                }
            }
        }
    }
}
</style>
