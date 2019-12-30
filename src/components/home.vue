<template>
  <el-container class="container2">
    <el-header class="header" height="80px">
      <div class="header-left" @click="$router.push('/homePage')"></div>
      <div class="header-right">
        <ul>
          <li
            :class="getMenuActive(item.name)"
            @click="routerChange(item.path)"
            v-for="item in menuList"
            :key="item.path"
          >{{ item.name }}</li>
        </ul>
        <div :class="['actions', { 'not-login': !isLogin }]">
          <template v-if="isLogin">
            <!-- <el-badge :value="3">
              <div class="news"></div>
            </el-badge>-->
            <el-popover placement="bottom-end" v-model="showMsgs" width="200" trigger="click">
              <div slot="reference" style="display: inline-block;">
                <el-badge
                  :is-dot="(msgList.approvalFinish&&msgList.approvalFinish.length>0)||
							(msgList.approval1&&msgList.approval1.length>0)||
							(msgList.approval2&&msgList.approval2.length>0)||
							(msgList.approval3&&msgList.approval3.length>0)"
                  class="item"
                  style="line-height: 15px;margin: 0 15px;"
                >
                  <i
                    class="iconfont icon-msg"
                    style="margin: 0;font-size: 30px;cursor:pointer;vertical-align: middle;"
                  ></i>
                </el-badge>
              </div>
              <div class="msgList">
                <ul
                  v-if="msgList.approvalFinish||
                          msgList.approval1||
                          msgList.approval2||
                          msgList.approval3"
                >
                  <li
                    v-if="msgList.approvalFinish"
                    @click="routerTo('approvalFinish','/personalCenter/order')"
                  >{{msgList.approvalFinish}}</li>
                  <li
                    v-if="msgList.approval1"
                    @click="routerTo('approval1','/serverManager/satelliteRemote')"
                  >{{msgList.approval1}}</li>
                  <li
                    v-if="msgList.approval2"
                    @click="routerTo('approval2','/serverManager/geologyAchievement')"
                  >{{msgList.approval2}}</li>
                  <li
                    v-if="msgList.approval3"
                    @click="routerTo('approval3','/serverManager/geologyThematic')"
                  >{{msgList.approval3}}</li>
                  <!-- approvalFinish(我的订单)  approval1(卫星遥感资源订单管理) approval2(地质成果数据订单管理) approval3(地质专题产品订单管理)-->
                </ul>
                <p v-else style="text-align: center;color: #999;">暂无消息通知</p>
              </div>
            </el-popover>
            <span
              v-if="stytemFirstPath"
              class="system"
              @click="routeNav(stytemFirstPath)"
              title="系统管理"
            ></span>
            <span v-if="userFirstPath" class="user" @click="routeNav(userFirstPath)" title="个人中心"></span>
            <span>{{UserInfo.user.userName}}</span>
            <i class="my-icon-out" @click="exit" title="退出登录"></i>
          </template>
          <template v-else>
            <el-button
              class="radius"
              size="small"
              @click="routeNav('/register')"
              style="height: 38px;"
            >注册</el-button>
            <el-button
              type="primarys"
              class="radius"
              size="small"
              style="height: 38px;"
              @click="routeNav('/login')"
            >登录</el-button>
          </template>
        </div>
      </div>
    </el-header>

    <el-main class="main" ref="main">
      <div id="target"></div>
      <router-view />

      <el-footer
        class="footer"
        v-if="$route.name!='卫星遥感资源大厅'&&$route.name!='地质专题产品'&&$route.name!='地质成果数据'&&$route.name!='地质档案'"
      >
        <div class="footer-content">
          <el-row>
            <el-col :span="24">
              <img src="../../static/img/dibucopyright.png" style="width:100%;height:auto" />
            </el-col>
          </el-row>
        </div>
      </el-footer>
    </el-main>
  </el-container>
