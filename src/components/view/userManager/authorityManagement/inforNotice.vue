<template>
    <div :class="$style.subMains" >
     <!-- <MenuTitle /> -->
        <div :class="$style.titleSys">技术规范管理</div>
        <div :class="$style.treeBox">
            <div :class="$style.treeTitle">
                <label>类型</label>
                <span @click="editTreeData('del')">
                    <i class="iconfont my-icon-delete" style="font-size:20px;margin-bottom:9px;"></i>
                    <span style="color:#666666">删除</span>
                </span>
                <span @click="editTreeData('edit')">
                    <i class="iconfont my-icon-edit" style="font-size:20px;margin-bottom:9px;"></i>
                    <span style="color:#666666">编辑</span>
                </span>
                <span @click="editTreeData('add')">
                    <i class="iconfont myIconAdd" style="margin-bottom:9px;"></i>
                    <span style="color:#666666">新增</span>
                </span>
            </div>
            <div :class="$style.block">
                <el-scrollbar style="height: 100%;">
                    <el-tree
                        :data="treeData"
                        accordion
                        @node-click="clickNodeTreeNode"
                        ref="ServiceTree"
                        node-key="id"
                        :default-checked-keys="checkedSevice"
                        :expand-on-click-node="false"
                        highlight-current
                        :check-on-click-node="true"
                    >
                        <span :class="$style.customTreeNode" slot-scope="{ node, data }">
                            <el-radio v-model="editTree.id" :disabeld="true" :label="data.id" style="margin-right: 0px;">&nbsp;</el-radio>
                            <span>{{ data.name }}</span>
                            <span :class="$style.radioFull"></span>
                        </span>
                    </el-tree>
                </el-scrollbar>
            </div>
        </div>
        <div :class="$style.tableBox" style="width:calc(100% - 300px);">
            <div :class="$style.searchHeader">
                <el-form :inline="true"  ref="search">
                    <el-form-item label="标题">
                        <el-input clearable placeholder="请输入标题" v-model="searchData.title"  style="width:160px;font-size:12px"></el-input>
                    </el-form-item>
                      <el-form-item label="发布时间" prop="pubdate">
                       
                           <el-date-picker :class="$style.selInputDate" style="width:160px;font-size:12px" value-format="yyyy-MM-dd" v-model="searchData.BeginPubdate"
                            type="date" placeholder="选择日期" clear-icon="el-icon-circle-close"></el-date-picker>至
                            <el-date-picker :class="$style.selInputDate" style="width:160px;font-size:12px" value-format="yyyy-MM-dd" v-model="searchData.EndPubdate"
                            type="date" placeholder="选择日期" clear-icon="el-icon-circle-close"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="是否公开" >
                    <el-select v-model="searchData.ispublic" placeholder="请选择" style="width:160px;font-size:12px">
                        <el-option label="公开" :value="1"></el-option>
                        <el-option label="非公开" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                    <SearchBtn @click="queryData"/>
                    <el-form-item style="float:right">
                      <div :class="$style.iconClick">
                          <span @click="editData('add')">
                              <i class="iconfont myIconAdd" style="margin-bottom:-4px;"></i>
                              <span style="border-right:2px solid #E5E5E5;color:#666666">新增&nbsp;&nbsp;&nbsp;&nbsp;</span>
                          </span>
                          <span @click="editData('edit')">
                              <i class="iconfont my-icon-edit" style="font-size:25px;margin-bottom:-4px;"></i>
                              <span style="border-right:2px solid #E5E5E5;color:#666666">编辑&nbsp;&nbsp;</span>
                          </span>
                          <span @click="editData('del')">
                              <i class="iconfont my-icon-delete" style="font-size:25px;margin-bottom:-4px;"></i>
                              <span style="color:#666666">删除&nbsp;&nbsp;</span>
                          </span>
                      </div>
                    </el-form-item>
                    </el-form>
            </div>
            <el-table ref="singleTable" :data="tableData" highlight-current-row @selection-change="handleCurrentChange" @row-click="handleData" style="width: 100%;overflow: auto;" height="600">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column type="index" width="70" label="序号"></el-table-column>
                <el-table-column property="title" label="标题" show-overflow-tooltip></el-table-column>
                <el-table-column property="type" label="类型" show-overflow-tooltip></el-table-column>
                <el-table-column property="keyword" label="关键字" show-overflow-tooltip></el-table-column>
                <el-table-column property="remark" label="是否公开" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span v-if="scope.row.ispublic == 1">是</span>
                        <span v-if="scope.row.ispublic == 0">否</span>
                    </template>
                </el-table-column>
                <el-table-column property="source" label="来源" show-overflow-tooltip></el-table-column>
                <el-table-column property="pubdate" label="发布时间" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <span>{{scope.row.pubdate |timeFilter}}</span>
                  </template>
                </el-table-column>
                <el-table-column property="remark" label="备注" show-overflow-tooltip></el-table-column>
            </el-table>
            <div :class="$style.paginationWrapper">
                <el-pagination @current-change="handlePageChange" :page-size="10" :current-page.sync="Page" background layout="total,prev, pager, next,jumper" :total="parseInt(dataTotal)">
                </el-pagination>
            </div>
        </div>
        <el-dialog title="信息" :visible.sync="dialogFormVisible" append-to-body style="min-height: 500px;" class="myDialog">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" v-if="dialogFormVisible">
                <el-form-item label="类型" label-width="100px"  style="width:50%;padding-top:10px;">
                    <el-select v-model="ruleForm.typeId" placeholder="请选择">
                        <el-option v-for="item in treeData" :key="item.id" :label="item.name" :value="item.id"> </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="来源" label-width="100px" style="width:50%;padding-top:10px;">
                    <el-input placeholder="请输入" v-model="ruleForm.source" auto-complete="off" style="width:200px;"></el-input>
                </el-form-item>
                <el-form-item label="关键字" label-width="100px" style="width:50%;" prop="keyword">
                    <el-input placeholder="请输入" v-model="ruleForm.keyword" auto-complete="off" style="width:200px;"></el-input>
                </el-form-item>
                <el-form-item label="发布时间" label-width="100px" style="width:50%;" prop="pubdate">
                    <el-date-picker v-model="ruleForm.pubdate" align="right" type="datetime" placeholder="选择时间" style="width:200px;"> </el-date-picker>
                </el-form-item>
                <el-form-item label="是否公开" label-width="100px" style="width:50%;" prop="ispublic">
                    <el-select v-model="ruleForm.ispublic" placeholder="请选择">
                        <el-option label="公开" :value="1"></el-option>
                        <el-option label="非公开" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="标题" label-width="100px" prop="title">
                    <el-input placeholder="请输入标题" v-model="ruleForm.title" auto-complete="off" style="width:600px;"></el-input>
                </el-form-item>
                <el-form-item label="摘要" label-width="100px">
                    <el-input type="textarea" :rows="2" placeholder="请输入摘要" v-model="ruleForm.abstract" auto-complete="off" style="width:700px;"></el-input>
                </el-form-item>
                <el-form-item label="文件上传" label-width="100px" style="width:50%;" prop="setName">
                    <el-upload
                    
                        class="upload-demo"
                        :headers="fileData"
                        :action="api + '/TYwTechnicalnorm/upload'"
                        :on-success="fileSuccess"
                        name="formfile"
                        :on-remove="handleRemove"
                        :limit="1"
                         :on-change="handleChange"
                        :on-exceed="handleExceed"
                        :file-list="fileList"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="内容" label-width="100px">
                    <umeditor style="width:700px;" ref="umeditor"></umeditor>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="uploadNew" :loading="isControlSaveBtnLoading" :disabled="isControlSaveBtnLoading">保 存</el-button>
            </div>
        </el-dialog>
        <el-dialog title="类型" :visible.sync="dialogTreeFormVisible" append-to-body style="min-height: 300px;" width="30%">
            <el-form :model="editTree" :rules="rules2" ref="editTree">
                <el-form-item label="名称" label-width="100px" style="width:70%;" prop="NAME">
                    <el-input placeholder="请输入名称" v-model="editTree.name" auto-complete="off" style="width:200px;"></el-input>
                </el-form-item>
                <el-form-item label="序号" label-width="100px" style="width:70%;">
                    <el-input-number v-model="editTree.sort" controls-position="right" :precision="0" :min="1" :max="1000" label="顺序号" style="width:200px;"></el-input-number>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogTreeFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveTree()">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import MenuTitle from '@/components/menuTitle'
