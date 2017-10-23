<template>
    <div class="full-height">
        <!-- <ui-head title="报名"></ui-head> -->
        <common-nav>
            <div slot="body">
                报名
            </div>
        </common-nav>
        <div class="container">
            <div class="hr-10"></div>
            <div>
                <mt-field label="会议" :value="info" readonly></mt-field>
                <mt-field label="姓名" placeholder="请输入姓名" v-model="name"></mt-field>
                <mt-field label="手机号" placeholder="请输入手机号" v-model="phone" type="number"></mt-field>
                <mt-field label="备注" type="textarea" rows="2" placeholder="请输入备注"></mt-field>
            </div>
            <div style="padding:50px 10px 10px 10px">
                <mt-button type="danger" size="large" @click="signUp">提交</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
            return {
                infoid: this.$route.query.infoid,
                info: this.$route.query.info,
                name: "",
                phone: ""
            }
        },
        methods: {
            signUp() {
                if (!this.name) {
                    return this.$toast("请输入姓名");
                }
                if (!this.phone) {
                    return this.$toast("请输入手机号");
                }
                if (!/^1[3|4|5|7|8]\d{9}$/.test(this.phone)) {
                    return this.$toast("请输入正确的手机号");
                }
                this.$post("signUp", {
                    infoid: this.infoid,
                    name: this.name,
                    phone: this.phone
                }).then(res => {
                    this.$toast("报名成功");
                    this.$router.replace({
                        name: "meeting"
                    });
                })
            }
        }
}
</script>
<style lang="less">
@import "./../assets/css/common.less";
</style>
