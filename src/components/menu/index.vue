<template>
  <el-menu
    unique-opened
    background-color="#ffffff"
    text-color="#7d7d7d"
    active-text-color="#808080"
    :default-active="activePath"
    router
  >
    <deepMenu :routes="routes" />
    
  </el-menu>
</template>
<script>
import deepMenu from "./subDeepMenu";
export default {
  components: {
    deepMenu
  },

  props: {
    defatuleEnterFirstPath: {
      type: Boolean,
      default: true
    },
    routes: {
      type: Array
    }
  },
  computed: {
    activePath() {
      return this.$route.path;
    }
  },
  // created() {
  // },
  goTop(){
      document.getElementById("target").scrollIntoView();
    },
  methods: {
    getFirstEnterPath(routes = this.routes, prevRoute = {}) {
      if (routes && routes.length) {
        prevRoute = routes[0];
        return this.getFirstEnterPath(prevRoute.children, prevRoute);
      }
      return prevRoute.path;
    }
  }
};
</script>
