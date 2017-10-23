<template>
    <div class="full-height">
        <div v-if="auth == 1" class="auth">认证中...</div>
        <div v-if="auth == 2" class="auth auth-fail">认证失败，<span class="text-info" @click="reAuth">点击</span>重试</div>
    </div>
</template>
<script>
import {
    forwardMixin
} from "./../common/service";
import {
    WxMenuConf
} from "./../common/config/constants";
export default {
    mixins: [forwardMixin],
    beforeRouteEnter(to, from, next) {
        next(vm => {
            // 通过 `vm` 访问组件实例
            vm.from = from;
        })
    },
    data() {
        return {
            from: {},
            code: "",
            merchantNum: "",
            path: "",
            params: "",
            auth: 1
        }
    },
    created() {
        this.code = this.$getParam("code");
        this.merchantNum = this.$getParam("merchantNum");
        this.path = this.$getParam("path");
        this.params = this.$getParam("params");

        this.$post("auth", {
            code: this.code,
            merchantNum: this.merchantNum
        }).then((res) => {
            if (res.mobile) {
                this.forward(this.path, this.params);
            } else {
                this.$router.push("login");
            }
        }).catch(() => {
            if (this.from && this.from.name) {
                window.location = WxMenuConf.replace("${path}", this.from.name).replace("${params}", this.from.query ? JSON.stringify(this.from.query) : "").replace("${merchantNum}", this.merchantNum);
            } else {
                this.auth = 2;
            }
        });
    },
    methods: {
        reAuth() {
            window.location = WxMenuConf.replace("${path}", this.path).replace("${params}", this.params ? JSON.stringify(this.params) : "").replace("${merchantNum}", this.merchantNum);
        }
    }
}
</script>
<style lang="less" scoped>
@import "./../assets/css/common.less";
.full-height {
    background: @fff;
}

.auth {
    margin-top: 80%;
    text-align: center;
    color: @info;
    &.auth-fail {
        color: @000;
    }
}
</style>
