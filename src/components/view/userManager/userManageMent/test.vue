<template>
    <div :class="$style.subMains" ref="container">
        <div :class="$style.titleSys">用户管理</div>
        <!-- <MenuTitle/> -->
        <div :class="$style.treeBox">
            <div :class="$style.treeTitle">
                <label>部门</label>
            </div>
            <div :class="$style.block">
                <el-scrollbar style="height: 100%;">
                    <el-tree
                        :data="ServiceTree"
                        accordion
                        @node-click="clickNodeTreeNode"
                        ref="ServiceTree"
                        node-key="depID"
                        :default-checked-keys="checkedSevice"
                        :expand-on-click-node="false"
                        highlight-current
                        :check-on-click-node="true"
                    >
                        <span
                            :class="$style.customTreeNode"
                            slot-scope="{ node, data }"
                        >
                            <el-radio
                                v-model="queryData.depID"
                                :disabeld="true"
                                :label="data.organid" style="margin-right: 0px;"
                                >&nbsp;</el-radio
                            >
                            <span>{{ data.treename }}</span>
                            <span :class="$style.radioFull"></span>
                        </span>
                    </el-tree>
                </el-scrollbar>
            </div>
        </div>

        <div :class="$style.tableBox" style="width:calc(100% - 300px);">
            <div :class="$style.searchHeader">
                <el-form :inline="true" ref="search">
                    <el-form-item label="关键字">
                        <el-input
                            placeholder="请输入关键字"
                            v-model="queryData.Keyword"
                            style="width: 200px;"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="角色">
                        <el-select
                            v-model="queryData.RoleId"
                            placeholder="请选择"
                            clearable
                        >
                            <el-option
                                v-for="item in optionsRoleList"
                                :key="item.id"
                                :label="item.roleName"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <SearchBtn @click="btnSearchUserData" />
                    <el-form-item style="float:right">
                        <div :class="$style.iconClick">
                            <span @click="showEditUser()">
                                <i
                                    class="iconfont el-icon-edit-outline"
                                    style="font-size:25px;"
                                ></i>
                                <span
                                    style="border-right:2px solid #E5E5E5;color:#666666"
                                    >编辑&nbsp;&nbsp;&nbsp;&nbsp;</span
                                >
                            </span>
                            <span @click="ShowUpdateUserPassword()">
                                <i
                                    class="iconfont el-icon-lock"
                                    style="font-size:25px;"
                                ></i>
                                <span style="color:#666666"
                                    >修改密码&nbsp;&nbsp;</span
                                >
                            </span>
                            <span plain @click="configurationRole">
                                <i
                                    class="iconfont my-icon-configuration"
                                    style="font-size:25px;margin-bottom:-4px; "
                                ></i>
                                <span style="color:#666666"
                                    >配置角色&nbsp;&nbsp;</span
                                >
                            </span>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
            <el-table
                highlight-current-row
                @current-change="handleCurrentChange"
                ref="singleTable"
                :data="tableData"
                :class="$style.noTableBefore"
                style="background-color:white;"
            >
                <el-table-column fixed type="index" label="序号" width="80">
                </el-table-column>
                <el-table-column fixed prop="userName" label="用户名" width="140">
                </el-table-column>
                <el-table-column prop="depName" label="部门" width="200">
                </el-table-column>
                <el-table-column prop="roleNames" label="角色" width="180">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="180">
                </el-table-column>
                <el-table-column prop="sex" label="性别"> </el-table-column>
                <el-table-column prop="birth" label="生日" width="120">
                    <template slot-scope="scope">
                        <span>{{ scope.row.birth | timeFilter }}</span>
                    </template></el-table-column
                >
                <el-table-column prop="native" label="籍贯" width="160">
                </el-table-column>
                <el-table-column prop="place" label="地址" width="180">
                </el-table-column>
                <el-table-column prop="phone" label="电话" width="180">
                </el-table-column>
                <el-table-column prop="idCard" label="身份证" width="180">
                </el-table-column>
                <el-table-column prop="mailBox" label="邮箱" width="200">
                </el-table-column>
            </el-table>
            <div :class="$style.paginationWrapper">
                <el-pagination
                    @current-change="handlePageChange"
                    :page-size="10"
                    :current-page.sync="queryData.Page"
                    background
                    layout="total,prev, pager, next,jumper"
                    :total="parseInt(total)"
                >
                </el-pagination>
            </div>
        </div>

        <el-dialog
            title="编辑"
            append-to-body
            :visible.sync="showEditDialog"
            :showDialogId="showDialogId"
            width="600px"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
        >
            <el-form
                :model="userForm"
                ref="ruleForm"
                label-width="80px"
                :rules="rules"
            >
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="用户名" prop="userName">
                            <el-input
                                type="text"
                                v-model="userForm.userName"
                                auto-complete="off"
                                :disabled="true"
                            ></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="姓名" prop="name">
                            <el-input
                                v-model="userForm.name"
                                auto-complete="off"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="性别" prop="sex">
                            <el-select
                                v-model="userForm.sex"
                                placeholder="请选择"
                            >
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="生日" prop="birth">
                            <el-date-picker
                                v-model="userForm.birth"
                                type="date"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd"
                                style="width: 202px;"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="籍贯" prop="native">
                            <el-input
                                v-model="userForm.native"
                                auto-complete="off"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="地址" prop="place">
                            <el-input
                                type="text"
                                v-model="userForm.place"
                                auto-complete="off"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="电话" prop="phone">
                            <el-input
                                type="text"
                                v-model="userForm.phone"
                                auto-complete="off"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="身份证" prop="idCard">
                            <el-input
                                v-model="userForm.idCard"
                                auto-complete="off"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="邮箱" prop="mailBox">
                            <el-input
                                v-model="userForm.mailBox"
                                auto-complete="off"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showEditDialog = false" size="small"
                    >取 消</el-button
                >
                <el-button type="primary" @click="saveEdituser()" size="small"
                    >确 定</el-button
                >
            </div>
        </el-dialog>
        <el-dialog
            title="修改密码"
            append-to-body
            :visible.sync="dialogFormVisible_password"
            width="600px"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
        >
            <el-form
                :model="registerForm"
                :rules="rules_password"
                ref="registerForm"
                label-width="140px"
                size="small"
            >
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
                        <i :class="{ orange: pwdGrade >= 1 }"></i>
                        <i :class="{ yellow: pwdGrade >= 3 }"></i>
                        <i :class="{ green: pwdGrade >= 4 }"></i>
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
                <el-button
                    @click="dialogFormVisible_password = false"
                    size="small"
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
        <el-dialog
            :title="'配置角色 : ' + userForm.userName"
            :visible.sync="isControlSaveBtnLoading"
            append-to-body
            style="min-height: 300px;"
            width="30%"
        >
            <el-form>
                <el-form-item label="角色">
                    <el-select v-model="roleList" placeholder="请选择">
                        <el-option
                            v-for="item in optionsRoleList"
                            :key="item.id"
                            :label="item.roleName"
                            :value="item.id"
                        ></el-option>
                    </el-select> </el-form-item
            ></el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isControlSaveBtnLoading = false" size="small"
                    >取 消</el-button
                >
                <el-button type="primary" @click="onSubmit()" size="small"
                    >确 定</el-button
                >
            </div>
        </el-dialog>
    </div>
