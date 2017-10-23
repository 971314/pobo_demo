<template>
    <div>
        <navbar>
            <span @click="goBack">
                <icon name="chevron-left" size="lg"></icon>
            </span>
            <div slot="body">
                <span class="msg-sl " :class="showTab == true ? 'sl-one' : '' " @click="switchTab(0)">建投优选</span>
                <span class="msg-s" :class="showTab == true ? '' : 'sl-one' " @click="switchTab(1)">行业资讯</span>
            </div>
            <icon name="ellipsis-h" slot="footer" size="lg"></icon>
        </navbar>
        <router-view></router-view>
    </div>
</template>
<script>
    export default{
        data:function(){
            return{
                showTab:true
            }
        },
        methods:{
            goBack:function(){
                this.$router.push('main')
            },
            switchTab:function(flag){
                if(flag == 0){
                    this.showTab = true
                    this.$router.push('/test')
                }else if (flag == 1){
                    this.showTab = false
                    this.$router.push('/test')
                }
            }
        }
    }
</script>
<style>
    .msg-sl{
        border: solid 1px #ddd;
        height: 26px;
        line-height: 25px;
        display: inline-block;
        width: 64px;
        margin-left: 6px;
        border-top-left-radius: 2px;
        border-bottom-left-radius: 2px;
    }
    .sl-one{background: #ccc}
    .msg-s{
        border: solid 1px #ddd;
        height: 26px;
        line-height: 25px;
        display: inline-block;
        border-top-right-radius: 2px;
        border-bottom-right-radius: 2px;
        width: 64px;
        margin-left: -5px;
    }
</style>