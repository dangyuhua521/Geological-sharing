<template>
  <div :class="$style.container">
    <img :src="options.imgUrl" />
    <ul>
      <li v-for="item in options.data" :key="item.name">
        <span>
          {{ item.name }}
        </span>
        <p>
          {{ item.content }}
        </p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ["options"]
  //    data: [
  //         {
  //           name: "卫星",
  //           content: "测试"
  //         },
  //         {
  //           name: "传感器",
  //           content: "测试"
  //         },
  //         {
  //           name: "采集时间",
  //           content: "测试"
  //         },
  //         {
  //           name: "云量",
  //           content: "测试"
  //         },
  //         {
  //           name: "分辨率",
  //           content: "测试"
  //         },
  //         {
  //           name: "轨道编号",
  //           content: "测试"
  //         },
  //         {
  //           name: "Path/Row",
  //           content: "测试"
  //         },
  //         {
  //           name: "产品号",
  //           content: "测试"
  //         },
  //         {
  //           name: "左上",
  //           content: "测试"
  //         },
  //         {
  //           name: "右上",
  //           content: "测试"
  //         },
  //         {
  //           name: "左下",
  //           content: "测试"
  //         },
  //         {
  //           name: "右下",
  //           content: "测试"
  //         }
  //       ]
};
</script>

<style module lang="less">
@import "./mini.less";
</style>
