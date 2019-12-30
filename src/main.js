import Vue from "vue";
import "normalize.css/normalize.css"; // A modern alternative to CSS resets
import "babel-polyfill";
import "es6-promise/auto";
import "element-ui/lib/theme-chalk/index.css";
import plugin from "@/utils/plugin";
import "./../static/css/public.scss";
import "./../static/css/default.scss";
import App from "./App";
import "jQuery";
//import 'jquery-transport-xdr/dist/jquery.transport.xdr.min.js'
import VueMeta from "vue-meta";
Vue.use(VueMeta);
import { router } from "@/router";
import store from "./store";
// import moment from 'moment';
// moment.lang('zh-cn');
// Vue.prototype.$moment = moment;

Vue.use(plugin)

Vue.config.productionTip = false;
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  // render: h => h(App),
  template: "<App/>"
});

router.beforeEach((to, from, next) => {    
  // chrome
  document.body.scrollTop = 0
  // firefox
  document.documentElement.scrollTop = 0
  // safari
  window.pageYOffset = 0
  next()
})

Vue.filter('timeFilter', function (value) {
  if (value == null || value.length < 4)
    return "";
  let date = new Date(value);
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
  return Y + M + D;

})
Vue.filter("longtimeFilter", function(value) {
  // console.log(value)
  if (value == null || value.length < 4) return "";
  let date = new Date(value);
  let Y = date.getFullYear() + "-";
  let M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  let D =
    (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
  let hh =
    (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
  let mm =
    (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
    ":";
  let ss =
    (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()) +
    " ";
  return Y + M + D + hh + mm + ss;
});
Vue.filter('filterYearMonth', function (value, formatString) {
  formatString = formatString || 'YYYY-MM';
  // return moment(value).format(formatString); // value可以是普通日期 20170723
  return filterYearMonth.unix(value).format(formatString); // 这是时间戳转时间
});


