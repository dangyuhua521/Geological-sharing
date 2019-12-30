<template>
  <div class="map">
    <ArcMap></ArcMap>
    <MapSearch></MapSearch>
  </div>
</template>
<script>
  import ArcMap from '../map/home'
  import MapSearch from './Detail/search'
  export default {
    components:{
      MapSearch,ArcMap
    }
  }
</script>
<style lang="less" scope>
  .map{
    width: 100%;
    height: 100%;
    position: relative;
  }
</style>
