<template>
  <div class="city">
    <img src="../assets/images/city.png">
    <span>{{ city }}</span>
  </div>
</template>

<script>
export default {
  name: 'city',
  data () {
    return {
      city: '定位中'
    }
  },
  mounted () {
    var _this = this;
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r){
      if(this.getStatus() == BMAP_STATUS_SUCCESS){
        var myGeo = new BMap.Geocoder();
        myGeo.getLocation(r.point, function (result) {
          _this.city = result.addressComponents.city.slice(0, -1);
        });
      }
      else {
        var myCity = new BMap.LocalCity();
        myCity.get(function (result) {
          _this.city = result.name.slice(0, -1);
        });
      }
    },{enableHighAccuracy: false, maximumAge: 0});
  }
}
</script>

<style>
.city {
  margin-top: 10px;
  margin-bottom: 10px;
  height: 23px;
  line-height: 23px;
}
.city img {
  height: 17px;
}
</style>
