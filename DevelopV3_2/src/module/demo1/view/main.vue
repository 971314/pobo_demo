<template>
    <div>
        <swipe>
            <swipe-item>
                <div class="page-swipe-item bg-secondary">2</div>
            </swipe-item>
            <swipe-item>
                <div class="page-swipe-item bg-success">3</div>
            </swipe-item>
            <swipe-item>
                <div class="page-swipe-item bg-warning">4</div>
            </swipe-item>
            <swipe-item>
                <div class="page-swipe-item bg-danger">5</div>
            </swipe-item>
        </swipe>
        <router-link :to="{path: '/message'}">资讯页面</router-link>
        <div v-for="n in 3">
            <group-title><strong>group {{n}}</strong></group-title>
            <group>
                <cell v-for="m in 2">
                    {{n}}-{{m}}
                </cell>
            </group>
        </div>
    </div>
</template>
