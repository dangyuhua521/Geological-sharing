<template>
  <div id="app">
    <router-view v-loading="loading"  key="key"/>
    <!--	<iframe width="0" height="0" name="downloadForm" id="downloadForm"></iframe>-->
  </div>
</template>

<script>
export default {
  computed: {
    loading() {
      return this.$store.state.loading
    }
  }
}
</script>

<style>
#app,
html,
body {
  height: 100%;
  width: 100%;
  overflow: auto;
  min-width: 1520px;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
.el-select-dropdown .el-scrollbar__wrap {
  overflow: scroll;
}
.title_sys {
  font-size: 24px;
  border-bottom: 1px solid #e7ecf0;
  line-height: 2em;
  margin-bottom: 30px;
}
.custom-tree-node:nth-child(2) {
  width: 300px;
  -webkit-line-clamp: 1;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  /* 	white-space: normal; */
}
body,
div,
dl,
dt,
dd,
ul,
ol,
li,
h1,
h2,
h3,
h4,
h5,
h6,
pre,
code,
form,
fieldset,
legend,
textarea,
p,
blockquote,
th,
td,
input,
select,
textarea,
button,
img {
  padding: 0;
  margin: 0;
}
</style>
