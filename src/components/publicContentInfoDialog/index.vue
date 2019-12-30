<template>
<div :class="$style.info">
   <MiniContent :options="options" v-if="type === 'mini'" />
    <SmallContent :options="options" v-if="type === 'small'" />
    <MediumContent :options="options" v-if="type === 'medium'" />
</div>
  <!-- <el-dialog
    append-to-body
    :visible.sync="visible"
    :width="width"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="onClose"
  >
  </el-dialog> -->
</template>
<script>
import MiniContent from "./mini";
import SmallContent from "./small";
import MediumContent from './medium'
export default {
  components: {
    MiniContent,
    SmallContent,
    MediumContent
  },
  props: {
    width: {
      type: String,
      default: "1000px"
    },
    visible: {
      type: Boolean,
      required: true
    },
    title: String,
    type: {
      type: String,
      //   medium / small / mini
      default: "mini"
    },
    options: {
      type: Object,
      required: true,
      default: {
        imgUrl: "",
        data: {}
      }
    }
  },
  methods: {
    onClose() {
      this.$emit("update:visible", false);
    },
    onClick() {
      this.onClose();
    }
  }
};
</script>

<style module lang="less">
@import "./index.less";
</style>
