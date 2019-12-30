<template>
  <div :class="$style.subMain" ref="main">
    <div :class="$style.tableBox" style="width:calc(100% - 0px);">
      <MenuTitle />
      <!-- <div :class="$style.titleSys">我的订单</div> -->
      <div :class="$style.title">
        <div :class="$style.searchBar">
          <span :class="$style.lspan">
            名称：
            <el-input
              :class="$style.selInput"
              clearable
              placeholder="请输入名称"
              v-model="queryForm.dataName"
            ></el-input>
          </span>
          <span :class="$style.lspan">
            数据类型：
            <el-select
              :class="$style.selInput"
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
              ></el-option>
            </el-select>
          </span>
          <span :class="$style.lspan">
            申请时间：
            <el-date-picker
              :class="$style.selInputDate"
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="queryForm.BeginaddTime"
              type="datetime"
              placeholder="选择日期"
              clear-icon="el-icon-circle-close"
            ></el-date-picker>至
            <el-date-picker
              :class="$style.selInputDate"
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="queryForm.EndaddTime"
              type="datetime"
              placeholder="选择日期"
              clear-icon="el-icon-circle-close"
            ></el-date-picker>
          </span>
          <el-button @click="searchData" type="text" :class="$style.selBtn">
            <i :class="$style.myIconSearch"></i>
          </el-button>
        </div>
      </div>
      <table :class="$style.boughtTables">
        <!-- <caption></caption> -->
        <thead>
          <tr>
            <th>数据名称</th>
            <th></th>
            <th>数据类型</th>
            <th>机构名称</th>
            <th>审核状态</th>
            <th>审核时间</th>
            <th></th>
            <th>申请理由</th>
            <th>用途</th>
            <th>联系电话</th>
          </tr>
        </thead>
      </table>
      <div v-for="(item, index) in tableData" :key="item.id">
        <table :class="$style.orderTableThead">
          <thead>
            <tr>
              <th>下单时间:{{item.addTime|longtimeFilter}}</th>
            </tr>
          </thead>
        </table>
        <el-table
          :class="$style.orderTable"
          :data="item.taskinfoList"
          :span-method="objectSpanMethod"
          border
          style="width: 100%;"
        >
          <el-table-column prop="dataName" width="110">
            <template slot-scope="scope">
              <img src="/static/img/defaultPicture.png" width="90" height="90" />
            </template>
          </el-table-column>
          <el-table-column prop="dataName"></el-table-column>
          <el-table-column prop="typeName"></el-table-column>
          <el-table-column prop="depName"></el-table-column>
          <el-table-column prop="statusName"></el-table-column>
            <el-table-column size="small">
            <template slot-scope="scope">
              <el-button
                :class="$style.resultImgsBtn"
                size="mini"
                @click="downloadCheck(scope.row)"
              >
                <i class="my-icon-details"></i>详情
              </el-button>
              <el-button
                class="result-imgs-btn color-download"
                v-if="scope.row.dataStatus==2||scope.row.dataStatus=='2'"
                @click="showDownload(scope.row)"
              >
                <i class="my-icon-downs"></i>下载
              </el-button>
            </template>
          </el-table-column>
          <el-table-column prop="aproTime" width="160">
            <template slot-scope="scope">
              <span>{{scope.row.aproTime |longtimeFilter}}</span>
            </template>
          </el-table-column>
        
          <el-table-column>{{item.reason}}</el-table-column>
          <el-table-column>{{item.purpose}}</el-table-column>
          <el-table-column>{{item.phone}}</el-table-column>
        </el-table>
      </div>
      <div :class="$style.paginationWrapper">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="queryForm.PageSize"
          :current-page.sync="queryForm.Page"
          background
          layout="total,prev, pager, next,jumper"
          :total="parseInt(total)"
        ></el-pagination>
      </div>
    </div>
    <el-dialog
      append-to-body
      :visible.sync="modifyFormVisible"
      width="950px"
      class="dialog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div class="dialog-title" slot="title">
        <i class="zicon zicon-xiangqing" style="color:#555555;font-size:16px;line-height: 20px;"></i>&nbsp;数据详情
      </div>
      <el-table :data="dialogTableData" style="width: 100%">
        <el-table-column  prop="date" show-overflow-tooltip width="100">
          <template slot-scope="scope">
            <img src="/static/img/defaultPicture.png" width="50" height="50" />
          </template>
        </el-table-column>
        <el-table-column label="数据名称" prop="dataName"></el-table-column>
        <el-table-column label="审批状态" prop="statusName"></el-table-column>
        <el-table-column label="审批时间" prop="aproTime">
          <template slot-scope="scope">
            <span>{{ scope.row.aproTime | longtimeFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column  size="small">
          <template slot-scope="scope">
            <el-button :class="$style.resultImgsBtn" size="mini" @click="downloadCheck(scope.row)">
              <i class="my-icon-details"></i>详情
            </el-button>
            <el-button
              class="result-imgs-btn color-download"
              v-if="
                                scope.row.dataStatus == 2 ||
                                    scope.row.dataStatus == '2'
                            "
              @click="showDownload(scope.row)"
            >
              <i class="my-icon-downs"></i>下载
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <mini
      title="详情"
      :type="info_type"
      :options="options"
      :visible.sync="infoFormVisible"
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
import mini from '@/components/publicContentDialog'
import SearchBtn from '@/components/searchBtn'
import { removeToken, removeUserInfo, getUserInfo } from '@/utils/auth.js'
import { COMMON_DATATYPE_OPTIONS } from '../../../../const/index'
import moment from 'moment'
import { getdetails, QueryDataInfo,InsertLog} from '@/api/system/options.js'
import { dealOptions } from '@/components/public/common'
export default {
  components: {
    MenuTitle,
    SearchBtn,
    mini
  },
  data() {
    return {
      lab1: '下单时间 : 2019-12-121111',
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
      dataTypOptions: COMMON_DATATYPE_OPTIONS,
      modifyFormVisible: false,
      infoFormVisible: false,
      queryForm: {
        BeginAddTime: '',
        EndAddTime: '',
        PageSize: 5,
        Page: 1,
        DataType: '',
        Order: 'addTime desc'
      },
      onlineData: [],
      total: 15,
      tableData: [],
      multipleSelection: [], //存储选中的表格数据
      dialogTableData: [],
      info_Datdid: '',
      info_DataName: '',
      info_Datatype: '',
      info_DepId: '',
      info_type: '' //详情页面类型 mini（遥感） medium（专题产品、成果）
    }
  },

  methods: {
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex > 5) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 60,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    searchData() {
      var _this = this
      this.$nextTick(() => {
        _this.$axios
          .get('/TYwDataorder/GetMyOrder', { params: this.queryForm })
          .then(res => {
            _this.tableData = res.data.data
            _this.total = res.data.totalCount
          })
      })
    },
    handleCurrentChange(data) {
      this.queryForm.Page = data
      this.searchData()
    },
    seeTaskInfo(row) {
      this.$axios
        .get('/TYwDatataskinfo/Query', { params: { TaskId: row.id } })
        .then(res => {
          // for (let i = 0; i < res.data.data.length; i++) {
          //     res.data.data[i].dataList = [{ id: res.data.data[i].id, itemCode: i + 1 }]
          // }
          this.dialogTableData = res.data
          // this.total = res.data.totalCount
        })
      this.modifyFormVisible = true
    },
    //审核订单数据信息
    getFiles(row) {
      row.isExpanded = !row.isExpanded
      if (row.isExpanded == false) return
      this.loading = true
      this.$axios
        .get('/TYwDatataskinfo/Query', { params: { TaskId: row.id } })
        .then(res => {
          row.dataList = res.data
        })
        .finally(() => {
          this.loading = false
        })
    },
    //审核订单数据信息
    getTasks(row) {
      row.isExpanded = !row.isExpanded
      if (row.isExpanded == false) return
      this.loading = true
      this.$axios
        .get('/TYwDatatask/Query', { params: { Orderid: row.id } })
        .then(res => {
          for (let i = 0; i < res.data.length; i++) {
            res.data[i].dataList = []
          }
          row.dataList = res.data
        })
        .finally(() => {
          this.loading = false
        })
    },
    //下载
    showDownload(row){
      let name='';
      if(row.dataType==3)
      {
        name="地质专题产品-"+row.dataName
      }
      else if(row.dataType==2)
      {
        name="地质成果数据-"+row.dataName
      }else if(row.dataType==1)
      {
        name="卫星遥感资源-"+row.dataName
      }
        InsertLog('个人中心-'+this.$route.name,"下载","下载",name);
        // InsertLog('个人中心-'+this.$route.name,"查看服务地址","查看服务地址",name);//待处理
    },

    //详情
    downloadCheck(row) {
      //4af41073-5dad-4af5-89d8-19f59ae6849b  遥感
      let _id = ''
      let _type = ''

      if (row.dataType == 1 || !row.dataType) {
        _type = 'raster'
        _id = row.dataId
        this.info_type = 'mini'
        getdetails({ id: _id, type: _type },{module:'个人中心-'+this.$route.name})
          .then(res => {
            this.options = dealOptions(_type, res.data)
            this.infoFormVisible = true
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.info_type = 'medium'
        if (row.dataType == 3) {
          _type = 'special'
          _id = row.dataId
        } else if (row.dataType == 2) {
          _type = 'data'
          _id = row.dataId
        }
        QueryDataInfo({ id: _id, type: _type },{module:'个人中心-'+this.$route.name})
          .then(res => {
            this.options = dealOptions(_type, res.data)
            this.infoFormVisible = true
          })
          .catch(err => {
            console.log(err)
          })
      }
      // this.modifyFormVisible = true;
    }
  },
  mounted() {
    this.searchData()
  }
}
</script>
<style module lang="less">
@import './index.less';
</style>