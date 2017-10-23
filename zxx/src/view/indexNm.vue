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
export default {
    mixins: [forwardMixin],
    beforeRouteEnter(to, from, next) {
        next(vm => {
            // 通过 `vm` 访问组件实例
            vm.from = from;
        });
    },
    data() {
        return {
            auth: 1
        }
    },
    created() {
        let self = this;
        self.$loading();
        //beforeRouteEnter的next在created之后执行
        let interval = setInterval(() => {
            if (self.from) {
                clearInterval(interval);
                //免登陆：配置到router的meta[noAuth]中
                if (self.from.meta.noAuth) {
                    this.forward();
                } else {
                    //todo 登录认证
                    this.forward();
                }
            }
        }, 1);
    },
    methods: {
        reAuth() {

        },
        forward() {
            this.$loaded();
            if (this.from.name) {
                this.$router.push({
                    name: this.from.name,
                    query: this.from.query
                });
            } else {
                this.$router.push("home");
            }
        }
    }
}
</script>
<style lang="less" scoped>
@import "./../assets/css/common.less";
.full-height {
    background: white;
}

.auth {
    margin-top: 80%;
    text-align: center;
    color: @info;
    &.auth-fail {
        color: black;
    }
}
</style>