</template>

<script>
import moment from 'moment'
import MenuTitle from '@/components/menuTitle'
import umeditor from '../../../model/umeditor.vue'
import { buscode } from '../../../../../static/js/buscode'

import {
    getToken,
    removeToken,
    removeUserInfo,
    getUserInfo
} from '@/utils/auth'
import SearchBtn from '@/components/searchBtn'
export default {
    components: {
        umeditor,
        MenuTitle,
        SearchBtn
    },
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
        return {
            defaultProps: {
                children: 'children',
                label: 'treename'
            },
            fileList: [],
            fileData: {},
            selMeun: false,
            queryData: {
                Keyword: '',
                ispublic: '',
                depID: ''
            },
            checkedSevice: [],
            isControlSaveBtnLoading: false,
            Page: 1,
            total: 0,
            PageSize: 10,
            pwdCheckword: '',
            pwdGrade: 0,
            hidePWDCK: true,

            userForm: {
                birth: '',
                depName: '',
                formList: '',
                id: '',
                idCard: '',
                identity: '',
                ip: '',
                depID: '',
                loginCount: '',
                mailBox: '',
                name: '',
                native: '',
                phone: '',
                place: '',
                remark: '',
                roleIdList: '',
                roleNames: '',
                secondPassword: '',
                sex: '',
                sexId: '',
                staffName: '',
                statusValue: '',
                treeid: '',
                treepid: '',
                treename: '',
                orderno: 0,
                jdnum: 0,
                userName: ''
            },
            tableData: [],
            options: [
                {
                    value: '男',
                    label: '男'
                },
                {
                    value: '女',
                    label: '女'
                }
            ],
            rules: {
                phone: [
                    {
                        pattern: /^1[3|4|5|7|8][0-9]{9}$/,
                        message: '请输入正确格式的手机号',
                        trigger: ['blur', 'change']
                    }
                ],
                idCard: [
                    {
                        pattern: /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i,
                        message: '请输入正确格式的身份证号',
                        trigger: ['blur', 'change']
                    }
                ],
                mailBox: [
                    {
                        pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
                        required: true,
                        message: '请输入邮箱地址',
                        trigger: 'change'
                    },
                    {
                        pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
                        type: 'email',
                        message: '请输入正确的邮箱地址',
                        trigger: ['blur', 'change']
                    }
                ],
                userName: [
                    {
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    }
                ],
                depName: [
                    {
                        required: true,
                        message: '请输入部门',
                        trigger: 'blur'
                    }
                ],

                roleIdList: [
                    {
                        required: true,
                        message: '请选择角色',
                        trigger: 'change'
                    }
                ],
                name: [
                    {
                        required: true,
                        message: '请输入姓名',
                        trigger: 'change'
                    }
                ]
            },

            roleIdList: {
                roleIdList: [
                    {
                        required: true,
                        message: '请输入部门名称',
                        trigger: 'blur'
                    }
                ]
            },
            registerForm: {
                password: '',
                secondPassword: ''
            },
            rules_password: {
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
            nowDate: new Date().getTime(),
            optionsRoleList: [],
            showDialogId: '', //显示行ID
            dialogFormVisible_password: false,
            showEditDialog: false,
            selectData: [],
            ServiceTree: [],
            roleList: ''
        }
    },

    created() {
        this.btnSearchUserData()
        this.searchUserData()
        this.searchRoleData()
        this.queryTreeData()
    },

    methods: {
        onSubmit() {
            this.$axios
                .post('/SystemUser/SaveUserRoles?userId=' + this.userForm.id, [
                    { roleId: this.roleList, userId: this.userForm.id }
                ])
                .then(res => {
                    this.$notify({
                        type: 'success',
                        message: '操作成功',
                        offset: 100
                    })
                    this.isControlSaveBtnLoading = false
                    this.searchUserData()
                })
        },
        configurationRole() {
            if (this.userForm.id == null || this.userForm.id == '') {
                this.$notify({
                    type: 'warning',
                    message: '请先选择数据再进行操作',
                    offset: 100
                })
                return
            }

            this.roleList = this.userForm.roleIdList
            this.isControlSaveBtnLoading = true
        },

        queryTreeData() {
            if (buscode.result && buscode.result.length > 0) {
                this.ServiceTree = buscode.result[0].children
            }
        },
        searchRoleData() {
            this.$axios
                .get('/SystemRole', {
                    params: { Page: 1, PageSize: 9 }
                })
                .then(res => {
                    this.optionsRoleList = res.data.data
                })
        },
        //显示编辑界面
        showEditUser() {
            if (this.userForm.id == null || this.userForm.id == '') {
                this.$notify({
                    type: 'warning',
                    message: '请先选择数据再进行操作',
                    offset: 100
                })

                return
            }
            this.showEditDialog = true
        },
        //显示修改密码界面
        ShowUpdateUserPassword() {
            if (this.userForm.id == null || this.userForm.id == '') {
                this.$notify({
                    type: 'warning',
                    message: '请先选择数据再进行操作',
                    offset: 100
                })
                return
            }
            this.dialogFormVisible_password = true
        },
        clickNodeTreeNode(data, node) {
            this.queryData.Page = 1
            this.checkedSevice = []
            if (this.queryData.depID && this.queryData.depID == data.organid) {
                this.$refs.ServiceTree.setCurrentKey(null)
                this.queryData.depID = ''
                this.searchUserData()
            } else {
                this.queryData.depID = JSON.parse(JSON.stringify(data)).organid
                // this.queryData.organid = this.userForm.organid;
                this.searchUserData()
            }
        },

        //点击搜索按钮搜索用户
        btnSearchUserData() {
            this.Page = 1
            this.searchUserData()
        },
        searchUserData() {
            this.$axios
                .get('/SystemUser/Userinformation', {
                    params: this.queryData
                })
                .then(res => {
                    this.tableData = res.data.data
                    this.total = res.data.totalCount
                })
        },
        //点击获取用户数据行
        handleCurrentChange(val) {
            this.userForm = JSON.parse(JSON.stringify(val))
            if (!this.userForm) this.userForm = { userName: '' }
        },

        //页面切换搜索用户
        handlePageChange(val) {
            this.queryData.Page = val
            this.searchUserData()
        },
        //保存修改用户信息
        saveEdituser() {
            this.$refs["ruleForm"].validate((valid) => {
             if (valid) {
            this.$axios
                .post('/SystemUser/SaveDataList', [this.userForm])
                .then(res => {
                    this.$notify({
                        type: 'success',
                        message: '操作成功',
                        offset: 100
                    })
                    this.showEditDialog = false
                    this.searchUserData()
                })
             }
            })
        },
        //保存修改密码
        UpdateUserPassword() {
            this.$axios
                .post('/SystemUser/ResetPassword', {
                    id: this.userForm.id,

                    password: this.registerForm.password,
                    secondPassword: this.registerForm.secondPassword
                })
                .then(res => {
                    this.$notify({
                        type: 'success',
                        message: '修改成功',
                        offset: 100
                    })

                    this.dialogFormVisible_password = false
                })
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
            this.pwdGrade = level
        }
    },
    mounted() {
        this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    }
}
</script>


<style module lang="less">
@import './index.less';
</style>


