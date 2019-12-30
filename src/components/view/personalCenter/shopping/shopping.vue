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
                          v-model="queryForm.dataName"          
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
                            v-model="queryForm.DataType"
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
                            v-model="queryForm.BeginaddTime"
                            type="datetime"
                            placeholder="选择日期"
                            clear-icon="el-icon-circle-close"
                        ></el-date-picker
                                >至
                                <el-date-picker
                                     style="width: 160px;"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                     v-model="queryForm.EndaddTime"
                                    type="datetime"
                                    placeholder="选择日期"
                                    clear-icon="el-icon-circle-close"
                                ></el-date-picker>
                    </el-form-item>
                    <SearchBtn @click="search"/>
                    <el-form-item style="float:right">
                        <div :class="$style.iconClick">
                          <span @click="ShowAddOrder()">
                                 <span :class="$style.btnRightSpan">
                                    <i :class="$style.myIconDownload"></i>申请</span>
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
                >
                </el-table-column>
                <el-table-column
                    prop="addTime"
                    label="加入时间"
                    show-overflow-tooltip
                >
                <template slot-scope="scope">{{scope.row.addTime| timeFilter}}</template>
                </el-table-column>
                <el-table-column label="操作" size="mini">
                    <template slot-scope="scope">
                        <el-button
                            :class="$style.resultImgsBtn"
                            size="mini"
                            @click="downloadCheck(scope.row)"
                            ><i class="my-icon-details"></i>详情</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
            <div :class="$style.paginationWrapper">
                <el-pagination
                    @current-change="handleCurrentChange"
                    :page-size="queryForm.PageSize"
                    :current-page.sync="queryForm.Page"
                    background
                    layout="total,prev, pager, next,jumper"
                    :total="parseInt(total)"
                >
                </el-pagination>
            </div>
        </div>
        <el-dialog
            append-to-body
            :visible.sync="DialogVisible_addOrder"
            class="dialog"
            width="600px"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            >
            <div class="dialog-title" slot="title">
                <i
                    class="zicon zicon-xiangqing"
                    style="color:#555555;font-size:16px;line-height: 20px;"
                >
                </i
                >服务申请：{{ itemData.servername }}
            </div>
            <el-form
                v-model="addOrderModel"
                label-width="140px"
                size="small"
                style="position: relative;right: 59px;"
            >
                <el-form-item>
                    <span>申请理由</span>
                    <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入"
                        v-model="addOrderModel.reason"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <span>用途</span>
                    <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入"
                        v-model="addOrderModel.purpose"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <span>电话号码</span>
                    <el-input
                        type="input"
                        placeholder="请输入"
                        v-model="addOrderModel.phone"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-upload
                        class="upload-demo"
                        :data="addOrderModel"
                        name="formfile"
                        :action="api + '/TYwDatashoping/upload'"
                        :on-remove="beforeRemove"
                        :file-list="fileList"
                        :on-success="fileSuccess"
                        :headers="uploadHeader"
                        :on-change="handleChange"
                      
                    >
                        <el-button size="small" type="primary"
                            >上传证明文件</el-button
                        >
                        <div slot="tip" class="el-upload__tip">
                            只能上传jpg/png/pdf/word文件，且不超过10M
                        </div>
                    </el-upload>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="DialogVisible_addOrder = false" size="small"
                    >取 消</el-button
                >
                <el-button type="primary" @click="addOrder()" size="small"
                    >确 定</el-button
                >
            </div>
        </el-dialog>
        <mini
            title="详情"
            :type="info_type"
            :options="options"
            :visible.sync="modifyFormVisible"
            :visible_cart='false'
            :visible_shopping='false'
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
import moment from 'moment'
import {dealOptions} from '@/components/public/common'
import {
  getdetails,QueryDataInfo
} from '@/api/system/options.js'
import {
    removeToken,
    removeUserInfo,
    getUserInfo,
    getToken
} from '@/utils/auth.js'
import { COMMON_DATATYPE_OPTIONS } from '../../../../const/index'
export default {
    components: {
        MenuTitle,
        SearchBtn,
        mini
    },
    data() {
        return {
             options: {},
              depIDs:[],
            dataTypOptions: COMMON_DATATYPE_OPTIONS,
            modifyFormVisible: false,
            DialogVisible_addOrder: false,
            inforData: {
                type: 'data',
                oldName: '',
                setName: ''
            },
            queryForm: {
                PageSize: 7,
                Page: 1,
                DepId: '',
                BeginaddTime: '',
                EndaddTime: '',
                DataType: "",
            },
            total: 15,
            tableData: [],
            itemData: [],
            fileList: [],
            dialogVisible: false,
            provefilelists: [],
            multipleSelection: [], //存储选中的表格数据
            addOrderModel: {
                reason: '', //申请理由(必填)
                purpose: '', //用途(选填)
                phone: '', //联系电话(必填)
                provefilelists: [] //证明文件(选填)
            },
            fullscreenLoading: false,
            defaultProps:[],
            info_Datdid: "",
            info_DataName: "",
            info_Datatype: "",
            info_DepId: "",
            info_type:"",//详情页面类型 mini（遥感） medium（专题产品、成果）
        }
    },
    mounted() {
        this.search();
        this.searchdep();
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
        //详情弹框
        downloadCheck(row) {
            let _id='';
            let _type='';
            _id=row.datdid;
            if(row.dataType==1||!row.dataType)
            {
                _type='raster';
                 _id=row.datdid;
                this.info_type="mini";
                getdetails({id:_id,type:_type},{module:'个人中心-'+this.$route.name})
                .then((res)=>{
                    
                    this.options=dealOptions(_type,res.data)
                    this.modifyFormVisible = true;
                }).catch((err)=>{
                    console.log(err)
                })
            }
            else{
                this.info_type="medium";
             if(row.dataType==3)
            {
                _type='special';
                 _id=row.datdid;
            }
            else if(row.dataType==2)
            {
                _type='data';
                 _id=row.datdid;
            }
            QueryDataInfo({id:_id,type:_type},{module:'个人中心-'+this.$route.name})
            .then((res)=>{
                this.options=dealOptions(_type,res.data)
                this.modifyFormVisible = true;
            }).catch((err)=>{
                console.log(err)
            })
            }
        },
        //选择行
        tableChangeSel(row) {
            this.multipleSelection = row
        },
        //删除购物车
        del() {
            var _this = this
            if (this.multipleSelection.length == 0) {
                this.$notify({
                    type: 'warning',
                    message:'请先选择数据再进行操作',
                    offset: 100,
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
                    .post('/TYwDatashoping/DeleteDataList', _data)
                    .then(res => {
                        _this.$notify({
                            type: 'success',
                            message: '删除成功',
                             offset: 100,
                        })
                        _this.search()
                    })
            })
        },
        ShowAddOrder() {
            var _this = this
            if (_this.multipleSelection.length == 0) {
                _this.$notify({
                    type: 'warning',
                    message:'请先选择数据再进行操作',
                    offset: 100,
                })
                return
            }
            this.addOrderModel = {
                reason: '', //申请理由(必填)
                purpose: '', //用途(选填)
                phone: '', //联系电话(必填)
                provefilelists: [] //证明文件(选填)
            }
            this.filelist = [];
            this.provefilelists = [];
            this.DialogVisible_addOrder = true
        },
        //加入订单
        addOrder() {
            var _this = this
            if (_this.multipleSelection.length == 0) {
               _this.$notify({
                    type: 'warning',
                    message:'请先选择数据再进行操作',
                    offset: 100,
                })
                return
            }
            this.$confirm('数据申请, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info'
            }).then(() => {
                var _uid = JSON.parse(localStorage.getItem('UserInfo')).user.id
                let length = this.multipleSelection.length
                var _data = []
                for (let i = 0; i < length; i++) {
                    _data.push({
                        userid: _uid,
                        reason: this.addOrderModel.reason,
                        purpose: this.addOrderModel.purpose,
                        phone: this.addOrderModel.phone,
                        provefilelists: this.provefilelists,
                        sgFilelists: {
                            dataid: _this.multipleSelection[i].datdid,
                            dataType: _this.multipleSelection[i].dataType,
                            dataName: _this.multipleSelection[i].dataName,
                            depId: _this.multipleSelection[i].depId,
                            dataStatus: 1,//1 未审批 数值1待确认
                        },
                    })
                }
                this.$axios
                    .post('/TYwDatashoping/AppliDownload', _data)
                    .then(res => {
                        this.$notify({
                            type: 'success',
                            message: '申请成功!',
                            offset: 100,
                        })
                        this.fileList = [];
                        this.DialogVisible_addOrder = false
                        this.search()
                    })
                
            })
        },
        beforeFileUpload(file) {
            let name = file.name
        },
        fileSuccess(response, file, _provefilelists) {
            this.Length = file.size
            this.provefilelists.push({
                oldName: response.data.oldName,
                setName: response.data.setName
            })
        },
        beforeRemove(file, fileList) {
            // return this.$confirm(`确定移除 ${file.name}？`)
            this.filelist = [];
            this.provefilelists = [];
        },
        handleChange(file, fileList) {
            var _this = this
            var ftype = file.name.split('.')[file.name.split('.').length - 1].toLowerCase()
            //获得文件格式
            var fileTypeList = [
                'doc',
                'docx',
                'png',
                'gif',
                'bmp',
                'jpg',
                'jpeg',
                'pdf'
            ]
            var rightType = fileTypeList.indexOf(ftype)

            if (ftype == '' || rightType < 0) {
                _this.fileList = fileList.slice(0, fileList.length - 1)
                _this.$notify({
                    type:'warning',
                    offset: 100,
                    title: '警告',
                    message:
                        '请上传格式为png、gif、bmp、jpg、jpeg的图片或word、pdf文件！'
                })
                return
            }
            let size = file.size / 1024 / 1024
            if (size > 10) {
                _this.fileList = fileList.slice(0, fileList.length - 1)
                this.$notify({
                    offset: 100,
                   type:'warning',
                    message: '文件大小必须小于10M'
                })
            }
        },
        handleExceed(files, fileList) {
            this.$notify({
                 type: 'warning',
                message:`当前限制选择 ${files.length}个文件，本次选择了 ${
                    files.length
                } 个文件，共选择了 ${files.length + fileList.length} 个文件`,
                 offset: 100,
            }
            )
        },
        search() {
            var _this = this
            this.queryForm.DepId='';
            if(this.depIDs.length>0)
            {
                this.queryForm.DepId=this.depIDs[this.depIDs.length-1];
            }
            this.$nextTick(() => {
                _this.$axios
                    .get('/TYwDatashoping', {
                        params: this.queryForm
                    })
                    .then(res => {
                        _this.tableData = res.data.data
                        _this.total = res.data.totalCount
                    })
            })
        },
        searchdep() {
      var _this = this;
      //绑部门接口 来源集成
      this.$nextTick(() => {
        _this.$axios
          .get("/SystemDep/TreeQuery")
          .then(res => {

          var data=JSON.parse(JSON.stringify(res.data))

          for(var i=0;i<data.length;i++)
           { data[i]= JSON.parse(JSON.stringify(this.delNoChildren(data[i])));}
            _this.defaultProps = data;
          });
      });
    },
    delNoChildren(data){
      if(data.children){
        if(data.children.length>0){
        for(var i=0;i<data.children.length;i++)
          {data.children[i]= JSON.parse(JSON.stringify(this.delNoChildren(data.children[i])))}
        }
        else{
          delete data.children;
        }
      }
      return data;
    },
        handleCurrentChange(data) {
            this.queryForm.Page = data
            this.search()
        },
        see() {
            this.modifyFormVisible = true
        }
    },
    created() {
        this.uploadHeader = {
            Authorization: 'Bearer ' + JSON.parse(getToken()).access_token
        }
    }
}
</script>
<style module lang="less">
@import './index.less';
</style>
<style scoped>
  .el-button:active {
    color: #423e40;
    border-color: #f7f7f7;
    background: #f7f7f7;
    outline: 0;
    }
</style>