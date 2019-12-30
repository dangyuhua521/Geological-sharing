import ElementUI from "element-ui";
import EasyBar from "easy-bar";
import request from "@/utils/request";
import { API } from "@/const";
import axios from "axios";

const plugin = {
  async install(Vue) {
    Vue.use(ElementUI);
    Vue.use(EasyBar);
    Vue.filter("dateFilter", function(value) {
      if (value == null || value.length < 4) return "";
      let date = new Date(value);
      let Y = date.getFullYear() + "-";
      let M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      let D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      return Y + M + D;
    });
    
    const fn = Vue.prototype;
    fn.$http = axios;
    fn.$axios = request;
    fn.api = API;
    fn.weekStatus = true;
    fn.userInfo = {};
  }
};

export default plugin;
