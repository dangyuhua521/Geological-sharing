import axios from "axios";
import {
  Message,
  Notification
} from "element-ui";
import {
  getToken
} from "@/utils/auth";
import {
  get
} from "lodash";
import {
  API
} from "@/const";
import {router} from '../router'
const http = axios.create({
  baseURL: API,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Cache-Control": "no-cache",
    "Authorization": "Bearer " + get(getToken() ? JSON.parse(getToken()) : null, "access_token")
  },
  timeout: 35000
});

http.interceptors.request.use(
  config => {
    const data = getToken() ? JSON.parse(getToken()) : null;
    config.headers = {
      ...config.headers,
      Authorization: "Bearer " + get(data, "access_token")
    };
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

http.interceptors.response.use(
  response => {
    let res = "";
    if (response.data.d == null) {
      res = response.data;
    } else {
      res = eval("(" + response.data.d + ")"); //注意是json字符串，传到前台是还需要转化为json对象。
    }
    if (res.code !== 1) {
      if (res.message == "UserNotExist")
        res.message = "账号不存在"
      else if (res.message == "PwdError")
        res.message = "密码错误"
      else if (res.message == "PwdErrortimeout")
        res.message = "密码错误次数太多 请稍后再试"
      Notification({
        message: res.message,
        type: "error",
        offset: 100,
      });
      if (res.code === 401 || res.message == "登录过期,请重新登录") {
        Notification({
          message: res.message,
          type: "error",
          offset: 100,
        });
        setTimeout(() => {
          store.dispatch("FedLogOut").then(() => {
            location.reload(); // 为了重新实例化vue-router对象 避免bug
          });
        }, 200);
      }
      return Promise.reject("error");
    } else {
      return res; //response.data
    }
  },
  error => {
    if(error && error.response) {
      Notification({
        message: '登录过期，请重新登录',
        type: "error",
        offset: 100,
      });
      router.push('/login')
    } else {
      error.message = "连接到服务器失败";
    }
    return Promise.reject(error);
  }
);
export default http;

// 下载文件用
export const clearDownloadFileHttp = axios.create({
  baseURL: API,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Cache-Control": "no-cache",
    "Authorization": "Bearer " + get(getToken() ? JSON.parse(getToken()) : null, "access_token")
  },
  timeout: 35000
});
