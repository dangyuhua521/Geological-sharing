<template>
    <div :class="$style.container">
        <img
            :class="$style.logo"
            @click="$router.push('/homePage')"
            src="/static/img/logo.png"
            alt=""
        />
        <div :class="$style.register">
            <h2>
                用户注册
            </h2>
            <div
                :class="$style.back"
                @click="$router.replace('/login')"
                title="返回登录"
            >
                <img
                    src="/static/img/back.png"
                    title="返回登录"
                    alt="返回登录"
                />
            </div>
            <el-form
                :model="registerForm"
                :rules="rules"
                :inline="true"
                label-width="80px"
                ref="ruleForm"
                :status-icon="true"
            >
                <!-- <el-form-item prop="NAME">
                <p>邀请码</p>
                <el-input
                    v-model="registerForm.NAME"
                    autocomplete="off"
                    type="text"
                    placeholder="请输入邀请码"
                ></el-input>
                </el-form-item> -->
                <el-form-item prop="userName" required>
                    <p :class="$style.required">用户名</p>
                    <el-input
                        v-model="registerForm.userName"
                        autocomplete="off"
                        type="text"
                        placeholder="请输入用户名"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="password" required>
                    <p :class="$style.required">密码</p>
                    <el-input
                        v-model="registerForm.password"
                        autocomplete="off"
                        @focus="hidePWDCK = false"
                        @keyup.native="checkPWD"
                        @blur="hidePWDCK = true"
                        type="password"
                        placeholder="请输入密码"
                    ></el-input>
                    <div class="pwdCheck" v-if="!hidePWDCK">
                        <i :class="{ orange: pwdGrade >= 1 }"></i>
                        <i :class="{ yellow: pwdGrade >= 3 }"></i>
                        <i :class="{ green: pwdGrade >= 4 }"></i>
                        {{ pwdCheckword }}
                    </div>
                </el-form-item>
                <el-form-item prop="REPASSWORD" required>
                    <p :class="$style.required">确认密码</p>
                    <el-input
                        v-model="registerForm.REPASSWORD"
                        type="password"
                        placeholder="请输入确认密码"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="name" required>
                    <p :class="$style.required">姓名</p>
                    <el-input
                        v-model="registerForm.name"
                        type="text"
                        placeholder="请输入姓名"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="mailBox">
                    <p>邮箱</p>
                    <el-input
                        v-model="registerForm.mailBox"
                        type="text"
                        placeholder="请输入邮箱"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <p>性别</p>
                    <el-select
                        v-model="registerForm.sex"
                        placeholder="请选择性别"
                        style="width:100%"
                    >
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <p>生日</p>
                    <el-date-picker
                        v-model="registerForm.birth"
                        type="date"
                        style="width: 100%;"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd"
                        format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <p>籍贯</p>
                    <el-input
                        v-model="registerForm.native"
                        type="text"
                        placeholder="请输入籍贯"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <p>地址</p>
                    <el-input
                        v-model="registerForm.place"
                        type="text"
                        placeholder="请输入地址"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="phone"
                    ><p>联系电话</p>
                    <el-input
                        v-model="registerForm.phone"
                        type="text"
                        placeholder="请输入联系电话"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="idCard"
                    ><p>身份证</p>
                    <el-input
                        v-model="registerForm.idCard"
                        type="text"
                        placeholder="请输入身份证"
                    ></el-input>
                </el-form-item>
                <!-- <el-form-item
                ><p>单位</p>
                <el-input
                    v-model="registerForm.password"
                    type="text"
                    placeholder="请输入单位"
                ></el-input>
                </el-form-item> -->
            </el-form>
            <div :class="$style.actions">
                    <el-button
                        v-loading="loading"
                        @click.stop="submitForm('ruleForm')"
                        >注 册</el-button
                    >
                    <el-button
                        v-loading="loading"
                        @click="resetForm('ruleForm')"
                        >重 置</el-button
                    >
                </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码!'))
            } else {
                var pp = /^(\w){1,20}$/
                if (!pp.test(value)) {
                    callback(new Error('密码不合法，请英文字母、数字或下划线'))
                }
                callback()
            }
        }
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码!'))
            } else if (value !== this.registerForm.password) {
                callback(new Error('两次输入密码不一致!'))
            } else {
                callback()
            }
        }
        var checkName = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('用户名不能为空!'))
            } else {
                // this.$axios.post("/SystemRegister/CreateRegister", {
                //   name: value
                // })
                // .then(res => {
                //   if (res.code == 20000) {
                //     callback();
                //   } else {
                //     callback(res.message);
                //   }
                // });
                callback();
            }
        }
        return {
            loading: false,
            reset: {},
            dialogTableVisible: false,
            options: [
                {
                    value: 1,
                    label: '男'
                },
                {
                    value: 2,
                    label: '女'
                }
            ],
            sexValue: '',
            registerForm: {
                userName: '',
                password: '',
                REPASSWORD: '',
                name: ''
            },
            rules: {
                userName: [
                    {
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    },
                    {
                        validator: checkName,
                        trigger: ['blur']
                    }
                ],
                password: [
                    {
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    },
                    {
                        min: 6,
                        max: 20,
                        message: '长度在 6 到 20 个字符',
                        trigger: 'blur'
                    },
                    {
                        validator: validatePass,
                        trigger: ['blur', 'change']
                    }
                ],
                REPASSWORD: [
                    {
                        required: true,
                        validator: validatePass2,
                        trigger: ['blur', 'change']
                    }
                ],
                name: [
                    {
                        required: true,
                        message: '请输入您的姓名',
                        trigger: 'blur'
                    }
                ],
                // mailBox: [
                //   {
                //     required: true,
                //     message: "请输入邮箱地址",
                //     trigger: "change"
                //   },
                //   {
                //     type: "email",
                //     message: "请输入正确的邮箱地址",
                //     trigger: ["blur", "change"]
                //   }
                // ],
                idCard: [
                    {
                        pattern: /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i,
                        message: '请输入正确格式的身份证号',
                        trigger: ['blur', 'change']
                    }
                ],
                phone: [
                    {
                        pattern: /^1[34578]\d{9}$/,
                        message: '请输入正确格式的手机号',
                        trigger: ['blur', 'change']
                    }
                ]
            },
            pwdGrade: 0,
            pwdCheckword: '',
            hidePWDCK: true
        }
    },
    methods: {
        checkPWD(el) {
            this.hidePWDCK = false
            var value = this.registerForm.password
            var level = 0,
                arr = ['', '低', '低', '中', '高', '高']
            if (/[1-9]/.test(value)) {
                level++
            }
            if (/[a-z]/.test(value)) {
                level++
            }
            if (/[A-Z]/.test(value)) {
                level++
            }
            var l = value.toString().split('_')
            if (l.length > 1) {
                level++
            }
            this.pwdCheckword = arr[level]
            this.pwdGrade = level
        },
        //注册
        async submitForm() {
            // const valid = this.$refs[formName].validate().catch(_ => {})
            const _this = this
            console.info(_this.$refs['ruleForm'].validate())
            this.$nextTick(_ => {
                _this.$refs['ruleForm'].validate((valid, data) => {
                    if (valid) {
                        _this.$axios
                            .post('/SystemRegister/CreateRegister', {
                                userName: _this.registerForm.userName || '',
                                password: _this.registerForm.password || '',
                                REPASSWORD: _this.registerForm.REPASSWORD || '',
                                name: _this.registerForm.name || '',
                                mailBox: _this.registerForm.mailBox || '',
                                sex: _this.registerForm.sex || '',
                                birth: _this.registerForm.birth || '',
                                native: _this.registerForm.native || '',
                                phone: _this.registerForm.phone || '',
                                idCard: _this.registerForm.idCard || ''
                            })
                            .then(res => {
                                if (res.code == 1) {
                                    _this.$notify({
                                        message: '注册成功',
                                        type: 'success',
                                        offset: 100
                                    })
                                    _this.$router.push('/')
                                } else {
                                    _this.$notify({
                                        message: '注册失败',
                                        type: 'error',
                                        offset: 100
                                    })
                                }
                            })
                    } else {
                        console.log('错误消息', data)
                    }
                })
            })
        },

        //重置
        resetForm(formName) {
            this.registerForm = {
                name: '',
                password: '',
                userName: '',
                sex: '',
                mailBox: '',
                native: '',
                birth: '',
                idCard: '',
                place: '',
                phone: ''
            }
            this.$refs[formName].resetFields()
        }
    }
}
</script>
<style module lang="less">
@import './index.less';
</style>