import SearchBtn from '@/components/searchBtn'
import umeditor from "../../../model/umeditor.vue";
import { getToken } from "@/utils/auth";
import moment from 'moment'
export default {
  components: {
    umeditor,
     MenuTitle,
    SearchBtn,
  },
  data() {
    return {
      treeData: [],
      clickTreeNode: null,
      checkedSevice: [],
      editTree: {},
      dialogTreeFormVisible: false,
      rules2: {
        name: [
          {
            required: true,
            message: "请输入名称",
            trigger: "blur"
          }
        ]
      },
      fileList: [],
      fileData: {},
      saveData: {},
      isControlSaveBtnLoading: false,
      Page: 1,
      PageSize: 10,
      searchData: {
        keyword: "",
        ispublic: "",
        typeId: "",
        title:"",
        BeginPubdate:"",
        EndPubdate:"",
      },
      userAEdata: {},
      ruleForm: {},
      tableData: [],
      rules: {
        keyword: [
          {
            required: true,
            message: "请输入关键字",
            trigger: "blur"
          }
        ],
        pubdate: [
          {
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        ispublic: [
          {
            required: true,
            message: "请选择是否公开",
            trigger: "change"
          }
        ],
        title: [
          {
            required: true,
            message: "请输入标题",
            trigger: "blur"
          }
        ]
      },
      dialogFormVisible: false,
      dataTotal: 0,
      tableH: 500,
      actTableRow: {},
      selectData: []
    };
  },
 
  created() {
  
    this.queryTreeData();
    this.queryData();
    this.fileData = {
      token: getToken()
    };
  },
 
  methods: {
    queryTreeData() {
      var _this = this;
      this.$nextTick(() => {
        _this.$axios.get("/TYwTechnicalnormtype/Query?Order=sort").then(res => {
          _this.treeData = res.data;
        });
      });
    },
    clickNodeTreeNode(data, node) {
      if (this.editTree.id && this.editTree.id == data.id) {
        this.editTree = {};
        this.$refs.ServiceTree.setCurrentKey(null);
        this.searchData.typeId = "";
        this.queryData();
      } else {
        this.editTree = JSON.parse(JSON.stringify(data));
        this.searchData.typeId = this.editTree.id;
        this.queryData();
      }
    },
    editTreeData(type) {
      var _this = this;
      if (type == "add") {
       if( this.editTree.id==null){
         
       }
        this.dialogTreeFormVisible = true;
      }
      if (type == "edit") {
        if (this.editTree.id == null) {
          _this.$notify({
            type: "warning",
            message: "请选择",
            offset: 100,
          });
          return;
        }
        this.dialogTreeFormVisible = true;
      } else if (type == "del") {
        if (this.editTree.id == null) {
          _this.$notify({
            type: "warning",
            message: "请选择",
            offset: 100,
          });
          return;
        }
        var _data = [_this.editTree];
        this.$confirm("删除该节点及其节点下面配置的数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          _this.$axios
            .post("/TYwTechnicalnormtype/DeleteDataList", _data)
            .then(res => {
              _this.$notify({
                message: "删除成功",
                type: "success",
                offset: 100,
              });
              _this.editTree.id = null;
              _this.queryTreeData();
            })
            .catch(err => {
              console.log(err);
            });
        });
      }
    },
    saveTree() {
      var _this = this;
      var _data = [_this.editTree];
      this.$confirm("是否提交?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        _this.$axios
          .post("/TYwTechnicalnormtype/SaveDataList", _data)
          .then(res => {
            _this.$notify({
              type: "success",
              message: "保存成功",
              offset: 100,
            });
            _this.dialogTreeFormVisible = false;
            _this.editTree.id = null;
            _this.queryTreeData();
          });
      });
    },
    reset() {
      this.searchData = {};
      this.Page = 1;
      this.queryData();
    },
    handleCurrentChange(val) {
      if (val.length > 0) {
        this.ruleForm = JSON.parse(JSON.stringify(val[0]));
        this.selectData = JSON.parse(JSON.stringify(val));
      } else {
        this.ruleForm = {};
        this.selectData.length = 0;
      }
    },
    handleData(val){
      this.ruleForm = JSON.parse(JSON.stringify(val));
    },
    handlePageChange(val) {
      this.Page = val;
      this.queryData();
    },
    queryData() {
      var data = this.searchData;
      data.Page = this.Page;
      data.PageSize = this.PageSize;
      this.$axios
        .get("/TYwTechnicalnorm", {
          params: data
        })
        .then(res => {
          this.dataTotal = res.data.totalCount;
          this.tableData = JSON.parse(JSON.stringify(res.data.data));
          // this.tableH =document.getElementsByClassName("sub-main")[0].clientHeight - 210;
        });
    },
    uploadNew() {
      this.isControlSaveBtnLoading = true;
      this.ruleForm.content = this.$refs.umeditor.getContent();
      var _this = this;
      var _data = [_this.ruleForm];
      this.$confirm("是否提交?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        _this.$axios.post("/TYwTechnicalnorm/SaveDataList", _data).then(res => {
          _this.$notify({
            type: "success",
            message: "保存成功",
            offset: 100,
          });
          _this.dialogTreeFormVisible = false;
          _this.ruleForm.id = null;
          this.fileList = [];
          this.$refs.singleTable.clearSelection();
          _this.queryData();
          this.dialogFormVisible = false
        });
      });
      setTimeout(() => {
        this.isControlSaveBtnLoading = false;
      }, 1000);
    },
    editData(type) {
      if (type == "add") {
        this.filelist == [];
        this.ruleForm = {};
         this.selectData=[]
        this.$refs.singleTable.clearSelection()
        this.isControlSaveBtnLoading = false;
        this.dialogFormVisible = true;
      } else if (type == "edit") {
        if (this.selectData.length == 0) {
          this.$notify({
            message: "请先选择数据进行编辑",
            type: "warning",
            offset: 100,
          });
        } else if (this.selectData.length > 1) {
          this.$notify({
            message: "只能选择一条数据",
            type: "warning",
            offset: 100,
          });
        } else {
          if (this.ruleForm.path) {
            this.fileList = [
              {
                path: this.ruleForm.path,
                name: this.ruleForm.oldName,
                setName: this.ruleForm.setName
              }
            ];
          } else {
            this.fileList = [];
          }
          this.dialogFormVisible = true;
          setTimeout(_ => {
            this.$refs.umeditor.setContent(this.ruleForm.content, false);
            this.isControlSaveBtnLoading = false;
          }, 600);
        }
      } else if (type == "del") {
        if (this.selectData.length == 0) {
          this.$notify({
            message: "请先选择数据进行删除",
            type: "warning",
            offset: 100,
          });
        } else {
          this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              
              this.$axios
                .post("/TYwTechnicalnorm/DeleteDataList", this.selectData)
                .then(res => {
                  this.ruleForm = {};
                  this.Page = 1;
                  this.$notify({
                    message: "删除成功",
                    type: "success",
                     offset: 100,
                  });
                  this.queryData();
                });
            })
            .catch(() => {
              this.$notify({
                type: "info",
                message: "已取消删除",
                 offset: 100,
              });
            });
        }
      } else if (type == "look") {
      }
      this.$nextTick(() => {
        $(".el-dialog__body").scrollTop(0);
      });
    },
    handleChange(file,fileList){
      var _this=this;
            var ftype = file.name.split(".")[file.name.split(".").length - 1].toLowerCase();
            //获得文件格式
            var fileTypeList=["doc", "docx","png","gif","bmp","jpg", "jpeg", "pdf"];
            var rightType=fileTypeList.indexOf(ftype);
                
            
            if (ftype == "" ||rightType<0){
                _this.fileList=fileList.slice(0,fileList.length-1);
                _this.$notify({
                   type:'warning',
                    title: "警告",
                     offset: 100,
                    message: "请上传格式为png、gif、bmp、jpg、jpeg的图片或word、pdf文件！"
                })
                return;
            }
            let size = file.size / 1024 / 1024
            if (size > 10) {
                _this.fileList=fileList.slice(0,fileList.length-1);
                this.$notify({
                   type:'warning',
                    title: "警告",
                    offset: 100,
                    message: "文件大小必须小于10M"
                })
            } 
    },
    clickTableRow(row, event, column) {
      if (this.actTableRow.id == row.id) {
        this.$refs.singleTable.setCurrentRow();
        this.actTableRow = {};
      } else {
        this.actTableRow = row;
      }
    },
    fileSuccess(res, file, fileList) {
      this.fileList = fileList;
      this.ruleForm.setName = res.data.path;
      this.ruleForm.oldName = res.data.oldName;
    },
    handleRemove(file, fileList) {
        // this.fileList = fileList
        this.ruleForm.setName = null
        this.ruleForm.oldName = null
    },
    handleExceed(files, fileList) {
      //文件超出限制
      this.$notify({
        type: 'warning',
        message:'只能上传一个文件！',
        offset: 100,
        })
    }
  }
};
</script>


<style module lang="less">
@import "./index.less";
</style>

<style scoped>
.el-form--inline .el-form-item {
  display: inline-block;
  margin-right: 0px !important;
  vertical-align: top;
}
</style>
