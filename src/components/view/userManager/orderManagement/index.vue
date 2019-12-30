<template>
  <div :class="$style.container" >
    <MenuTitle />
    <el-form :inline="true" label-width="80px" ref="search">
      <el-form-item label="审批状态">
        <el-select filterable clearable placeholder="请选择" v-model="queryForm.TaskInfoStatus">
          <el-option
            v-for="item in CheckedTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="申请人">
        <el-input placeholder="请输入名称" clearable v-model="queryForm.UserName"></el-input>
      </el-form-item>
      <el-form-item label="申请时间">
        <el-date-picker
          value-format="yyyy-MM-dd HH:mm:ss"
          v-model="queryForm.BeginAddTime"
          type="datetime"
          placeholder="选择日期"
          style="width:200px;"
        ></el-date-picker>至
        <el-date-picker
          value-format="yyyy-MM-dd HH:mm:ss"
          v-model="queryForm.EndAddTime"
          type="datetime"
          placeholder="选择日期"
          style="width:200px;"
        ></el-date-picker>
      </el-form-item>
      <SearchBtn @click="onSearch" />
    </el-form>
    <table :class="$style.boughtTables">
      <!-- <caption></caption> -->
      <thead>
        <tr>
          <th>数据名称</th>
          <th>数据类型</th>
          <th>机构名称</th>
          <th>审核状态</th>
             <th></th>
          <th>审核时间</th>
          <th></th>
          <th>申请理由</th>
          <th>用途</th>
          <th>联系电话</th>
           <th>申请人</th>
        </tr>
      </thead>
    </table>
    <div v-for="(item, index) in tableData" :key="item.id">
      <table :class="$style.orderTableThead">
        <thead>
          <tr>
            <th style="width:50px">
              <el-checkbox :indeterminate="item.isIndeterminate" v-model="item.checkAll" @change="handleCheckAllChange(item,index)">全选
                </el-checkbox></th>
            <th style="width:50px;padding-top: 9px;">
              <el-button :class="$style.checkBtn" size="mini" @click="checkOrderInfo(item,index)">审核</el-button></th>
            <th style="width:210px">下单时间:{{item.addTime|longtimeFilter}}</th>
            <th> 
                 <el-button type="text" @click="openCertifyFile(item)">下载证明文件</el-button>
                <!-- <template slot-scope="scope">
         
          </template> -->
          </th>
          </tr>
        </thead>
      </table>
      <el-table
        v-loading="loading"
        :class="$style.orderTable"
        :data="item.taskinfoList"
        :span-method="objectSpanMethod"
        border
        ref="detailTable"
        style="width: 100%;"
        height="auto"
        @expand-change="getFiles"        
        @selection-change="p => tableChangeSel(p, item,index)"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="dataName" width="110">
          <template slot-scope="scope">
            <img src="/static/img/defaultPicture.png" width="90" height="90" />
          </template>
        </el-table-column>
        <el-table-column prop="dataName"></el-table-column>
        <el-table-column prop="typeName"></el-table-column>
        <el-table-column prop="depName"></el-table-column>
        <el-table-column prop="statusName"></el-table-column>
         <el-table-column size="small" >
          <!-- <template slot-scope="scope">
            <el-button type="text" @click="openCertifyFile(scope.row)">下载证明文件</el-button>
          </template> -->
          <template slot-scope="scope">
                <el-button  :class="$style.resultImgsBtn"
                size="mini" @click="openPunlicContentDialog(scope.row)"> <i class="my-icon-eys"></i>查看</el-button>
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
    <!-- <el-table
      v-loading="loading"
      :data="tableData"
      style="width: 100%"
      height="auto"
      @expand-change="getFiles"
    >
      <el-table-column type="expand" align="center">
        <template slot-scope="props" align="center">
          <el-button
            :class="$style.checkBtn"
            size="mini"
            @click="checkOrderInfo(props.row,props.$index)"
          >审核</el-button>
          <el-table
            :data="props.row.dataList"
            style="width: 100%"
            height="auto"
            @selection-change="p => sectableChangeSel(p, props.$index)"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column
              v-for="column in pathConfig.table_column_labels_children"
              :key="column.prop"
              :prop="column.prop"
              :label="column.name"
              v-bind="column.config"
            >
              <template slot-scope="scope">
                {{
                column.filter
                ? column.filter(scope.row[column.prop])
                : scope.row[column.prop]
                }}
              </template>
            </el-table-column>
            <el-table-column type="process" label="当前进度"></el-table-column>
            <el-table-column label="操作" size="small" width="100px">
              <template slot-scope="scope">
                <el-button type="text" @click="openPunlicContentDialog(scope.row)"><i class="my-icon-details"></i>查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column
        v-for="column in pathConfig.table_column_labels"
        :key="column.prop"
        :prop="column.prop"
        :label="column.name"
        v-bind="column.config"
      >
        <template slot-scope="scope">
          {{
          column.filter
          ? column.filter(scope.row[column.prop])
          : scope.row[column.prop]
          }}
        </template>
      </el-table-column>

      <el-table-column label="操作" size="small">
        <template slot-scope="scope">
          <el-button type="text" @click="openCertifyFile(scope.row)">下载证明文件</el-button>
        </template>
      </el-table-column>
    </el-table>-->
    <div class="pagination-wrapper">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="10"
        :current-page.sync="queryForm.Page"
        background
        layout="total,prev, pager, next,jumper"
        :total="parseInt(total)"
      ></el-pagination>
    </div>
    <el-dialog
      append-to-body
      :visible.sync="visibleCheck"
      class="dialog"
      width="600px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div class="dialog-title" slot="title">{{ $route.name.replace(/订单管理/g, '产品审核') }}</div>
      <el-form label-width="140px" size="small" style="position: relative;right: 59px;">
        <el-form-item>
          <span>审批理由</span>
          <el-input type="textarea" :rows="2" placeholder="请输入" v-model="checkDataModel.opinion"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="closeCheck()" size="small">取 消</el-button>
        <el-button type="primary" @click="onCheckConfirm" size="small">通 过</el-button>
        <el-button type="warning" @click="onCheckReject" size="small">拒绝</el-button>
      </div>
    </el-dialog>
    <PublicContentDialog
      title="测试"
      :type="info_type"
      :options="options"
      :visible.sync="punlicContentDialogVisible"
      :visible_cart="false"
      :visible_shopping="false"
    />
  </div>
