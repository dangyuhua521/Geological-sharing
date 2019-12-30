<template>
  <div class="el-main">
    <el-container ref="container">
      <el-aside>
        <div class="adm"></div>
        <!-- <span style="text-align:center;margin: 0 114px 0 114px;font-size: 18px;color: #333;cursor:pointer;">个人中心</span> -->
        <div class="userTitle">个人中心</div>

        <el-row class="tac">
          <el-col :span="24">
            <customMenu :routes="routes" />
          </el-col>
        </el-row>
      </el-aside>
      <el-main class="sysMain">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive == true">
            <!-- 这里是会被缓存的视图组件 -->
          </router-view>
        </keep-alive>

        <router-view v-if="!$route.meta.keepAlive">
          <!-- 这里是不被缓存的视图组件 -->
        </router-view>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import customMenu from "@/components/menu";
export default {
  components: {
    customMenu
  },
   mounted(){ 
       window.scrollTo(0, 0)
  },
  watch: {
    $route() {
      this.$refs.container.scrollTop = 0;
    }
  },
  methods: {
    routeNav(path) {
      this.$router.push(path);
    }
  },
  computed: {
    routes() {
      return this.$router.options.routes
        .find(route => route.name === "home")
        .children.find(route => route.path === "/personalCenter").children;
    }
  }
};
</script>
<style lang="less" scope>
.userTitle {
  color: #333333;
  font-size: 18px;
  line-height: 60px;
  text-align: center;
  margin-bottom: 12px;
}
.el-aside {
  width: 300px;
  // height: 100%;
  background: #fff;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.15);
}
.adm {
  background: url("../../../../static/img/users.png") no-repeat;
  // background: url("/static/img/users.png") no-repeat;
  width: 120px;
  height: 120px;
  text-align: center;
  margin: 40px 90px 20px 90px;
  cursor: pointer;
}
.tac {
  margin-top: 40px;
}
.el-mian{
  padding: 0px !important;
  height: 100%;
}
.el-button:active {
  color: #423e40;
    border-color: #f7f7f7;
    background: #d8c8c8;
    outline: 0;
}
</style>
