<template>
  <el-container class="fullBox">
    <MainMenu ref="menu"></MainMenu>
    <el-main class="sysMain" style="padding:20px">
      <router-view ref="views"> </router-view>
    </el-main>
  </el-container>
</template>

<script>
import MainMenu from "./home/mainMenu.vue";

export default {
  components: {
    MainMenu
  }
};
</script>

<style scoped lang="less">
.el-main{
     padding: 20px !important;
     height: 100%;
     background: #eef3f7 ;

   }
.sysMain {
  background: #eef3f7;
}
</style>
