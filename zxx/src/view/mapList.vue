<template>
    <div class="full-height">
        <!-- <ui-head title="网点查询"></ui-head> -->
        <common-nav>
            <div slot="body">
                网点查询
            </div>
        </common-nav>
        <div class="container" v-infinite-scroll="query" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
            <div class="map-list" v-for="i in mapList">
                <div class="map-name">1.重庆总部</div>
                <div class="map-address">重庆市重庆市重庆市重庆市重庆市重庆市</div>
                <div class="map-info">
                    <a class="map-phone">023-63600049</a>
                    <div class="map-distance">0.1km</div>
                </div>
            </div>
            <div v-if="noMore && mapList.length == 0" class="text-color17 text-center" style="margin-top:50px;">无记录</div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
            return {
                position: {},
                noMore: false,
                loading: false,
                pageNo: 0,
                mapList: []
            }
        },
        created() {
            let self = this;
            this.$indicator.open('定位中...');
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    self.$indicator.close();
                    self.position.longitude = position.coords.longitude;
                    self.position.latitude = position.coords.latitude;
                });
            } else {
                this.$toast("定位失败");
            }
        },
        methods: {
            query() {
                this.loading = true;
                if (this.position.longitude) {
                    if (this.noMore) {
                        return this.$toast("没有更多了");
                    }
                    this.pageNo++;
                    this.$post("location", {
                        pageNo: this.pageNo,
                        pageSize: this.pageSize,
                        longitude: this.position.longitude,
                        latitude: this.position.latitude
                    }).then(res => {
                        this.loading = false;
                        this.mapList = res.contents;
                        if (this.mapList.length < this.pageSize) {
                            this.noMore = true;
                        }
                    });
                } else {
                    let self = this;
                    setTimeout(() => {
                        self.loading = false;
                    }, 10);
                }
            }
        }
}
</script>
<style lang="less">
@import "./../assets/css/common.less";
.map-list {
    padding: 10px;
    border-bottom: 1px solid @color23;
    .map-name {
        padding: 3px 0;
        .font-10;
        .text-color18;
    }
    .map-address {
        padding: 3px 0;
        .font-26;
        .text-color17;
    }
    .map-info {
        display: flex;
        padding: 3px 0;
        .map-phone {
            flex: 1;
            display: inline-block;
            height: 15px;
            padding-left: 15px;
            background: url(./../assets/img/电话.png) no-repeat 0 center;
            background-size: 10px 10px;
            .font-26;
            .text-color2;
        }
        .map-distance {
            display: inline-block;
            height: 16px;
            padding-right: 20px;
            background: url(./../assets/img/地图-默认.png) no-repeat right center;
            background-size: 16px 16px;
            .font-23;
            .text-color17;
        }
    }
}
</style>
