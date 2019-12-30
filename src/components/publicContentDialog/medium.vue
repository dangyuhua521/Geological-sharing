<template>
  <div :class="$style.container">
    <h3>基本信息</h3>
    <div :class="$style.base">
      <ul>
        <li v-for="item in baseOption" :key="item.name">
          <span>
            {{ item.name }}
          </span>
          <p>
            {{ item.content }}
          </p>
        </li>
      </ul>
      <img :src="options.imgUrl" />
    </div>
    <h3>正文内容</h3>
    <div :class="$style.primary">
      <ul>
        <li v-for="item in primaryOption" :key="item.name">
          <span>
            {{ item.name }}
          </span>
          <p>
            {{ item.content }}
          </p>
        </li>
      </ul>
    </div>
    <h3>附图类</h3>
    <div :class="$style.accessory">
      <ul>
        <li v-for="item in accessoryOption" :key="item.name">
          <span>
            {{ item.name }}
          </span>
          <p>
            {{ item.content }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: ["options"],
  computed: {
    baseOption() {
      return this.options.data.base;
    },
    primaryOption() {
      return this.options.data.primary;
    },
    accessoryOption() {
      return this.options.data.accessory;
    }
  }
};
// data: {
//   base: [
//     {
//       name: "编号",
//       content: "测试"
//     },
//     {
//       name: "形成时间",
//       content: "测试"
//     },
//     {
//       name: "编著者",
//       content: "测试"
//     },
//     {
//       name: "资料类别",
//       content: "测试"
//     },
//     {
//       name: "项目起始时间",
//       content: "测试"
//     },
//     {
//       name: "起始经度",
//       content: "测试"
//     },
//     {
//       name: "起始纬度",
//       content: "测试"
//     },
//     {
//       name: "行政区",
//       content: "测试"
//     },
//     {
//       name: "主题词",
//       content: "测试"
//     },
//     {
//       name: "内容提要",
//       content:
//         "内容提要内容提要内容提要内容提要内容提要内容提要内容提要内容提要内容提要内容提要内容提要内容提要内容提要内容提要内容提要内容提要内容提要内容提要内容提要内容提要内容提要内容提要内容提要内容提要内容提要内容提要内容提要内容提要内容提要内容提要内容提要内容提要内容提要内容提要内容提要内容提要内容提要内容提要内容提要内容提要内容提要内容提要内容提要内容提要"
//     }
//   ],
//   primary: [
//     {
//       content: "测试"
//     }
//   ],
//   accessory: [
//     {
//       content: "测试"
//     }
//   ]
// }
</script>

<style module lang="less">
@import "./medium.less";
</style>
