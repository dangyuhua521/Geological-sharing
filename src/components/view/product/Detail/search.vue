<template>
    <div class="map-searchs ">
        <div class="map-search-inputs my-icon-searchbg">
            <div style="background:#f2f2f2;">
                <el-input
                    placeholder="请输入内容"
                    v-model="search.search"
                    class="query-inputs"
                >
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
                <div class="search-right-box">
                    <el-button
                        class="search-query-btn"
                        @click="onClick_search()"
                        icon="el-icon-search"
                        type="primary"
                    ></el-button>
                </div>
                <div class="map-box-select">
          <el-checkbox
            v-model="mapBoxSelectChecked"
            @change="mapBoxSelectChange"
            >框选查询</el-checkbox
          >
          <el-button
            v-if="mapBoxSelectChecked"
            size="small"
            type="primary"
            @click="onClick_draw('绘制矩形')"
            >矩形</el-button
          >
          <el-button
            v-if="mapBoxSelectChecked"
            size="small"
            type="primary"
            @click="onClick_draw('绘制多边形')"
            >多边形</el-button
          >
        </div>
            </div>
            <div class="map-search-result" >
                <el-collapse   v-model="activeNames">
          <el-collapse-item  v-for="(item, index) in treeData" :key="index" :name="item.caption">
            <template slot="title" >
              {{ item.caption }}
              <span>({{ item.count }})</span>
            </template>
            <div class="tree" >
              <el-tree
                :data="item.children"
                node-key="id"
                highlight-current
                :default-expanded-keys="KeysId"
                :check-on-click-node="true"
                @node-click="treeCheckChange"
                ref='getCheckedNodeList'
              >
                <span class="custom-tree-node" slot-scope="{ node, data }">
                  <span v-if="data.isgroup" > <i class="my-icon-folder" ></i>{{ data.caption}}</span>
                   <span v-if="data.isgroup"> ({{data.count}}) </span>
              
                    <span  v-if="!data.isgroup" @click="treeCheckChangeInfo(data)"> <i class="my-icon-imgs" ></i>{{ data.caption}} </span>
                   
                </span>
              </el-tree>
            </div>
          </el-collapse-item>
           <div v-if="nodata" style="text-align: center;color:#606266;">暂无数据</div>
        </el-collapse>
            </div>
        </div>
        <PublicContentDialog
            title="地质成果数据"
            type="small"
            :options="options"
            :visible.sync="dialogTableVisible"
            :visible_cart='true'
            :visible_shopping='true'
            :Datdid="info_Datdid"
            :DataName="info_DataName"
            :Datatype="info_Datatype"
            :DepId="info_DepId"
        />
    </div>
</template>

