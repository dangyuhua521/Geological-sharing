<template>
  <el-button :class="$style.btn" size="small" @click="onClick"
    ><i :class="$style.myIconSearch"></i
  ></el-button>
</template>
<script>
export default {
  methods: {
    onClick() {
      this.$emit("click");
    }
  }
};
</script>

<style module lang="less">
@import "./index.less";
</style>