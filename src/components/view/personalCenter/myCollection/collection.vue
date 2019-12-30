<template>
    <div :class="$style.subMain" ref="main">
        <div :class="$style.tableBox" style="width:calc(100% - 0px);">
            <MenuTitle />
            <div :class="$style.title">
                <el-form :inline="true" ref="search">
                    <el-form-item label="名称">
                        <el-input
                            style="width: 180px;"
                            placeholder="请输入名称"
                            v-model="queryData.dataName"                     
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="部门" >
                        <el-cascader
                         style="width: 180px;"
                            v-model="depIDs"
                            clearable
                            :options="defaultProps"
                            :props="{
                                value: 'organid',
                                label: 'treename',
                                checkStrictly: true
                            }"
                            @change="handleChange"
                        >
                            <template slot-scope="{ node, data }">
                                <span>{{ data.treename }}</span>
                                <span v-if="data.children">
                                    ({{ data.children.length }})
                                </span>
                            </template>
                        </el-cascader>
                    </el-form-item>
                     <el-form-item label="数据类型" >
                       <el-select
                            style="width: 180px;"
                            clearable
                            filterable
                            placeholder="请选择"
                            v-model="queryData.DataType"
                        >
                            <el-option
                                v-for="(item, index) in dataTypOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="收藏时间" >
                        <el-date-picker
                            style="width: 160px;"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            v-model="queryData.BeginaddTime"
                            type="datetime"
                            placeholder="选择日期"
                            clear-icon="el-icon-circle-close"
                        ></el-date-picker
                                >至
                                <el-date-picker
                                     style="width: 160px;"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    v-model="queryData.EndaddTime"
                                    type="datetime"
                                    placeholder="选择日期"
                                    clear-icon="el-icon-circle-close"
                                ></el-date-picker>
                    </el-form-item>
                    <SearchBtn @click="search"/>
                    <el-form-item style="float:right">
                        <div :class="$style.iconClick">
                          <span @click="addToShopping()">
                                 <span :class="$style.btnRightSpan">
                                    <i :class="$style.myIconCart"></i
                                    >加入购物车</span>
                            </span>
                            <span @click="del()">
                                 <i :class="$style.myIconDetel"></i>删除
                            </span>
                           
                        </div>
                    </el-form-item>
                </el-form>
            </div>
           
            <el-table
                :class="$style.mainTable"
                ref="singleTable"
                :data="tableData"
                highlight-current-row
                size="small"
                table
                header-row-class-name="theme-table-header"
                @selection-change="tableChangeSel"
            >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column
                    label="缩略图"
                    prop="date"
                    show-overflow-tooltip
                    width="100"
                >
                    <template slot-scope="scope">
                        <!-- <img :src="'data:image/png;base64,'+scope.row.THUMBNAIL" v-if="scope.row.THUMBNAIL" width="50" height="50"> -->
                        <img
                            src="/static/img/defaultPicture.png"
                            width="50"
                            height="50"
                        />
                        <span></span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="dataName"
                    label="名称"
                    show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                    prop="depName"
                    label="所属部门"
                    show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                    prop="typeName"
                    label="数据类型"
                    show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                    prop="BeginAddTime"
                    label="收藏时间"
                    show-overflow-tooltip
                >
                    <template slot-scope="scope">
                        <div>{{ scope.row.addTime | timeFilter }}</div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" size="mini">
                    <template slot-scope="scope">
                        <el-button
                            :class="$style.resultImgsBtn"
                            size="mini"
                            @click="downloadCheck(scope.row)"
                        >
                            <i class="my-icon-details"></i>详情</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
            <div :class="$style.paginationWrapper">
                <el-pagination
                    @current-change="handleCurrentChange"
                    :page-size="queryData.PageSize"
                    :current-page.sync="queryData.Page"
                    background
                    layout="total,prev, pager, next,jumper"
                    :total="parseInt(total)"
                >
                </el-pagination>
            </div>
        </div>

        <el-dialog
            append-to-body
            :visible.sync="dialogTableVisible"
            class="dialog"
            width="600px"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
        >
            <div class="dialog-title" slot="title">
                <i
                    class="zicon zicon-xiangqing"
                    style="color:#555555;font-size:16px;line-height: 20px;"
                ></i
                >服务申请：{{ itemData.servername }}
            </div>
            <el-form
                v-model="procedure"
                label-width="140px"
                size="small"
                style="position: relative;right: 59px;"
            >
                <el-form-item>
                    <span>申请理由</span>
                    <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="procedure.reason"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <span>备注</span>
                    <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="procedure.remarks"
                    ></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogTableVisible = false" size="small"
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
        <mini
            title="详情"
            :type="info_type"
            :options="options"
            :visible.sync="modifyFormVisible"
            :visible_cart="false"
            :visible_shopping="false"
            :Datdid="info_Datdid"
            :DataName="info_DataName"
            :Datatype="info_Datatype"
            :DepId="info_DepId"
        ></mini>
    </div>
