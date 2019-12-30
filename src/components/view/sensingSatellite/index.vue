<template>
  <div id="map" style="position:relative;">
    <ArcMap></ArcMap>
    <MapSearch></MapSearch>
  </div>
</template>
<script>
import ArcMap from '../map/home'
import MapSearch from './DetailMap/search'

export default {
  data() {
    return {}
  },
  components: {
    ArcMap,
    MapSearch
  }
}
</script>
<style lang="less" scope>
#map {
  width: 100%;
  height: 100%;
}
</style>
