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
    <h3>扩展信息</h3>
    <div :class="$style.extend">
      <ul>
        <li
          :class="{
            [$style.full]: index + 1 === extendOption.length && (index + 1) % 2
          }"
          v-for="(item, index) in extendOption"
          :key="item.name"
        >
          <span>
            {{ item.name }}
          </span>
          <p>
            {{ item.content }}
          </p>
        </li>
      </ul>
    </div>
    <h3>相关电子文件</h3>
    <div :class="$style.correlation">
      <ul>
        <li v-for="item in correlationOption" :key="item.name">
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
    extendOption() {
      return this.options.data.extend;
    },
    baseOption() {
      return this.options.data.base;
    },
    correlationOption() {
      return this.options.data.correlation;
    }
  }
};
// data:{
//   base: [
//     {
//       name: "编号",
//       content: "测试"
//     },
//     {
//       name: "产品名称",
//       content: "测试"
//     },
//     {
//       name: "产品描述",
//       content: "测试"
//     },
//     {
//       name: "关键词",
//       content: "测试"
//     },
//     {
//       name: "产品一级类别",
//       content: "测试"
//     },
//     {
//       name: "生产日期",
//       content: "测试"
//     },
//     {
//       name: "单位名称",
//       content: "测试"
//     },
//     {
//       name: "服务对象名称",
//       content: "测试"
//     },
//     {
//       name: "服务地址",
//       content: "测试"
//     },
//     {
//       name: "下载地址",
//       content: "测试"
//     }
//   ],
//   extend: [
//     {
//       name: "专业类别",
//       content: "测试"
//     },
//     {
//       name: "比例尺",
//       content: "测试"
//     },
//     {
//       name: "图编号",
//       content: "测试"
//     },
//     {
//       name: "图名",
//       content: "测试"
//     },
//     {
//       name: "空间位置",
//       content: "测试"
//     },
//     {
//       name: "服务类型",
//       content: "测试"
//     },
//     {
//       name: "坐标范围",
//       content: "测试"
//     },
//     {
//       name: "坐标系",
//       content: "测试"
//     },
//     {
//       name: "投影类型",
//       content: "测试"
//     }
//   ],
//   correlation: [{
//     name: 'xxxxxxxx',
//     content: 'yyyyyy'
//   }]
// }
</script>

<style module lang="less">
@import "./small.less";
</style>