</template>

<script>
import MenuTitle from '@/components/menuTitle'
import SearchBtn from '@/components/searchBtn'
import mini from '@/components/publicContentDialog'
import config from '@/components/view/userManager/orderManagement/config'
import { removeToken, removeUserInfo, getUserInfo } from '@/utils/auth.js'
import { COMMON_DATATYPE_OPTIONS } from '../../../../const/index'
import { dealOptions } from '@/components/public/common'
import { getdetails, QueryDataInfo } from '@/api/system/options.js'
export default {
    components: {
        MenuTitle,
        SearchBtn,
        mini
    },
    data() {
        return {
            dataTypOptions: COMMON_DATATYPE_OPTIONS,
            total: 15,
            procedure: {},
            queryData: {
                DepId: '',
                PageSize: 7,
                Page: 1,
                DataType: '',
                BeginaddTime: '',
                EndaddTime: ''
            },
            depIDs: [],
            dialogTableVisible: false,
            modifyFormVisible: false,
            tableDatas: [
                {
                    date: '卫星'
                }
            ],
            options: {
                data: [
                    {
                        name: '卫星',
                        content: '测试'
                    },
                    {
                        name: '传感器',
                        content: '测试'
                    }
                ]
            },

            tableData: [],
            itemData: [],
            defaultProps: [],
            multipleSelection: [], //存储选中的表格数据
            info_Datdid: '',
            info_DataName: '',
            info_Datatype: '',
            info_DepId: '',
            info_type: '' //详情页面类型 mini（遥感） medium（专题产品、成果）
        }
    },
    computed: {
        pathConfig() {
            return config['satelliteRemote']
        },
        currentPageLastPath() {
            return this.$route.path.split('/').pop()
        },
        currentPageTitle() {
            return this.$route.name
        }
    },
    methods: {
        tableChangeSel(row) {
            this.multipleSelection = row
        },
        searchdep() {
            var _this = this
            //绑部门接口 来源集成
            this.$nextTick(() => {
                _this.$axios.get('/SystemDep/TreeQuery').then(res => {
                    var data = JSON.parse(JSON.stringify(res.data))

                    for (var i = 0; i < data.length; i++) {
                        data[i] = JSON.parse(
                            JSON.stringify(this.delNoChildren(data[i]))
                        )
                    }

                    _this.defaultProps = data
                })
            })
        },
        delNoChildren(data) {
            if (data.children) {
                if (data.children.length > 0) {
                    for (var i = 0; i < data.children.length; i++) {
                        data.children[i] = JSON.parse(
                            JSON.stringify(this.delNoChildren(data.children[i]))
                        )
                    }
                } else {
                    delete data.children
                }
            }
            return data
        },
        search() {
            var _this = this
            this.queryData.DepId = ''
            if (this.depIDs.length > 0) {
                this.queryData.DepId = this.depIDs[this.depIDs.length - 1]
            }
            this.$nextTick(() => {
                _this.$axios
                    .get('/TYwDatacollection', { params: this.queryData })
                    .then(res => {
                        _this.tableData = res.data.data
                        _this.total = res.data.totalCount
                    })
            })
        },
        //部门
        handleChange(value) {
            // console.log(value)
            // console.log('depIDs', this.depIDs)
        },
        handleCurrentChange(data) {
            this.queryData.Page = data
            this.search()
        },
        //详情
        downloadCheck(row) {
            //4af41073-5dad-4af5-89d8-19f59ae6849b  遥感
            let _id = ''
            let _type = ''

            if (row.dataType == 1 || !row.dataType) {
                _type = 'raster'
                _id = row.datdid
                this.info_type = 'mini'
                getdetails({ id: _id, type: _type },{module:'个人中心-'+this.$route.name})
                    .then(res => {
                        this.options = dealOptions(_type, res.data)
                        this.modifyFormVisible = true
                    })
                    .catch(err => {
                        console.log(err)
                    })
            } else {
                this.info_type = 'medium'
                if (row.dataType == 3) {
                    _type = 'special'
                    _id = row.datdid
                } else if (row.dataType == 2) {
                    _type = 'data'
                    _id = row.datdid
                }
                QueryDataInfo({ id: _id, type: _type },{module:'个人中心-'+this.$route.name})
                    .then(res => {
                        this.options = dealOptions(_type, res.data)
                        this.modifyFormVisible = true
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
            // this.modifyFormVisible = true;
        },
        ShowUpdateUserPassword() {
            this.dialogTableVisible = true
        },
        UpdateUserPassword(item) {
            this.procedure.lastID = this.itemData.id
            this.procedure.Userid = JSON.parse(
                localStorage.getItem('UserInfo')
            ).user.id
            this.$axios.post('/TYwDatacollection', this.procedure).then(res => {
                this.$notify({
                    message: '保存成功',
                    type: 'success',
                    offset: 100
                })
                this.procedure = {}
                this.dialogTableVisible = false
                this.search()
            })
        },
        //删除收藏
        del() {
            var _this = this
            if (this.multipleSelection.length == 0) {
                this.$notify({
                    type: 'warning',
                    message: '请先选择数据再进行操作',
                    offset: 100
                })
                return
            }
            let length = this.multipleSelection.length
            var _data = []
            //++++++++++++++++++模拟数据++++++++++++++++++
            for (let i = 0; i < length; i++) {
                _data.push({
                    id: _this.multipleSelection[i].id
                })
            }
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                _this.$axios
                    .post('/TYwDatacollection/DeleteDataList', _data)
                    .then(res => {
                        _this.$notify({
                            type: 'success',
                            message: '删除成功',
                            offset: 100
                        })
                        _this.search()
                    })
            })
        },
        //加入购物车
        addToShopping() {
            var _this = this
            if (_this.multipleSelection.length == 0) {
                this.$notify({
                    type: 'warning',
                    message: '请先选择数据再进行操作',
                    offset: 100
                })
                return
            }
            this.$confirm('数据加入购物车, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info'
            }).then(() => {
                var _uid = JSON.parse(localStorage.getItem('UserInfo')).user.id
                let length = this.multipleSelection.length
                var _data = []
                //++++++++++++++++++模拟数据++++++++++++++++++
                for (let i = 0; i < length; i++) {
                    _data.push({
                        userid: _uid,
                        datdid: _this.multipleSelection[i].datdid,
                        dataType: _this.multipleSelection[i].dataType,
                        dataName: _this.multipleSelection[i].dataName
                    })
                }

                this.$axios
                    .post('/TYwDatashoping/SaveDataList', _data)
                    .then(res => {
                        this.$notify({
                            type: 'success',
                            message: '成功加入购物车!',
                            offset: 100
                        })
                    })
                this.queryData = {}
                this.search()
            })
        }
    },
    mounted() {
        this.search()
        this.searchdep()
    }
}
</script>
<style module lang="less">
@import './index.less';
</style>
<style scoped>
/* .el-button[data-v-03977b5a]:active {
    color: #423e40;
    border-color: #fff;
    background: #fff;
    outline: 0;
} */
.el-button:active {
    color: #423e40;
    border-color: #f7f7f7;
    background: #f7f7f7;
    outline: 0;
}
</style>