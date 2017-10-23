<template>
    <div class="menus">
        <router-link v-for="menu in menus" class="menu-item" :to="menu.to">
            <img :src="menu.src" />
            <span v-text="menu.text"></span>
        </router-link>
    </div>
</template>
<script>
export default {
    props: {
        menus: {
            type: Array,
            default: []
        }
    }
}
</script>
<style lang="less">
@import "./../assets/css/common.less";
.menus {
    width: 100%;
    height: 120px;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    .menu-item {
        display: inline-block;
        width: 25%;
        text-align: center;
        text-decoration: none;
        .font-23;
        .text-color18;
        img {
            display: block;
            width: 38px;
            height: 38px;
            margin: 26px auto 19px;
        }
    }
}
</style>