<script>
import vmson from '../../../../utils/emptyVue.js'
import PublicContentDialog from '@/components/publicContentDialog'
import {
  QueryDataInfo
} from '@/api/system/options.js'
import {dealOptions} from '@/components/public/common'
export default {
    name: 'search',
    components: {
        PublicContentDialog
    },
    data() {
        return {
            info_Datdid: "",
            info_DataName: "",
            info_Datatype: "",
            info_DepId: "",
            options: {},
            checkedSevice: [],
            dialogTableVisible: false,
            mapBoxSelectChecked: false,
            nodata:false,
            search: {
                search: '',
                srid:4326,
                geom:''
            },
            KeysId:[],
            advActTab: 'first',
            geoData: {
                leftLng: ''
            },
            advForm: {
                startTime: '',
                endTime: '',
                cgq: [],
                yl: 10,
                county: '',
                city: '',
                province: ''
            },
            searchData: [],
            itemData: [],
            procedure: {},
            treeData: [],
            searchDatas: [],
             activeNames: []
        }
    },
    mounted() {
        vmson.$emit('emit_set_page_mapInit', '地质成果数据');
        this.onClick_search();
    },
    methods: {
        onClick_search() {
            console.log(this.$store.state.mapStore.mapGeomValue)
            console.log(this.$store.state.mapStore.mapGeomWkid)
            var data = this.search;
            if(this.mapBoxSelectChecked){
                data.geom=this.$store.state.mapStore.mapGeomValue;
                data.srid=this.$store.state.mapStore.mapGeomWkid;
                if(data.srid=='102100'||data.srid==102100){
                    data.srid=3857
                }
            }else{
                data.geom='';
                data.srid='';
            }
            this.nodata=false
            this.$axios
                .get('/TYwDatataskinfo/GetData',{
                    params: data
                })
                .then(res => {
                    let rdata=JSON.parse(res.data).data.children;
                    for(var i=0;i<rdata.length;i++)
                    {
                        rdata[i]= JSON.parse(JSON.stringify(this.dealTreePath(rdata[i],data)))
                        this.activeNames.push(rdata[i].caption)
                    }
                    this.treeData=rdata;
                    if(this.treeData&&this.treeData.length>0){
                        this.KeysId=[];
                        this.KeysId.push(this.treeData[0].id)
                    }else{
                       this.nodata=true
                    }
                })
            // 勿删！！！！！
            // //添加到显示数组
            // var data = JSON.parse(JSON.stringify(initTestDataForDataDossier)) //initTestDataForDataRaster  initTestDataForMap
            // var list = []
            // data.forEach(element => {
            //     element['isSelect'] = false
            //     element['isView'] = false
            //     list.push(element)
            // })
            // this.searchDatas = data
            // vmson.$emit('emit_t4_AddGraphicForSearch',
            // this.searchDatas, false)
        },
        dealTreePath(data,parentNode){
            if(data.type=='topic'){
                data.typepath=data.type;
                data.valuepath=data.value;
            }
            else{
                data.typepath=parentNode.typepath+'/'+data.type;
                data.valuepath=parentNode.valuepath+'/'+data.value;
            }
            if(data.children.length>0){
                for(var i=0;i<data.children.length;i++)
                {
                    data.children[i]= JSON.parse(JSON.stringify(this.dealTreePath(data.children[i],data)))
                }
            }
            return data;
        },
        treeCheckChange(data,node){
            if(data.isgroup&&data.children.length==0&&data.count>0)
            {
                let passSelectMsg = [];
                let types=data.typepath.split('/');
                let values=data.valuepath.split('/');
                for(let i=0;i<types.length;i++)
                {
                     passSelectMsg.push({
                        type:types[i],
                        value:values[i]
                    })
                }
                this.$axios
                .post('/TYwDatataskinfo/DataQueryCatalogData',{
                   conditions:passSelectMsg
                })
                .then(res => {
                    data.children=JSON.parse(res.data).data;
                    node.expanded=true;
                })
            }
        },
        treeCheckChangeInfo(data,node){
             if(!data.isgroup){
                //点击查看数据详情
                let _id='';
                let _type='';
                _id=data.id;
                _type='data';
                QueryDataInfo({id:_id,type:_type},{module:this.$route.name})
                .then((res)=>{
                    this.info_Datdid= res.data.data.id,
                    this.info_DataName=res.data.data.caption,
                    this.info_Datatype= 2,
                    this.info_DepId= res.data.data.dataId,//待确认部门字段******************************
                    this.options=dealOptions(_type,res.data)
                    this.dialogTableVisible = true;
                }).catch((err)=>{
                    console.log(err)
                })
            }
        },
        //搜索结果
        onClick_handle(index, row, val) {
            var _this = this
            switch (val) {
                case '选中':
                    row.isSelect = !row.isSelect
                    // _this.querySelect(row.isSelect, row.keyid);
                    break
                case '定位':
                    row.isSelect = !row.isSelect
                    // _this.gotoLocation(row);
                    break
                case '预览':
                    row.isView = !row.isView
                    // _this.queryView(row.isView, row.keyid);
                    break
            }
            vmson.$emit(
                'emit_t4_onClick_handle',
                _this.searchData,
                index,
                row,
                val
            )
        },
        //测试点击事件
        onClick_draw(val) {
        var _this = this
        vmson.$emit('emit_t4_onClick_draw', val)
        },
        mapBoxSelectChange() {
        vmson.$emit('emit_t4_mapBoxSelectChange', this.mapBoxSelectChecked)
        },
        get_mapBoxSelectChange() {
        return this.$parent.$children[0].get_mapBoxSelectChange()
        //  return this.$parent.$parent.$children[0].$children[0].get_mapBoxSelectChange();//searchList.vue 调用
        }
    }

}
</script>

<style lang="scss" scope>
.pagination-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 0;
    padding-top: 24px;
}
.map-box-select {
    margin: -18px 5px 9px 14px;
}
.map-box-select .el-checkbox {
    margin: 13px 5px 5px 5px;
}
.map-search-result{
  overflow-y: auto;
   height: calc(100% - 120px);
}
</style>
