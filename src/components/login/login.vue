<template>
  <div :class="$style.loginBg">
    <img :class="$style.logo" @click="$router.push('/homePage')" src="/static/img/logo.png" alt="" />
    <div :class="$style.loginBox">
      <div :class="$style.loginMask">
        <div :class="$style.loginTitle">用户登录</div>
        <el-form
          :class="$style.loginMain"
          :model="loginForm"
          :rules="loginRules"
          ref="loginForm"
        >
          <el-form-item prop="userName" style="margin-top: 30px;">
            <el-input
              name="username"
              type="text"
              autocomplete="off"
              class="icon-input "
              @keyup.enter.native="handleLogin"
              v-model="loginForm.userName"
              placeholder="请输入您的账号"
            />
            <i :class="$style.myIconUser"></i>
          </el-form-item>
          <el-form-item prop="password" style="margin-top: 20px;">
            <el-input
              name="password"
              class="icon-input"
              autocomplete="off"
              :type="pwdType"
              @keyup.enter.native="handleLogin"
              v-model="loginForm.password"
              placeholder="请输入您的密码"
            />
            <i :class="$style.myIconpassword"></i>
          </el-form-item>
          <el-form-item style="margin-top: 20px;">
            <el-button
              type="primarys"
              :class="$style.loginBtn"
              :loading="loading"
              @click.native.prevent="handleLogin"
            >
              登 录
            </el-button>
            <div :class="$style.actions">
              没有账号?
              <span @click="routeNav('/register')">立即注册 </span>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'
import { initRoute } from '@/utils/router'
import {
  removeToken,
  removeUserInfo,
  setToken,
  setUserInfo,
  getUserInfo
} from '@/utils/auth'

export default {
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入的用户名'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        userName: '',
        password: ''
      },
      loginRules: {
        userName: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password',
      actPath: ''
    }
  },
  mounted() {
    localStorage.clear()
    sessionStorage.clear()
  },
  methods: {
    routeNav(path) {
      this.topBol = false
      this.$router.push(path)
    },
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
 
      this.$refs.loginForm.validate(valid => {
        
        if (valid) {
          this.loading = true
          const { userName, password } = this.loginForm
          this.$store
            .dispatch('useLogin', { userName, password })
            .then(res => {
      
                 this.loading = false
              const [route] = initRoute(res.data.functionTree, this.$router)
              this.$router.push(route.path)
               
      
            })
            .catch(err => {
              this.loading = false
            })
        }
      })
    }
  }
}
</script>
<style module lang="less">
@import './index.less';
</style>
