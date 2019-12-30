<template>
  <div class="notFound-bg">
    <div id="backHome">
      <router-link to="/homePage">
        <p >返回首页</p>
        <p style="font-size: 14px;" >Back Home</p>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  metaInfo: {
    title: '404-页面未找到'
  },
  methods: {
    routeNav(path) {
      this.$router.push(path)
    }
  },
  watch: {},
  created() {},
  mounted() {},
  destoryed() {}
}
</script>

<style scoped>
.notFound-bg {
  position: absolute;
  width: 100%;
  height: 100%;
}
#backHome {
  width: 600px;
  color: #0a0a0a;
  text-align: center;
  background: url('../../../static/img/404_03.png') no-repeat center center;
  height: 600px;
  margin: 0 auto;
  margin-top: -300px;
  top: 50%;
  position: absolute;
  left: 50%;
  margin-left: -300px;
}
#backHome a {
  position: absolute;
  display: inline-block;
  width: 10em;
  font-size: 16px;
  border: 4px double #838383;
  bottom: 3em;
  margin-left: -5em;
  line-height: 1.2em;
  color: #838383;
  padding: 4px;
  left: 50%;
}
#backHome a:hover {
  color: #deb979;
  border-color: #deb979;
}
@media only screen and (min-width: 100px) and (max-width: 640px) {
  #backHome {
    width: 90%;
    background-size: 100%;
    margin-left: -45%;
    height: 540px;
  }
}
</style>