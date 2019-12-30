<template>
    <div :class="$style.subMains" ref="main" >
       
        <div :class="$style.tableBox" style="width:calc(100% - 0px);">
             <MenuTitle/>
            <div :class="$style.searchHeader">
               <el-form :inline="true"  ref="search">
                    <el-form-item label="部门">
                            <el-cascader
                            v-model="depIDs" 
                            clearable
                            :options="defaultProps"
                            :props="{ value: 'organid', label: 'treename',checkStrictly: true }"
                            @change="handleChange">
                            <template slot-scope="{ node, data }">
                                <span>{{ data.treename }}</span>
                                <span v-if="data.children"> ({{ data.children.length }}) </span>
                            </template>
                            </el-cascader>
           
      
                     </el-form-item>
                    <el-form-item label="角色">
                        <el-select v-model="queryDataModel.RoleId" placeholder="请选择" clearable>
                            <el-option v-for="item in optionsRoleList" :key="item.id" :label="item.roleName" :value="item.id">
                            </el-option>
                        </el-select>
                     </el-form-item>
                    <el-form-item label="用户名">
                        <el-input placeholder="请输入用户名" v-model="queryDataModel.userName" auto-complete="off" style="width:220px;" clearable></el-input>
                     </el-form-item>
                    <SearchBtn @click="queryData"/>    
                    <el-form-item style="float:right">
                        <div :class="$style.iconClick" >
                            <span @click="checking">
                                <span :class="$style.btnRightSpan">
                                    <i class="el-icon-s-operation" style="font-size:22px;" ></i><span style="border-right:2px solid #E5E5E5;color:#666666">用户配置&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
                               
                                
                            </span>
                            <span @click="getDataLimitDefault">
                                <i class="el-icon-s-operation" style="font-size:22px;"></i>
                                <span style="color:#666666">默认配置&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            </span>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
            <el-table
                highlight-current-row
                ref="singleTable"
                @row-click="clickTableRow"
                :data="tableData"
                class="noTableBefore"
                style="width: 100%;margin-top: 20px; overflow-y:auto;height:569px;"
            >
                 <el-table-column type="index" label="序号" width="60"></el-table-column>
                <el-table-column prop="userName" label="用户名" width="150">
                </el-table-column>
                <el-table-column prop="depName" label="部门" width="150">
                </el-table-column>
                <el-table-column prop="roleName" label="角色" width="150">
                </el-table-column>
                <el-table-column prop="name" label="姓名" >
                </el-table-column>
                <el-table-column prop="phone" label="电话" >
                </el-table-column>
                <el-table-column label="卫星遥感资源（已使用/上限）" width="220">
                    <template slot-scope="scope">
                      <span>
                          {{scope.row.usenum1+' / '+scope.row.limitnum1}}
                      </span>
					</template>
                </el-table-column>
                <el-table-column label="地质专题产品（已使用/上限）" width="220">
                    <template slot-scope="scope">
                      <span>
                          {{scope.row.usenum2+' / '+scope.row.limitnum2}}
                      </span>
					</template>
                </el-table-column>
                <el-table-column label="地质成果数据（已使用/上限）" width="220">
                    <template slot-scope="scope">
                      <span>
                          {{scope.row.usenum3+' / '+scope.row.limitnum3}}
                      </span>
					</template>
                </el-table-column>
            </el-table>
            <div class="pagination-wrapper">
                <el-pagination
                    style="text-align: center;"
                    id="userPage"
                    background
                    layout="total,prev, pager, next,jumper"
                    :total="dataTotal"
                    :page-size="queryDataModel.PageSize"
                    @current-change="changePage"
                    :current-page="queryDataModel.Page"
                    class="page"
                ></el-pagination>
            </div>
        </div>
        <el-dialog
            title="用户权限配置"
            append-to-body
            :visible.sync="showEditDialog"
            width="600px"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            >
            <el-form
                :model="userAEdata"
                label-width="100px"
                style="margin-left: 42px;" 
                 ref="userAEdata"
            >
                <el-form-item label="卫星遥感资源" prop="limitnum1" style="width:80%;">
                    <el-input-number :step="10" step-strictly
                        v-model="userAEdata.limitnum1"
                        placeholder="请输入"
                         auto-complete="off"
                    ></el-input-number>
                </el-form-item>

                <el-form-item label="地质专题产品" style="width:80%;" prop="limitnum2">
                    <el-input-number :step="10" step-strictly
                        v-model="userAEdata.limitnum2"
                        placeholder="请输入"
                         auto-complete="off"
                    ></el-input-number>
                </el-form-item>
                <el-form-item label="地质成果数据" prop="limitnum3" style="width:80%;">
                    <el-input-number :step="10" step-strictly
                        v-model="userAEdata.limitnum3"
                        placeholder="请输入"
                         auto-complete="off"
                    ></el-input-number>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="showEditDialog = false"
                    >取消</el-button
                >
                <el-button
                    type="primary"
                    @click="saveUserDataLimit()"
                    size="small"
                    :loading="isControlSaveBtnLoading"
                    :disabled="isControlSaveBtnLoading"
                    >确 定</el-button
                >
            </div>
        </el-dialog>
         <el-dialog
            title="默认配置"
            append-to-body
            :visible.sync="dataLimitDefaultVisble"
            width="600px"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            >
            <el-form
                :model="dataLimitDefault"
                label-width="100px"
                style="margin-left: 42px;" ref="dataLimitDefault"
            >
                <el-form-item label="卫星遥感资源" style="width:80%;">
                    <el-input-number :step="10" step-strictly
                        v-model="dataLimitDefault.limitnum1"
                        placeholder="请输入名称" οninput="value=value.replace(/[^\d]/g,'')"
                    ></el-input-number>
                </el-form-item>

                <el-form-item label="地质专题产品" style="width:80%;">
                    <el-input-number :step="10" step-strictly
                        v-model="dataLimitDefault.limitnum2"
                        placeholder="请输入名称"
                    ></el-input-number>
                </el-form-item>
                <el-form-item label="地质成果数据" style="width:80%;">
                    <el-input-number :step="10" step-strictly
                        v-model="dataLimitDefault.limitnum3"
                        placeholder="请输入名称"
                    ></el-input-number>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="dataLimitDefaultVisble = false"
                    >取消</el-button
                >
                <el-button
                    type="primary"
                    @click="saveDataLimitDefault()"
                    size="small"
                    :loading="isControlSaveBtnLoading"
                    :disabled="isControlSaveBtnLoading"
                    >确 定</el-button
                >
            </div>
        </el-dialog>
    </div>
