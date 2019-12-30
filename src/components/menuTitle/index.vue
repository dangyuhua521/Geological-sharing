<template>
  <h2 :class="$style.title">
    {{ currentPageTitle }}
  </h2>
</template>
<script>
export default {
  computed: {
    currentPageTitle() {
      return this.$route.name;
    }
  }
};
</script>
<style module lang="less">
@import "./index.less";
</style>
