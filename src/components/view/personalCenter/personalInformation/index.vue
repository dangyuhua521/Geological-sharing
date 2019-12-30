<template>
    <div :class="$style.subMain">
        <div :class="$style.tableBox" style="width:calc(100% - 0px);">
            <MenuTitle />
            <!-- <div :class="$style.titleSys">个人信息</div> -->
            <div :class="$style.tableBorder">
                <div style="margin-top:20px">
                    <span :class="$style.userInfo"></span>
                    <span :class="$style.tablexin">基本信息</span>
                    <el-form label-width="5em">
                        <el-form-item
                            label="用户名"
                            :class="$style.half"
                            style="margin-top:20px;"
                            >{{ userInfo.userName }}</el-form-item
                        >
                        <el-form-item label="姓名" :class="$style.half">{{
                            userInfo.name
                        }}</el-form-item>
                        <el-form-item label="角色" :class="$style.half">{{
                            userInfo.roleNames
                        }}</el-form-item>
                        <el-form-item label="性别" :class="$style.half">{{
                            userInfo.sex
                        }}</el-form-item>
                        <el-form-item label="生日" :class="$style.half">{{
                            userInfo.birth | timeFilter
                        }}</el-form-item>
                        <el-form-item label="身份证" :class="$style.half">{{
                            userInfo.idCard
                        }}</el-form-item>
                        <el-form-item label="部门" :class="$style.half">{{
                            userInfo.depName
                        }}</el-form-item>
                        <el-form-item label="籍贯" :class="$style.half">{{
                            userInfo.native
                        }}</el-form-item>
                    </el-form>
                </div>
            </div>
            <div :class="$style.tableFooter">
                <div style="margin-top:20px">
                    <span :class="$style.userInfo"></span>
                    <span :class="$style.tablexin">联系方式</span>
                    <el-form label-width="5em">
                        <el-form-item
                            label="邮箱"
                            :class="$style.half"
                            style="margin-top:20px"
                            >{{ userInfo.mailBox }}</el-form-item
                        >
                        <el-form-item label="手机号" :class="$style.half">{{
                            userInfo.phone
                        }}</el-form-item>
                        <el-form-item label="地址" :class="$style.half">{{
                            userInfo.place
                        }}</el-form-item>
                    </el-form>
                </div>
            </div>
            <div :class="$style.footer">
                <el-button type="primary" size="small" @click="edit()"
                    >编辑</el-button
                >
                <el-button
                    type="primary"
                    size="small"
                    @click="ShowUpdateUserPassword()"
                    >修改密码</el-button
                >
            </div>
        </div>
        <el-dialog
            title="编辑"
            append-to-body
            :visible.sync="dialogFormVisible"
            width="800px"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
        >
            <el-form
                :model="dataForm"
                label-width="140px"
                size="small"
                :rules="rules"
                ref="registerForm"
            >
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="用户名" prop="userName">
                            <el-input
                                name="userName"
                                v-model="dataForm.userName"
                                auto-complete="off"
                                style="width:200px;"
                                :disabled="true"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="姓名" prop="name">
                            <el-input
                                name="name"
                                v-model="dataForm.name"
                                auto-complete="off"
                                style="width:200px;"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="角色" prop="roleNames">
                            <el-input
                                name="roleIdList"
                                v-model="dataForm.roleNames"
                                auto-complete="off"
                                :disabled="true"
                                style="width:200px;"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="性别" prop="sex">
                            <el-input
                                name="sex"
                                v-model="dataForm.sex"
                                auto-complete="off"
                                style="width:200px;"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="生日">
                            <el-date-picker
                                style="width:200px;"
                                v-model="dataForm.birth"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="身份证" prop="idCard">
                            <el-input
                                name="idCard"
                                v-model="dataForm.idCard"
                                auto-complete="off"
                                style="width:200px;"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="部门">
                            <el-input
                                name="depName"
                                v-model="dataForm.depName"
                                auto-complete="off"
                                style="width:200px;"
                                :disabled="true"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="籍贯">
                            <el-input
                                name="native"
                                v-model="dataForm.native"
                                auto-complete="off"
                                style="width:200px;"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="邮箱" prop="mailBox">
                            <el-input
                                name="mailBox"
                                v-model="dataForm.mailBox"
                                auto-complete="off"
                                style="width:200px;"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="手机号">
                            <el-input
                                name="phone"
                                v-model="dataForm.phone"
                                auto-complete="off"
                                style="width:200px;"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="地址">
                            <el-input
                                name="place"
                                v-model="dataForm.place"
                                auto-complete="off"
                                style="width:200px;"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false" size="small"
                    >取 消</el-button
                >
                <el-button
                    type="primary"
                    @click="AddMap()"
                    size="small"
                    :loading="isControlSaveBtnLoading"
                    :disabled="isControlSaveBtnLoading"
                    >确 定</el-button
                >
            </div>
        </el-dialog>
        <el-dialog
            title="修改密码"
            append-to-body
            :visible.sync="modifyFormVisible"
            width="600px"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
        >
            <el-form
                :model="registerForm"
                :rules="rule"
                ref="registerForm"
                label-width="140px"
                size="small"
            >
                <el-form-item label="旧密码" prop="oldPassword">
                    <el-input
                        v-model="registerForm.oldPassword"
                        autocomplete="off"
                        type="password"
                        placeholder="请输入旧密码"
                    ></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="password">
                    <el-input
                        v-model="registerForm.password"
                        autocomplete="off"
                        @focus="hidePWDCK = false"
                        @keyup.native="checkPWD"
                        @blur="hidePWDCK = true"
                        type="password"
                        placeholder="请输入新密码"
                    ></el-input>
                    <div class="pwdCheck" v-if="!hidePWDCK">
                        <i :class="{ iorange: pwdGrade >= 1 }"></i>
                        <i :class="{ iyellow: pwdGrade >= 3 }"></i>
                        <i :class="{ igreen: pwdGrade >= 4 }"></i>
                        {{ pwdCheckword }}
                    </div>
                </el-form-item>
                <el-form-item label="确认密码" prop="secondPassword">
                    <el-input
                        v-model="registerForm.secondPassword"
                        type="password"
                        placeholder="请输入确认密码"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="modifyFormVisible = false" size="small"
                    >取 消</el-button
                >
                <el-button
                    type="primary"
                    @click="UpdateUserPassword()"
                    size="small"
                    >确 定</el-button
                >
            </div>
        </el-dialog>
    </div>
