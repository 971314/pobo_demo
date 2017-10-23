<template>
    <div class="full-height">
        <!-- <ui-head title="机构动向"></ui-head> -->
        <common-nav>
            <div slot="body">
                机构动向
            </div>
        </common-nav>
        <div class="container" id="map"></div>
    </div>
</template>
<script>
export default {
    data() {
            return {}
        },
        mounted() {
            var map = new BMap.Map("map"); // 创建地图实例
            var point = new BMap.Point(116.404, 39.915); // 创建点坐标
            map.centerAndZoom(point, 15);
            var marker = new BMap.Marker(point); // 创建标注
            map.addOverlay(marker);
            map.addControl(new BMap.NavigationControl());
            map.addControl(new BMap.NavigationControl());
            map.addControl(new BMap.ScaleControl());
            map.addControl(new BMap.OverviewMapControl());
            map.addControl(new BMap.MapTypeControl());
            map.addControl(new BMap.GeolocationControl());

            var opts = {
                width: 100, // 信息窗口宽度
                height: 50, // 信息窗口高度
                title: "标题" // 信息窗口标题
            }
            var infoWindow = new BMap.InfoWindow("地址", opts); // 创建信息窗口对象
            map.openInfoWindow(infoWindow, map.getCenter());
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
