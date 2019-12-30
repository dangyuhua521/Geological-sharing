<template>
  <div class="menu-container">
    <template v-for="route in routes">
      <el-submenu
        v-if="route.children && route.children.length"
        :key="route.path"
        :index="route.path"
      >
        <template slot="title">
          <img class="icon" v-if="route.meta.icon" :src="getImgUrl(route)" />
          <span>{{route.name }}</span>
        </template>
        <subDeepMenu :routes="route.children" />
      </el-submenu>
      <el-menu-item v-else :key="route.path" :index="route.path" @click="goTop">
        <img
          v-if="route.meta.icon"
          class="icon"
          :src="getImgUrl(route)"
        />
        {{ route.name }}
      </el-menu-item>
    </template>
  </div>
</template>
<script>
export default {
  name: 'subDeepMenu',
  props: ['routes'],
  computed: {
    currentPage() {
      return this.$route.path
    }
  },
    mounted(){
      this.goTop();
    },
  methods: {
    getImgUrl(route) {
      if(route.children && route.children.length>0){
          for(let i in route.children){
              if(this.currentPage == route.children[i].path){
                  return route.meta.icon.replace(/\./g, '_active.')
              }
          }
      }else if (this.currentPage === route.path) {
        return route.meta.icon.replace(/\./g, '_active.')
      }
      return route.meta.icon
    },
    goTop(){
      document.getElementById("target").scrollIntoView();
    }
  }
}
</script>
<style lang="scss" scope="scope">
  @import './subDeepMenu.scss';
</style>