</template>
<script>
import {
  removeToken,
  removeUserInfo,
  getUserInfo,
  getToken
} from '@/utils/auth'
import { signalRUrl } from '@/const/index'
export default {
  data() {
    return {
      user: {},
      scrollTop: '',
      istoken: false,
      UserInfo: {
        user: {
          userName: ''
        }
      },
      msgList: [],
      showMsgs: false,
      chat: null,
      isLogin: false
    }
  },
  computed: {
    stytemFirstPath() {
      const { children } = this.$router.options.routes.find(
        route => route.name === 'home'
      )
      const data = children.find(item => item.path === '/serverManager')
      if (!data) {
        return null
      } else {
        return this.deepChildrenFirstPath(data)
      }
    },
    userFirstPath() {
      const { children } = this.$router.options.routes.find(
        route => route.name === 'home'
      )
      const data = children.find(item => item.path === '/personalCenter')
      if (!data) {
        return null
      } else {
        return this.deepChildrenFirstPath(data)
      }
    },
    menuList() {
      const { children } = this.$router.options.routes.find(
        route => route.name === 'home'
      )
      const routes = children.filter(item => {
        return item.path !== '/serverManager' && item.path !== '/personalCenter'
      })
      return routes.length > 1 ? routes : []
    }
  },

  mounted() {
    this.InitUser()
    this.msgList = []
    this.getHistoryMsg()
    this.$nextTick(() => {
      this.initSignalR()
    })
    this.validateLogin()
  },
  methods: {
    validateLogin() {
      const { children } = this.$router.options.routes.find(
        route => route.name === 'home'
      )
      this.isLogin = children.length > this.menuList.length
    },

    deepChildrenFirstPath(route) {
      if (route.children && route.children.length) {
        return this.deepChildrenFirstPath(route.children[0])
      } else {
        return route.path
      }
    },
    getMenuActive(name) {
      return this.$route.name == name || this.$route.meta.menu == name
        ? 'active'
        : ''
    },
    routerChange(path) {
      this.$router.push(path)
      document.getElementById('target').scrollIntoView()
    },
    routeNav(path) {
      this.$router.push(path)
      document.getElementById('target').scrollIntoView()
    },

    exit() {
      this.$confirm('是否退出当前用户登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          removeToken()
          localStorage.clear()
          this.istoken = false
          this.user = {}
          this.$router.push('/login')
          this.$notify({
            type: 'success',
            message: '退出成功',
            offset: 100
          })
          setTimeout(() => {
            window.location.reload()
          }, 10)
        })
        .catch(() => {
          this.$notify({
            type: 'info',
            message: '已取消退出',
            offset: 100
          })
        })
    },

    initSignalR() {
      let _this = this
      $.connection.hub.url = signalRUrl
      this.chat = $.connection.myHub
      var msg = {}
      // 接收消息
      this.chat.client.PushMessage = message => {
        console.log('message', message)
        msg = JSON.parse(message)
        console.log('msg', msg)
        for (var item in msg) {
          if (msg[item]) {
            _this.msgList[item] = msg[item]
          }
        }
        $('#message').focus()
      }
      var connectionStateChanged = state => {
        if (state.newState == 4) {
          setTimeout(function() {
            $.connection.hub.start()
          }, 2000)
        }
        var stateConversion = {
          0: 'connecting',
          1: 'connected',
          2: 'reconnecting',
          4: 'disconnected'
        }
      }
      $('#message').focus()

      $.connection.hub.stateChanged(connectionStateChanged)
      $.connection.hub.disconnected(function() {
        console.log('掉线')
        setTimeout(function() {
          $.connection.hub.start()
        }, 1000)
      })
      console.log('uid', this.UserInfo.user.id)
      $.connection.hub.qs = {
        userId: this.UserInfo.user.id,
        userModel: 88888 //JSON.stringify(this.UserInfo)
      }

      $.connection.hub.start().done(() => {
        //模拟数据，要删掉
        // approvalFinish(我的订单)  approval1(卫星遥感资源订单管理) approval2(地质成果数据订单管理) approval3(地质专题产品订单管理)
        // let msg={approvalFinish:"我的订单有信息，请查看！",url:'/personalCenter/order',FuncCode:"approvalFinish"}
        //发送消息
        // this.chat.server.sendMessage(this.UserInfo.user.id,JSON.stringify(msg) );
        //  msg={approval1:"卫星遥感资源订单管理有信息，请查看！",url:'/serverManager/satelliteRemote',FuncCode:"approval1"}
        // //发送消息
        // this.chat.server.sendMessage(this.UserInfo.user.id,JSON.stringify(msg) );
        //  msg={approval2:"地质成果数据订单管理有信息，请查看！",url:'/serverManager/geologyAchievement',FuncCode:"approval2"}
        // //发送消息
        // this.chat.server.sendMessage(this.UserInfo.user.id,JSON.stringify(msg) );
        //  msg={approval3:"地质专题产品订单管理有信息，请查看！",url:'/serverManager/geologyThematic',FuncCode:"approval3"}
        // //发送消息
        // this.chat.server.sendMessage(this.UserInfo.user.id,JSON.stringify(msg) );
      })
    },
    created() {
      var data = localStorage.getItem('token')
      if (data) {
        this.istoken = true
      } else {
        this.istoken = false
      }
    },
    InitUser() {
      if (JSON.parse(getUserInfo())) {
        this.UserInfo = JSON.parse(getUserInfo())
      }
    },
    routerTo(funcCode, path) {
      this.showMsgs = false
      this.readMsg(funcCode)
      this.$router.push(path)
      document.getElementById('target').scrollIntoView()
    },
    getHistoryMsg() {
      this.$axios.get('/SystemMESSAGEPUSHINFO/GetNoReadMsg').then(res => {
        this.msgList = res.data || []
        // for (var item in res.data) {
        //   if (res.data[item]) {
        //     this.msgList[item] = res.data[item]
        //   }
        // }
      })
    },
    readMsg(funcCode) {
      this.$axios
        .get('/SystemMESSAGEPUSHINFO/ReadMsg', {
          params: {
            funccode: funcCode
          }
        })
        .then(res => {
          this.msgList[funcCode] = null
        })
    }
  },
  watch: {
    '$route.path'() {
      this.validateLogin()
    }
  }
}
</script>

