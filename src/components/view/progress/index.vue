<template>
    <div :class="$style.contionst67" ref="container">
        <div :class="$style.achievements67">
            <div :class="$style.mentTop67">
                <h3>政策法规</h3>
            </div>
            <div :class="$style.mentBg">
                <div :class="$style.mentMian">
                    <div
                        :class="{ active: activeIndex == index }"
                        class="mentBorder"
                        v-for="(item, index) in treeData"
                        :key="index"
                        :title="item.name "
                        @click="clickNodeTreeNode(item, index)"
                    >
                        {{ item.name }}
                    </div>
                </div>
                <div :class="$style.tableBox">
                    <div :class="$style.searchs">
                        <el-form
                            :class="$style.searchBox"
                            label-width="80px"
                            ref="search"
                            size="small"
                            id="search"
                        >
                            <el-input
                                clearable
                                placeholder="请输入标题"
                                v-model="searchData.title"
                                style="width:240px;position: relative;top:-19px"
                                @click="searchDepartment2()"
                            ></el-input>
                            <SearchBtn @click="searchDepartment2()" />
                        </el-form>
                    </div>
                    <p :class="$style.searchTotal">
                        共找到{{ parseInt(total) || 0 }}个
                    </p>
                    <el-table
                        :class="$style.mainTable"
                        :data="tableData"
                        highlight-current-row
                        @current-change="handleChange"
                        tooltip-effect="dark"
                    >
                        <el-table-column
                            type="index"
                            label="序号"
                            show-overflow-tooltip
                            width="50px"
                        ></el-table-column>
                        <el-table-column
                            prop="title"
                            label="标题"
                            show-overflow-tooltip
                            width="550px"
                        >
                            <template slot-scope="scope">
                                <a
                                    style="color: #409eff;"
                                    @click="details(scope.row)"
                                    >{{ scope.row.title }}</a
                                >
                            </template>
                        </el-table-column>
                        <!-- <el-table-column prop="pubunit" label="发布单位" show-overflow-tooltip></el-table-column> -->
                        <el-table-column
                            prop="pubdate"
                            label="发布时间"
                            show-overflow-tooltip
                        >
                            <template slot-scope="scope">
                                <span>{{
                                    scope.row.pubdate | timeFilter
                                }}</span>
                            </template></el-table-column
                        >
                        <!-- <el-table-column prop="keyword" label="关键字" show-overflow-tooltip></el-table-column> -->
                        <el-table-column label="操作" size="mini">
                            <template slot-scope="scope">
                                <el-button
                                    class="result-imgs-btn color-download"
                                    size="mini"
                                    @click="details(scope.row)"
                                >
                                    <i class="my-icon-details"></i>详情
                                </el-button>
                                <el-button
                                    v-if="scope.row.path"
                                    class="result-imgs-btn color-download"
                                    size="mini"
                                    @click="downloadfile(scope.row.id)"
                                >
                                    <i class="my-icon-downs"></i>下载
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div :class="$style.paginationWrapper">
                        <el-pagination
                            @current-change="handleCurrentChange"
                            :page-size="searchData.pageSize"
                            :current-page.sync="searchData.page"
                            background
                            layout="total,prev, pager, next,jumper"
                            :total="parseInt(total)"
                        ></el-pagination>
                    </div>
                </div>
                <el-dialog
                    append-to-body
                    :visible.sync="dialogFormVisible_password"
                    class="dialog"
                    width="800px"
                    :close-on-click-modal="false"
                    :close-on-press-escape="false"
                >
                    <div class="dialog-title" slot="title">
                        <i
                            class="zicon zicon-xiangqing"
                            style="color:#555555;font-size:16px;line-height: 20px;cursor: pointer;"
                        ></i
                        >&nbsp;规范详情
                    </div>
                    <h4 :title="itemData.title">{{ itemData.title }}</h4>
                    <div :class="$style.source">
                        <span>发布单位 ：{{ itemData.pubunit }}</span>
                        <span
                            >发布时间：{{ itemData.pubdate | timeFilter }}</span
                        >
                    </div>
                    <div :class="$style.source">
                        <span>来源：{{ itemData.source }}</span>
                        <span v-if="itemData.setName"
                            >下载次数 ：{{ itemData.getnum }}</span
                        >
                        <span>浏览次数 ：{{ itemData.viewnum }}</span>
                    </div>
                    <p style="border-bottom: 1px solid #ebebeb;"></p>
                    <div
                        :class="$style.introduce"
                        v-html="itemData.content"
                    ></div>

                    <div slot="footer" class="dialog-footer">
                        <el-button
                            v-if="itemData.setName"
                            style="margin-top: 30px;"
                            class="primary"
                            size="mini"
                            @click="clickDownload()"
                            >下载</el-button
                        >
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
import { removeToken, removeUserInfo, getUserInfo } from '@/utils/auth.js'
import { clearDownloadFileHttp } from '@/utils/request'
import SearchBtn from '@/components/searchBtn'
export default {
    components: {
        SearchBtn
    },
    data() {
        return {
            activeIndex: ' ',
            searchData: {
                oldName: '',
                page: 1,
                pageSize: 10,
                TypeId: ''
            },
            total: 0,
            tableData: [],
            tableH: 500,
            dialogFormVisible: false,
            dialogFormVisible_password: false,
            nowDate: new Date().getTime(),
            showEditDialog: false,
            modifyFormVisible: false,
            itemData: {
                abstract: ' ',
                content: ' ',
                getnum: ' ',
                id: ' ',
                inuse: ' ',
                ispublic: 1,
                keyword: ' ',
                lastID: ' ',
                lastTime: ' ',
                oldName: ' ',
                pubdate: ' ',
                pubunit: ' ',
                remarks: ' ',
                setName: ' ',
                source: ' ',
                title: ' ',
                type: ' ',
                typeId: ' ',
                version: ' ',
                viewnum: ' '
            },
            treeData: []
        }
    },
    mounted() {
        this.searchDepartment2()
        this.queryTreeData()
    },
    methods: {
        clickNodeTreeNode(val, index) {
            if (this.searchData.TypeId == val.id) {
                this.searchData.TypeId = ' '
                this.activeIndex = ' '
            } else {
                this.searchData.TypeId = val.id
                this.activeIndex = index
            }
            this.searchDepartment2()
        },
        clickDownload() {
            let id = this.itemData.id
            var $eleForm = $("<form method='post'></form>")
            $eleForm.attr(
                'action',
                this.api + '/TYwPolicylaw/DownloadFiles?id=' + id
            )
            $(document.body).append($eleForm)
            //提交表单，实现下载
            $eleForm.submit()
        },
        downloadfile(id) {
            var $eleForm = $("<form method='post'></form>")
            $eleForm.attr(
                'action',
                this.api + '/TYwPolicylaw/DownloadFiles?id=' + id
            )
            $(document.body).append($eleForm)
            //提交表单，实现下载
            $eleForm.submit()
        },
        queryTreeData() {
            var _this = this
            this.$nextTick(() => {
                _this.$axios
                    .get('/TYwPolicylawtype/Query?Order=sort')
                    .then(res => {
                        _this.treeData = res.data
                    })
            })
        },
        searchDepartment2() {
            this.$axios
                .get('/TYwPolicylaw', {
                    params: this.searchData
                })
                .then(res => {
                    this.tableData = res.data.data
                    this.total = res.data.totalCount
                })
        },
        handleCurrentChange(val) {
            this.searchData.page = val
            this.searchDepartment2()
        },
        handleChange() {},
        deleteRow() {
            this.modifyFormVisible = true
        },
        details(row) {
            var _this = this
            this.dialogFormVisible_password = true
            let queryrow = {
                Keyid: ''
            }
            queryrow.Keyid = row.id
            _this.$axios
                .get('/TYwPolicylaw/Query', {
                    params: queryrow
                })
                .then(res => {
                    _this.itemData = res.data[0]
                })
        }
    }
}
</script>
<style module lang="less">
@import './index.less';
</style>
<style lang="less" scoped>
.mentBorder {
    cursor: pointer;
    text-align: center;
    font-size: 16px;
    line-height: 40px;
    color: #333333;
    padding: 0 20px;
    border-top: 2px solid #e9eff3;
    width: 208px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    &:focus,
    &:hover,
    &.active {
        outline: 0;
        border-top: 2px solid #0f8deb;
        background-color: #edf7ff;
    }
}
</style>