</template>
<script>
import MenuTitle from '@/components/menuTitle'
import SearchBtn from '@/components/searchBtn'
import { removeToken, removeUserInfo, getUserInfo } from '@/utils/auth.js'
import Axios from 'axios'
import moment from 'moment'
export default {
    components: {
        MenuTitle,
        SearchBtn
    },
    data() {
        var validatePass0 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入旧密码!'))
            } else {
                var pp = /^(\w){1,20}$/
                if (!pp.test(value)) {
                    callback(new Error('密码不合法，请英文字母、数字或下划线'))
                }
                callback()
            }
        }
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入新密码!'))
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
        return {
            userInfo: {},
         
            rule: {
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
                ],
                mailBox: [
                    {
                        required: true,
                        message: '请输入邮箱地址',
                        trigger: 'change'
                    },
                    {
                        type: 'email',
                        message: '请输入正确的邮箱地址',
                        trigger: ['blur', 'change']
                    }
                ],
                oldPassword: [
                    {
                        required: true,
                        message: '请输入旧密码',
                        trigger: 'blur'
                    }
                ],

                password: [
                    {
                        required: true,
                        message: '请输入新密码',
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
                secondPassword: [
                    {
                        validator: validatePass2,
                        trigger: ['blur', 'change']
                    }
                ]
            },
            pwdGrade: 0,
            pwdCheckword: '',
            hidePWDCK: true,
            value: '',
            isControlSaveBtnLoading: false,
            modifyFormVisible: false,

            registerForm: {
                oldPassword: '',
                password: '',
                secondPassword: ''
            },
            options: [
                {
                    value: '1',
                    label: '男'
                },
                {
                    value: '2',
                    label: '女'
                }
            ],
            dataForm: {},
            dialogFormVisible: false,
            rules: {
                userName: [
                    {
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    }
                ],
                name: [
                    {
                        required: true,
                        message: '请输入姓名',
                        trigger: 'blur'
                    }
                ],
                roleIdList: [
                    {
                        required: true,
                        message: '请选择角色',
                        trigger: 'change'
                    }
                ]
            },
            rulesdep: {
                depName: [
                    {
                        required: true,
                        message: '请输入部门名称',
                        trigger: 'blur'
                    }
                ]
            }
        }
    },

    methods: {
        edit() {
            this.dialogFormVisible = true
            this.dataForm = JSON.parse(JSON.stringify(this.userInfo))
        },
        AddMap() {
            this.$axios
                .post('/SystemUser/UpdateUser', this.dataForm)
                .then(res => {
                    this.$notify({
                        type: 'success',
                        message: '操作成功',
                        offset: 100
                    })
                    this.dialogFormVisible = false
                    this.getUserInfo()
                })
        },
        UpdateUserPassword() {
            this.$refs['registerForm'].validate(valid => {
                if (valid) {
                    this.$axios
                        .post('/SystemUser/ResetPassword', {
                            id: this.userInfo.id,
                            oldPassword: this.registerForm.oldPassword,
                            password: this.registerForm.password,
                            secondPassword: this.registerForm.secondPassword
                        })
                        .then(res => {
                            if (res.code == 1) {
                                this.$notify({
                                    message: '修改成功',
                                    type: 'success',
                                    offset: 100
                                });
                                this.exit()
                            }else{
                              this.$notify({
                                    message: '修改失败',
                                   type: 'error',
                                    offset: 100
                                })  
                            }

                            this.modifyFormVisible = false
                        })
                }
            })
        },
        exit() {
            localStorage.setItem("userInfo", "");
            localStorage.setItem("token", "");
            this.istoken = false;
            this.user = {};
            this.$router.push("/login");
        },
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
            this.pwdGrade = Number(level)
        },

        ShowUpdateUserPassword() {
            this.registerForm.password = ''
            this.registerForm.secondPassword = ''
            this.registerForm.oldPassword = ''
            this.modifyFormVisible = true;
            // this.$refs["registerForm"].resetFields();
        },
        getUserInfo() {
            this.$axios.get('/SystemUser/Personalinformation').then(res => {
                this.userInfo = res.data.data[0]
            })
        }
    },

    mounted() {
        this.getUserInfo()
        this.userInfo = JSON.parse(localStorage.getItem('UserInfo')).user
    }
}
</script>
<style module lang="less">
@import './index.less';
</style>
<style scoped="scoped" lang="less">
    .pwdCheck {
    i {
        display: inline-block;
        border-radius: 5px;
        height: 10px;
        width: 50px;
        vertical-align: middle;
        margin-right: 5px;
        background: #F0F0F0;
    }
    .iorange {
        background: #FFB608;
    }
    .iyellow {
        background: yellow;
    }
    .igreen {
        background: green;
    }
}
</style>