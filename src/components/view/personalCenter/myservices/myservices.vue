<template>
    <div class="sub-main">
        <div class="tableBox" style="width:calc(100% - 19px);">
            <div class="title_sys">我的服务</div>
            <div class="clearfix search-header">
                <div class="box" style="height:34px;line-height:34px;">
                    <el-input placeholder="请输入关键字" v-model="queryData.Keyword" @keyup.enter.native="search()" style="width:240px;height:34px;line-height:34px;"></el-input>
                    <el-button type="buttoms" size="small" @click="search()"><i class="el-icon-search"></i></el-button>
                </div>
            </div>

            <el-table ref="singleTable" @current-change="handleCurrentChange2" :data="tableData" highlight-current-row :height="600" stripe style="width: 100%;">
                <el-table-column type="index" label="序号" show-overflow-tooltip width="60px"> </el-table-column>
                <el-table-column prop="ServiceID" label="服务名称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="" label="信息摘要" show-overflow-tooltip></el-table-column>
                <el-table-column prop="statusName" label="审批状态" show-overflow-tooltip></el-table-column>
                <el-table-column prop="" label="地址" show-overflow-tooltip></el-table-column>
                <el-table-column prop="BeginApplyTime" label="申请时间" show-overflow-tooltip></el-table-column>
                <el-table-column prop="EndApplyTime" label="有效时间" show-overflow-tooltip></el-table-column>
                <el-table-column label="操作" size="small">
                    <template slot-scope="scope">
                        <el-button class="result-imgs-btn color-download" size="mini" @click.stop="deleteRow(scope.row)"><i class="my-icon-dates"></i>删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-wrapper">
                <el-pagination @current-change="handleCurrentChange" :page-size="10" :current-page.sync="queryData.Page" background  layout="total,prev, pager, next,jumper" :total="parseInt(total)"> </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { removeToken, removeUserInfo, getUserInfo } from "@/utils/auth.js"
export default {
    data() {
        return {
            input: "",
            total: 0,
            queryData: {
                PageSize:10,
                Page:1,
                Keyword:''
            },
            currentRow: {},
            tableData: []
        }
    },
    methods: {
        search() {
            var _this = this
           this.$nextTick(()=>{
                _this.$axios.get("/TYwServiceApply", {
                    params:this.queryData
                }).then(res => {
                _this.tableData = res.data.data;
                _this.total = res.data.totalCount;
  
            })
           })
        },
        handleCurrentChange(data) {
            this.queryData.Page=data;
            this.search();
        
        },

        handleCurrentChange2(val) {
          
            this.currentRow = val
        },
        deleteRow(row) {
            var _this = this
            this.$confirm("此操作将永久删除该项目, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                _this.$axios.delete("/TYwServiceApply/" + row.id).then(res => {
                    _this.$notify({
                        type: "success",
                        message: res.data,
                        offset: 100,
                    })
                    _this.search()
                })
            })
        }
    },
    mounted() {
        
        this.search()
    }
}
</script>

<style lang="less" scope>
.sub-main {
    width: 100%;
    height: 100%;
    // padding: 5px;
    // background: #f2f2f2;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
.bodes {
    width: 350px;
    height: 420px;
    border: 1px solid #dedede;
    // margin-left: 20px;
}
.search-box {
    margin-top: 12px;
}

.el-button--primary {
    background: #f7f7f7;
}

.pagination-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 0;
    padding-top: 24px;
}
.el-button:focus,
.el-button:hover {
    color: #423e40;
    border-color: #fff;
    background: #fff;
}
.el-button--primary {
    color: #423e40;
    height: 40px;
    background: #f7f7f7;
    border-color: #f7f7f7;
}
.el-button {
    color: #423e40;
    background: #f7f7f7;
}

</style>