<style scoped="scoped" lang="less">
.el-button--primarys {
  background: #0f8deb !important;
  color: #fff;
}
.home-buttons {
  margin-top: 15px;
}
.container2 {
  width: 100%;
  overflow: auto;
  height: 100%;
  position: relative;
  display: flex;
  // flex-direction: column;
  .content {
    flex: 1;
    padding: 0;
  }
}

.header {
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0px 0px 15px #7a7878;
  position: relative;
  z-index: 1;
  display: flex;
  padding: 0;

  &-left {
    background: url(../../static/img/header-bg-left.jpg) center center no-repeat;
    background-size: 100% 100%;
    width: 580px;
    cursor: pointer;
  }
  &-right {
    flex: 1;
    display: flex;
    background: url(../../static/img/header-bg-right.jpg) center center
      no-repeat;
    background-size: 100% 100%;
    padding-top: 14px;
    ul {
      padding-right: 73px;
      flex: 1;
      display: flex;
      li {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        flex: auto;
        position: relative;
        &:hover,
        &.active {
          color: #0f8deb;
          &:after {
            display: block;
            content: '';
            width: 40px;
            height: 3px;
            background: #0f8deb;
            position: absolute;
            bottom: 4px;
            left: 50%;
            transform: translateX(-50%);
          }
        }
      }
    }
    .actions {
      width: 286px;
      display: flex;
      justify-content: left;
      align-items: center;
      &.not-login {
        width: 206px;
        box-sizing: border-box;
        padding-right: 30px;
        justify-content: space-between;
        button {
          width: 80px;
          height: 32px;
        }
      }
      > div,
      > span {
        cursor: pointer;
      }
      > div {
        margin-right: 29px;
      }
      .system {
        background: url('../../static/img/icon/system.png') no-repeat;
        // background-image: url('/static/img/icon/system.png');
        width: 24px;
        height: 28px;
        margin-right: 19px;
      }
      .user {
        margin-right: 10px;
        & + span {
          padding-right: 20px;
          position: relative;
          &:after {
            position: absolute;
            right: -20px;
            top: -5px;
            display: block;
            content: '';
            height: 28px;
            width: 2px;
            margin-right: 20px;
            background: #d3d8dc;
          }
        }
      }
      i {
        margin-left: 20px;

        color: #999;
        font-size: 24px;
      }
    }
  }
}

.main {
  position: relative;
  z-index: 0;
  background: #ffffff;
  padding: 0;
}

.hasFooter {
  min-height: calc(100% - 347px);
  height: auto;
  position: relative;
}

.radius {
  border-radius: 50px;
  padding: 8px 20px;
  text-align: center;
}

.f-r {
  float: right;
}

.tel i {
  font-size: 28px;
}

.contact p {
  line-height: 2em;
}

.scrollTop {
  width: 55px;
  height: 55px;
  background: #238df6;
  color: #ffffff;
  text-align: center;
  position: fixed;
  z-index: 9999;
  right: 40px;
  bottom: 200px;
  cursor: pointer;
}

.scrollTop i {
  line-height: 55px;
  font-size: 30px;
}
.my-icon-out {
  background: url('../../static/img/icon/out.png') no-repeat;
  // background: url('/static/img/icon/out.png')no-repeat;
  width: 24px;
  height: 24px;
  display: inline-block;
}
.user {
  width: 28px;
  height: 28px;
  cursor: pointer;
  background-image: url('../../static/img/logo/user.png');
  // background-image: url('/static/img/logo/user.png');
}
.msgList li {
  padding: 8px;
  cursor: pointer;
}
.msgList li:hover {
  background: rgba(0, 0, 0, 0.1);
}
.news {
  display: inline-block;
  width: 27px;
  height: 24px;
  text-decoration: underline;
  vertical-align: middle;
  cursor: pointer;
  background-image: url('../../static/img/logo/news.png');
}
</style>

<style lang="less" scope="scope">
.el-badge__content.is-fixed {
  position: absolute;
  top: 0px;
  right: 10px;
  -webkit-transform: translateY(-50%) translateX(100%);
  transform: translateY(-50%) translateX(100%);
}
.el-dialog {
  border-radius: 7px;
}
.has-scrollbar .el-dialog__body {
  padding-right: 0;
  padding-bottom: 10px;
}

.detail {
  li {
    padding: 3px 0;
    box-sizing: border-box;
    display: table;
    line-height: 2em;
    text-align: left;
    label {
      width: 6em;
      text-align: right;
      display: table-cell;
      margin-right: 8px;
      vertical-align: top;
      font-size: 15px;
      line-height: 2em;
    }
    span {
      font-size: 15px;
      text-align: left;
      display: table-cell;
      /*width: 440px;*/
      padding-left: 10px;
      line-height: 2em;
      word-break: normal;
      display: inline-block;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    img {
      vertical-align: middle;
    }
  }
}
.footer-content {
  // padding-top: 25px;
  margin: 0 auto;
}
.footer {
  display: block;
  // background: #e5e5e5;
  width: 100%;
  padding: 0;
}
</style>
