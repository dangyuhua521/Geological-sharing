<template>
  <el-aside :width="menuWidth" class="containers">
    <img src="/static/img/icon/syetem-guanli.png" alt="" />
    <div class="system">系统管理</div>
    <customMenu :routes="routes" />
  </el-aside>
</template>
<script>
import customMenu from "@/components/menu";
export default {
  components: {
    customMenu
  },
  data() {
    return {
      menuWidth: "300px"
    };
  },
  computed: {
    routes() {
      return this.$router.options.routes
        .find(route => route.name === "home")
        .children.find(route => route.path === "/serverManager").children;
    }
  }
};
</script>
<style scoped lang="less">
.containers {
  background: #fff;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
   overflow-x: hidden;
  img {
    width: 144px;
    height: 115px;
    margin: 40px 90px 20px 90px;
  }
}
.system {
  color: #333333;
  font-size: 18px;
  line-height: 60px;
  text-align: center;
  margin-bottom: 12px;
}
</style>
