<template>
    <div :class="$style.subMain" >
        <div :class="$style.tableBox" style="width:calc(100% - 0px);">
             <MenuTitle />
            <!-- <div :class="$style.titleSys">角色管理</div> -->
            <div :class="$style.searchHeader">
                <el-form :inline="true"  ref="search">
                    <el-form-item label="角色">
                         <el-input clearable placeholder="请输入角色名称" v-model="searchData.roleName" style="width:380px;"></el-input>
                    </el-form-item>
                 <SearchBtn @click="updataList"/>
                 <el-form-item style="float:right">
                <div :class="$style.iconClick">
                    <span @click="operate('add')">
                        <i class="iconfont myIconAdd" style="font-size:25px;margin-bottom:-4px;"></i>
                        <span style="border-right:2px solid #E5E5E5;color:#666666">新增&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    </span>
                    <span @click="operate('eduit')">
                        <i class="iconfont my-icon-edit" style="font-size:25px;margin-bottom:-4px; "></i>
                        <span style="border-right:2px solid #E5E5E5;color:#666666">编辑&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    </span>
                    <span @click="operate('delete')">
                        <i class="iconfont my-icon-delete" style="margin-bottom:-4px;"></i>
                        <span style="border-right:2px solid #E5E5E5;color:#666666">删除&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    </span>
                    <span @click="operate('setMeun')">
                        <i class="iconfont my-icon-configuration" style="font-size:25px;margin-bottom:-4px; "></i>
                        <span style="color:#666666">配置菜单&nbsp;&nbsp;</span>
                    </span>
                </div>
                </el-form-item>
                 </el-form>
            </div>
            <el-table :data="userListData" :size="size" highlight-current-row stripe  style="width: 100%; overflow-y:auto;height:569px;" @row-click="rowclick">
                <el-table-column type="index" label="序号" width="200"> </el-table-column>
                <el-table-column prop="roleName" label="角色名称"> </el-table-column>
                <el-table-column prop="remark" label="备注"> </el-table-column>
            </el-table>
            <div :class="$style.paginationWrapper">
                <el-pagination @current-change="handleCurrentChange" :page-size="searchData.PageSize"
               :current-page.sync="searchData.Page" background
                layout="total,prev, pager, next,jumper" :total="parseInt(total)">
                </el-pagination>
            </div>
        </div>
        <AddForm @closeAddDialog="closeDialog" v-if="allowAdd" @updataList="updataList" ></AddForm>
        <EduitForm @closeAddDialog="closeDialog" v-if="allowEduit" @updataList="updataList" :selectRow="selectRow" ></EduitForm>
        <SelMeunForm @closeAddDialog="closeDialog" v-if="selMeun" @updataList="updataList" :RoleselectRow="selectRow"></SelMeunForm>
    </div>
</template>

<script>
import MenuTitle from '@/components/menuTitle'
import SearchBtn from '@/components/searchBtn'
import AddForm from "./dialog/Addform"
import EduitForm from "./dialog/EduitForm";
import SelMeunForm from "./dialog/SelMeunForm";
import axios from "axios"

export default {
    components: {
        MenuTitle,
        SearchBtn,
        AddForm,
        EduitForm,
        SelMeunForm
    },
    data() {
        return {
            size: "medium",
            userListData: [],
            allowAdd: false,
            allowEduit: false,
            selMeun: false,
            searchData: {
                roleName:"",
                PageSize:10,
                Page:1,
            },
            selectRow: null,
            total:0,
            
        }
    },
    methods: {
        rowclick(row) {
            this.selectRow = row
        },
        checkSelRow() {
            if (this.selectRow) return true
            else {
                this.$notify({
                    type: 'warning',
                    message:'请先选择数据再进行操作',
                    offset: 100,
                })
                return false
            }
        },
        delete() {
            this.$confirm("删除角色："+this.selectRow.roleName+" ,是否继续？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                var _params=[{id:this.selectRow.id}];
                this.$axios.post("SystemRole/DeleteDataList", _params).then(res => {
                    this.$notify({
                        type: 'success',
                        message:'操作成功',
                        offset: 100,
                        })
                    this.getuserListData()
                })
            })
        },
        closeDialog() {
            this.allowAdd = false
            this.allowEduit = false
            this.selMeun = false
        },
        updataList() {
            this.getuserListData()
        },
        getuserListData() {

            this.$axios.get("/SystemRole", {
              params:this.searchData
            }).then(res => {
                this.userListData = res.data.data
                this.total = res.data.totalCount;
            })
        },
        operate(type) {
            switch (type) {
                case "add":
                
                    this.allowAdd = true
                    break
                case "eduit":
                    if (this.checkSelRow()) this.allowEduit = true
                    break
                case "delete":
                    if (this.checkSelRow()) {
                        this.delete()
                    }
                    break
                case "setMeun":
                    if (this.checkSelRow()) this.selMeun = true
            }
        },
        handleCurrentChange(data) {
            this.searchData.Page = data;
            this.getuserListData();
        },
    },
    
    mounted() {
        this.getuserListData()
    }
}
</script>
<style module lang="less">
@import "./index.less";
</style>


