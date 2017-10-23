<template>
    <div class="full-height">
        <router-view></router-view>
        <mt-spinner v-if="spinner" type="double-bounce" class="spinner" :color="color" :size="30"></mt-spinner>
        <mt-spinner v-if="!spinner && loading" type="snake" class="spinner" :color="color" :size="30"></mt-spinner>
    </div>
</template>
<style>
.spinner {
    position: fixed;
    top: 40%;
    left: 50%;
    margin-left: -25px;
}
</style>
<script>
import "./assets/css/style.less";
export default {
    data() {
            return {
                color: "#eb1212"
            }
        },
        created() {
            this.$store.commit("spinner", false);
            //本地开发 不用index跳转
            if (process.env.NODE_ENV === "production") {
                this.$router.push({
                    name: "index"
                });
            }
        },
        computed: {
            spinner() {
                return this.$store.state.spinner
            },
            loading() {
                return this.$store.state.loading
            }
        }
}
</script>