</template>

<script>
import MenuTitle from '@/components/menuTitle'
import SearchBtn from '@/components/searchBtn'
import config from './config.js'
import PublicContentDialog from '@/components/publicContentDialog'
import { getdetails,QueryDataInfo,InsertLog} from '@/api/system/options.js'
import { dealOptions } from '@/components/public/common'
export default {
  components: {
    MenuTitle,
    SearchBtn,
    PublicContentDialog
  },
  data() {
    return {
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
      punlicContentDialogVisible: false,
      loading: false,
      CheckedTypeOptions: [
        { value: 1, label: '未审批' },
        { value: 2, label: '审批通过' },
        { value: 3, label: '无需审批' },
        { value: 4, label: '审批拒绝' },
        { value: 5, label: '不能下载' }
      ],
      visibleCheck: false,
      queryForm: {
        BeginAddTime: '',
        EndAddTime: '',
        PageSize: 10,
        Page: 1,
        UserName: '',
        TaskInfoStatus: '',
        
      },
      total: 0,
      tableData: [],
      multipleSelection: [], //存储选中的表格数据
      checkDataModel: { ids: [], opinion: '' },
      detailSelectId: '',
      selectKey: '',
       info_type:"",//详情页面类型 mini（遥感） medium（专题产品、成果）
    }
  },

  computed: {
    pathConfig() {
      return config[this.currentPageLastPath]
    },
    currentPageLastPath() {
      return this.$route.path.split('/').pop()
    },
    currentPageTitle() {
      return this.$route.name
    }
  },
  mounted() {
    this.onSearch()
  },
  watch: {
    $route(route) {
      this.onSearch()
     
    }
  },
  filters: {
    filterTime(val) {
      return moment(val).format('YYYY-MM-DD')
    }
  },
  methods: {
    //全选
    handleCheckAllChange(item,index){
      if(!this.tableData[index].checkAll){
        this.$refs.detailTable[index].toggleAllSelection(item,false);
      }
      else{
         this.$refs.detailTable[index].toggleAllSelection(item,true);
      }
    },
    //选中状态
    tableChangeSel(selection,item,index) {
      this.tableData[index].multipleSelection = selection
      let checkedCount = selection.length;
      this.tableData[index].checkAll = checkedCount === this.tableData[index].taskinfoList.length;
      this.tableData[index].isIndeterminate = checkedCount > 0 && checkedCount < this.tableData[index].taskinfoList.length;
     
      // this.multipleSelection = row
      },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex > 6) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 40,
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
    //查看
    openPunlicContentDialog(row) {
      let _id = ''
      let _type = ''
      _id = row.dataId;
      if(row.dataType==1||!row.dataType)
      {
          _type='raster';
          this.info_type="mini";
          getdetails({id:_id,type:_type},{module:'系统管理-'+this.$route.name})
          .then((res)=>{
              this.options=dealOptions(_type,res.data)
              this.punlicContentDialogVisible = true;
          }).catch((err)=>{
              console.log(err)
          })
      }
      else{
          this.info_type="medium";
        if(row.dataType==3)
      {
          _type='special';
      }
      else if(row.dataType==2)
      {
          _type='data';
      }
      QueryDataInfo({id:_id,type:_type},{module:'系统管理-'+this.$route.name})
      .then((res)=>{
          this.options=dealOptions(_type,res.data)
          this.punlicContentDialogVisible = true;
      }).catch((err)=>{
          console.log(err)
      })
      }
    },
    closeCheck() {
      this.visibleCheck = false
    },
    //通过审批
    onCheckConfirm() {
      let list = []
      this.tableData[this.selectKey].multipleSelection.forEach(t => {
        list.push({
          id: t.id,
          status: 1, //通过，
          reason: this.checkDataModel.opinion
        })
      })
      this.$axios.post('/TYwDatataskinfo/CheckSaveDataList', list).then(res => {
        // data.children=JSON.parse(res.data).data;
        this.$notify({
          type: 'success',
          message: '通过成功',
          offset: 100
        })
        this.closeCheck()
      })
    },
    //拒绝审批
    onCheckReject() {
      this.closeCheck()
    },
    handleSelect(val) {
      this.detailSelectId = val.id
    },
    sectableChangeSel(row, key) {
      this.tableData[key].multipleSelection = row
    },
    onSearch(id) {
      this.loading = true
      const {
        BeginAddTime,
        EndAddTime,
        PageSize,
        Page,
        UserName,
        TaskInfoStatus
      } = this.queryForm
      this.pathConfig
        .searchApi({
          BeginAddTime,
          EndAddTime,
          PageSize,
          Page,
          UserName,
          TaskInfoStatus
        })
        .then(({ data, totalCount }) => {
          this.tableData = data.map(item => {
            return {
              ...item,
              dataList: [],
              checkAll: false,
              isExpanded: false,
              isIndeterminate:false,
              multipleSelection: []
            }
          })
          this.total = totalCount
        })
        .finally(() => {
          this.loading = false
        })
    },
    handleCurrentChange(pageIndex) {
      this.queryForm.Page = pageIndex
      this.onSearch()
    },
    //审核订单数据信息
    getFiles(row) {
      row.isExpanded = !row.isExpanded
      if (row.isExpanded == false) return
      this.loading = true
      this.pathConfig
        .getInfo({ TaskId: row.id })
        .then(({ data }) => {
          row.dataList = data
        })
        .finally(() => {
          this.loading = false
        })
    },
    //审核订单数据
    checkOrderInfo(row, key) {
      this.selectKey = ''
      if (this.tableData[key].multipleSelection.length < 1) {
        this.$notify({
          type: 'warning',
          message: '请先选择数据再进行操作',
          offset: 100
        })
        return
      }
      this.selectKey = key
      this.visibleCheck = true
      this.checkDataModel = { ids: [], opinion: '' }
    },
    comfirm() {},
    openCertifyFile(item) {
      let orderid=item.orderid;
      const { downloadFile } = this.pathConfig
      this.$store.commit('SET_LOADING')
      downloadFile({ id: orderid }).then(res => {
        this.$store.commit('SET_LOADING')
        const downloadElement = document.createElement('a')
        const href = window.URL.createObjectURL(res) //创建下载的链接
        downloadElement.href = href
        downloadElement.download = '证明文件.zip' //下载后文件名
        document.body.appendChild(downloadElement)
        downloadElement.click() //点击下载
        document.body.removeChild(downloadElement) //下载完成移除元素
        window.URL.revokeObjectURL(href) //释放掉blob对象
      })
      InsertLog('系统管理-'+this.$route.name,"下载证明文件","下载证明文件",item.id);
    }
  }
}
</script>
<style module lang="less">
@import './index.less';
</style>


