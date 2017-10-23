<template>
<div>
    <input type="number" v-model="num"/>
    <div>{{num}}</div>
</div>
</template>
<script>
export default {
    data:function () {
        return {
            num:0
        }
    }
}
</script>