</template>

<script>
import MenuTitle from '@/components/menuTitle'
import SearchBtn from '@/components/searchBtn'
export default {
    components: {
        MenuTitle,
        SearchBtn
    },
    data() {
        return {
             defaultProps:[],
              depIDs:[],
            dataLimitDefault:"",
            dataLimitDefaultVisble:false,
            optionsRoleList: [],
            queryDataModel: {
                userName: '',
                Keyword: '',
                DepId: '',
                RoleId: '',
                Page: 1,
                PageSize: 10
            },
             userAEdata: "",
            optionsRoleList: {},
            userName: '',
            tableData: [],
            Page: 1,
            PageSize: 15,
            dataTotal: 0,
            isControlSaveBtnLoading: false,

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
            showEditDialog: false,
            dialogFormVisible: false
        }
    },
    mounted() {
        this.queryData();
         this.searchRoleData();
         this.searchdep();
    },
    methods: {
         //部门
        handleChange(value) {
            console.log(value);
            console.log("depIDs",this.depIDs)
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
        searchRoleData() {
            this.$axios
                .get('/SystemRole', {
                    params: { Page: 1, PageSize: 9 }
                })
                .then(res => {
                    this.optionsRoleList = res.data.data
                })
        },
        queryData() {
            this.queryDataModel.DepId='';
            if(this.depIDs.length>0)
            {
                this.queryDataModel.DepId=this.depIDs[this.depIDs.length-1];
            }
            this.$axios
            .get("/TYwDATALIMIT/GetDataLimit", {
            params: this.queryDataModel
            })
            .then(res => {
            this.dataTotal = res.data.totalCount;
            this.tableData = JSON.parse(JSON.stringify(res.data.data));
            // this.tableH =document.getElementsByClassName("sub-main")[0].clientHeight - 210;
            });
            this.userAEdata="";
        },
         //分页
        changePage(data) {
            this.queryData.Page = data;
            this.queryData();
        },
         clickTableRow(row) {
            this.userAEdata=JSON.parse(JSON.stringify(row));
        },
        checking() {
             var _this = this;
            if (!this.userAEdata) {
                this.$notify({
                    type: 'warning',
                    message:'请先选择数据再进行操作',
                    offset: 100,
                })
                return;
            }
            this.showEditDialog = true
        },
        saveUserDataLimit(){
            this.$confirm("是否提交?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "info"
            }).then(() => {
                var _data={
                    id:this.userAEdata.id,
                    limitnum1:this.userAEdata.limitnum1,
                    limitnum2:this.userAEdata.limitnum2,
                    limitnum3:this.userAEdata.limitnum3,
                    version: this.userAEdata.version
                };
                this.isControlSaveBtnLoading=true;
                this.$axios
                    .post('/TYwDATALIMIT/SaveDataList',[_data])
                    .then(res => {
                        this.$notify({
                            type: 'success',
                            message:'操作成功',
                            offset: 100,
                        })
                        this.showEditDialog=false;
                        this.queryData();
                })
                setTimeout(() => {
                    this.isControlSaveBtnLoading = false;
                }, 1000);
            })
        },
        getDataLimitDefault(){
            if (!this.userAEdata) {
                this.$notify({
                    type: 'warning',
                    message:'请先选择数据再进行操作',
                    offset: 100,
                })
                return;
            }
            this.isControlSaveBtnLoading=true;
            this.$axios
                .get('/TYwDatalimitdefault/Query')
                .then(res => {
                    
                    this.dataLimitDefault = res.data[0];
                    this.dataLimitDefaultVisble=true;
            })
            setTimeout(() => {
                this.isControlSaveBtnLoading = false;
            }, 1000);
        },
         saveDataLimitDefault(){
            this.$confirm("是否提交?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "info"
            }).then(() => {
                    this.isControlSaveBtnLoading=true;
                    this.$axios
                        .post('/TYwDatalimitdefault/SaveDataList',[this.dataLimitDefault])
                        .then(res => {
                            this.$notify({
                                type: 'success',
                                message:'操作成功',
                                offset: 100,
                            })
                            this.dataLimitDefaultVisble=false;
                    })
                    setTimeout(() => {
                        this.isControlSaveBtnLoading = false;
                    }, 1000);
            })
        }
    },
}
</script>

<style module lang="less">
@import './Jurisdiction';
</style>