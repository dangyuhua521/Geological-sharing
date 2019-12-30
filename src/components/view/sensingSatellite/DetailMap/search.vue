<template>
    <div class="map-search">
        <div class="map-search-input">
            <el-tabs
                type="border-card"
                class="my-icon-searchbg"
                style="height:100%;" v-model="mainTab"
            >
                <el-tab-pane
                    label="查询条件" name='select'
                    style="color: #666666;font-size: 14px;"
                >
                    <div class="search-result-content my-icon-searchbg">
                        <div class="result-li adv-li no-padding">
                            <el-tabs v-model="advActTab" style="width: 100%">
                                <el-tab-pane label="行政区" name="first">
                                    <span slot="label" class="slot-tab-label"
                                        >行政区</span
                                    >
                                    <el-form label-width="8em" size="small">
                                        <el-form-item label="省/市/自治州">
                                            <el-select
                                                v-model="advForm.province"
                                                placeholder="-- 省 --"
                                                style="width: 100%;"
                                                @change="chooseProvince"
                                                clearable
                                            >
                                                <el-option
                                                    v-for="item in provinceData"
                                                    :key="item.id"
                                                    :label="item.caption"
                                                    :value="item.id"
                                                >
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="地级市/区">
                                            <el-select
                                                v-model="advForm.city"
                                                placeholder="-- 市 --"
                                                style="width: 100%;"
                                                @change="chooseCity"
                                                clearable
                                            >
                                                <el-option
                                                    v-for="item in cityData"
                                                    :key="item.id"
                                                    :label="item.caption"
                                                    :value="item.id"
                                                >
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="县级市/县/区">
                                            <el-select
                                                v-model="advForm.county"
                                                placeholder="-- 县 --"
                                                style="width: 100%;"
                                                clearable
                                            >
                                                <el-option
                                                    v-for="item in countyData"
                                                    :key="item.id"
                                                    :label="item.caption"
                                                    :value="item.id"
                                                >
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-form>
                                </el-tab-pane>
                                <el-tab-pane label="经纬度" name="second">
                                    <span slot="label" class="slot-tab-label"
                                        >经纬度</span
                                    >
                                    <el-form
                                        label-width="6em"
                                        class="el-row"
                                        size="small"
                                    >
                                        <el-form-item
                                            label="左上经度"
                                            class="el-col-12"
                                            title="范围包含在(-90,90)之内"
                                        >
                                            <el-input
                                                clearable
                                                v-model="lonLat.longitudeLeft"
                                            ></el-input
                                        ></el-form-item>
                                        <el-form-item
                                            label="左上纬度"
                                            class="el-col-12"
                                            title="范围包含在(-180,180)之内"
                                        >
                                            <el-input
                                                clearable
                                                v-model="lonLat.latitudeLeft"
                                            ></el-input
                                        ></el-form-item>
                                        <el-form-item
                                            label="右下经度"
                                            class="el-col-12"
                                            title="范围包含在(-90,90)之内"
                                        >
                                            <el-input
                                                clearable
                                                v-model="lonLat.longitudeRight"
                                            ></el-input
                                        ></el-form-item>
                                        <el-form-item
                                            label="右下纬度"
                                            class="el-col-12"
                                            title="范围包含在(-180,180)之内"
                                        >
                                            <el-input
                                                clearable
                                                v-model="lonLat.latitudeRight"
                                            ></el-input
                                        ></el-form-item>
                                    </el-form>
                                    <el-form
                                        label-width="6em"
                                        class="el-row"
                                        size="small"
                                    >
                                        <el-form-item style="text-align: right">
                                            <el-button
                                                type="primary"
                                                @click="onClick_LonLatConvert()"
                                                >度分秒转换</el-button
                                            >
                                            <el-button
                                                type="warning"
                                                @click="
                                                    onClick_draw('经纬度定位')
                                                "
                                                >&nbsp;&nbsp;定&nbsp;位&nbsp;&nbsp;</el-button
                                            >
                                            <el-button
                                                type="default"
                                                @click="
                                                    onClick_draw('经纬度清除')
                                                "
                                                >&nbsp;&nbsp;清&nbsp;除&nbsp;&nbsp;</el-button
                                            >
                                        </el-form-item>
                                    </el-form>
                                </el-tab-pane>
                                <el-tab-pane label="shp导入" name="third">
                                    <span slot="label" class="slot-tab-label"
                                        >范围面查询</span
                                    >
                                    <p style="margin-top: 0">
                                        shp上传
                                    </p>
                                    <div>
                                        <el-upload
                                            class="upload-demo"
                                            action=""
                                            id="file"
                                            ref="upload"
                                            name="uploadFile"
                                            :multiple="false"
                                            :limit="1"
                                            :auto-upload="false"
                                            :on-remove="handleRemove"
                                            accept="shp"
                                            :on-success="fileUpload"
                                            :on-change="handlePreview"
                                            :show-file-list="false"
                                        >
                                            <el-button
                                                size="small"
                                                type="primary"
                                                >上传shp文件</el-button
                                            >
                                        </el-upload>
                                    </div>

                                    <p>地图框选查询</p>
                                    <div>
                                        <el-button
                                            size="small"
                                            type="primary"
                                            @click="onClick_draw('绘制矩形')"
                                            >绘制矩形</el-button
                                        >
                                        <el-button
                                            size="small"
                                            type="primary"
                                            @click="onClick_draw('绘制多边形')"
                                            >绘制多边形</el-button
                                        >
                                    </div>
                                </el-tab-pane>
                            </el-tabs>
                        </div>
                        <el-form
                            label-width="6em"
                            class="form-group"
                            size="small"
                        >
                            <div class="result-li adv-li">
                                <el-form label-width="5em" size="small">
                                    <el-form-item
                                        label="采集时间"
                                        style="margin-bottom: 0;"
                                    >
                                        <div class="adv-title" slot="label">
                                            采集时间
                                        </div>
                                        <el-date-picker
                                            style="width:150px;line-height: 20px; font-size: 13px;"
                                            v-model="advForm.beginReceiveTime"
                                            type="date"
                                            placeholder="选择日期"
                                        >
                                        </el-date-picker>
                                        -
                                        <el-date-picker
                                            style="width: 150px;line-height: 20px; font-size: 13px;"
                                            v-model="advForm.endReceiveTime"
                                            type="date"
                                            placeholder="选择日期"
                                        >
                                        </el-date-picker>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <div class="result-li adv-li">
                                <div class="adv-title">传感器选择</div>
                                <div style="margin-top: 10px">
                                    <el-form-item
                                        v-for="(item, index) in sensorsData"
                                        :key="index"
                                        :label="item.satellite"
                                      style="font-weight: bold;"
                                    >:
                                        <el-checkbox-group
                                        style="display: inline-block;margin-left: 13px;"
                                            v-model="item.sensorsSel"
                                            @change="testChange(item, index)"
                                        >
                                            <el-checkbox
                                                v-for="(items,
                                                indexs) in item.sensors"
                                                :key="indexs"
                                                :label="items"
                                            ></el-checkbox>
                                        </el-checkbox-group>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="result-li adv-li">
                                <el-form-item label="云量">
                                    <div class="adv-title" slot="label">
                                        云量
                                    </div>
                                    <el-slider
                                        :show-tooltip="false"
                                        v-model="advForm.cloudpercent"
                                        range
                                        style="width: calc(100% - 6em);display: inline-block;vertical-align: middle"
                                    ></el-slider>
                                    <span
                                        style="vertical-align: middle;padding-left: 10px"
                                        >{{ advForm.cloudpercent[0] }}-{{
                                            advForm.cloudpercent[1]
                                        }}%</span
                                    >
                                </el-form-item>
                            </div>
                            <div style="text-align:center;margin: 20px 0">
                                <el-button
                                    type="primarys"
                                    size="small"
                                    style="height:38px;color: #fff;border-color: #409eff;background: #409eff;"
                                    @click="onClick_search()"
                                    >查 询</el-button
                                >
                                <el-button
                                    type="default"
                                    size="small"
                                    @click="reset()"
                                    >重 置</el-button
                                >
                            </div>
                        </el-form>
                    </div>
                </el-tab-pane>
                <el-tab-pane
                    label="查询结果" name='result'
                    style="color: #666666;font-size: 14px;"
                >
                    <div class="search-result-content">
                        <div class="result-li-sj">
                            <el-row>
                                <el-col :span="24" style="text-align:right;">
                                    <el-button
                                        class="result-li-btn color-primary"
                                        @click="cart()"
                                        ><i class="my-icon-Collection"></i
                                        >数据收藏</el-button
                                    >
                                    <el-button
                                        class="result-li-btn color-warning"
                                        @click="shopping"
                                        ><i class="my-icon-shopCart"></i
                                        >加入购物车</el-button
                                    >
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                    <div class="result-lis" style="margin-top:18px;">
                        <div class="result-result">
                            <!-- 查询结果 <span style="color:#0f8deb; padding-left:18px;padding-right:4px;">71</span><span>景</span><span> , -->
                            <span>已选择</span
                            ><span
                                style="color:#0f8deb; padding-left:18px;padding-right:4px;"
                                >{{ multipleSelection.length }}</span
                            ><span style="margin-right:16px;">景</span>
                        </div>
                        <el-table
                            highlight-current-row
                            ref="multipleTable"
                            :data="tableDatas"
                            tooltip-effect="dark"
                            style="width: 100% "
                            height="650"
                            @selection-change="handleSelectionChange"
                            @row-click="rowClick"
                            @cell-mouse-enter="cellEnter"
                            @cell-mouse-leave="cellLeave"
                        >
                            <el-table-column
                                type="selection"
                                width="50"
                            ></el-table-column>
                            <el-table-column prop="satellite" label="卫星">
                            </el-table-column>
                            <el-table-column
                                prop="sensor"
                                label="传感器"
                                show-overflow-tooltip
                            >
                            </el-table-column>
                            <el-table-column
                                width="100"
                                prop="receivetime"
                                label="时间"
                                show-overflow-tooltip
                            >
                             <template slot-scope="scope">
                                <div>{{ scope.row.receivetime | timeFilter }}</div>
                            </template>
                            </el-table-column>
                            <el-table-column
                                width="50"
                                prop="cloudpercent"
                                label="云量"
                                show-overflow-tooltip
                            >
                            </el-table-column>
                            <el-table-column label="操作"
                                width="70">
                                <template slot-scope="scope">
                                    <i
                                        class="my-icon-layer"
                                        @click="information(scope.row)"
                                    ></i>
                                    <i class="my-icon-eye"></i>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="pagination-wrapper">
                        <el-pagination
                            @current-change="handleCurrentChange"
                            :page-size="10"
                            :current-page.sync="advForm.page"
                            background
                            layout="total,prev, pager, next,jumper"
                            :total="parseInt(total)"
                        >
                        </el-pagination>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <mini
            title="影视详情"
            :type="pathConfig.type"
            :options="options"
            :visible.sync="dialogTableVisible"
            :visible_cart="true"
            :visible_shopping="true"
            :Datdid="info_Datdid"
            :DataName="info_DataName"
            :Datatype="info_Datatype"
            :DepId="info_DepId"

        >
        </mini>
    </div>
</template>

<script>
import vmson from '../../../../utils/emptyVue.js'
import mini from '@/components/publicContentDialog'

import config from '@/components/view/userManager/orderManagement/config'
import { getToken } from '@/utils/auth'
import { getdetails } from '@/api/system/options.js'
import { dealOptions } from '@/components/public/common'
export default {
    name: 'search',
    components: {
        mini
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
            lonLat: {
                longitudeLeft: 0, //经度
                latitudeLeft: 0, //纬度
                longitudeRight: 0,
                latitudeRight: 0
            },
            DecimallonLat: {
                longitudeLeft: 0, //经度
                latitudeLeft: 0, //纬度
                longitudeRight: 0,
                latitudeRight: 0
            },
            total: 1,
            procedure: { lastID: '' },

            showAdv: false,
            dialogTableVisible: false,
            modifyFormVisible: false,
            showSearchResult: false,
            tableDatas: [],
            multipleSelection: [],
            queryData: {
                Keyword: '',
                serviceID: ''
            },
            advActTab: 'first',
            mainTab:'select',
            advForm: {
                type: '',
                cloudpercent: [0, 100],
                county: '',
                city: '',
                province: '',
                sensors: [],
                queryType: '',
                province: '',
                city: '',
                county: '',
                geom: '',
                srid: '',
                satellite: '',
                sensor: '',
                cloudPercentMin: null,
                cloudPercentMax: null,
                beginReceiveTime: '',
                endReceiveTime: '',
                type: 'raster',
                page: 1,
                pagesize: 10
            },
            sensorsData: [
                {
                    satellite: '',
                    sensors: ''
                }
            ],
            countyData: [],
            cityData: [],
            provinceData: [],
            searchDatas: [],
            itemData: [],
            loading: true,
            istoken: false,
            info_Datdid: "",
            info_DataName: "",
            info_Datatype: "",
            info_DepId: "",
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
    mounted() {
        vmson.$emit('emit_set_page_mapInit', '卫星遥感资源大厅')
    },
    created() {
        var data = localStorage.getItem('token')
        if (data) {
            this.istoken = true
        } else {
            this.istoken = false
        }
        this.queryDistrict()
        this.sensorsSuer()
    },
    methods: {
        //传感器选择
        sensorsSuer() {
            this.$axios
                .get('/TYwDatataskinfo/RasterQueryRasterDic')
                .then(res => {
                    var data = JSON.parse(res.data).data
                    data.forEach(t => {
                        t.sensorsSel = []
                    })
                    this.sensorsData = data
                })
        },
        queryDistrict() {
            this.$axios
                .get('/TYwDatataskinfo/RasterQueryDistrict')
                .then(res => {
                    this.provinceData = JSON.parse(res.data).data
                })
        },
        chooseProvince(value) {
            this.advForm.city = ''
            this.advForm.county = ''
            this.cityData = []

            this.countyData = []
            this.provinceData.map(e => {
                //遍历数据
                if (value == e.id) {
                    this.cityData = e.children
                    return
                }
            })
        },
        chooseCity(value) {
            this.advForm.county = ''
            this.cityData.map(e => {
                //遍历数据
                if (value == e.id) {
                    this.countyData = e.children
                    return
                }
            })
        },
        handleSelectionChange(val) {
            this.multipleSelection = val
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
                    offset: 100, 
                })
                this.procedure = {}
                this.modifyFormVisible = false
                this.onClick_search()
            })
        },
        //加入收藏
        cart(data) {
            var _this = this
            if (!getToken()) {
                this.$notify({
                    message: '请登录',
                    type: 'error',
                    offset: 100,
                })
                return
            }
            let length = this.multipleSelection.length
            if (this.multipleSelection.length == 0) {
                this.$notify({
                    message: '请先选择数据再进行操作',
                    type: 'warning',
                    offset: 100,
                })
                return
            }
            var _data = []
            for (let i = 0; i < length; i++) {
                _data.push({
                    Datdid: this.multipleSelection[i].id,
                    DataName: this.multipleSelection[i].name,
                    Datatype: 1,
                    DepId: this.multipleSelection[i].ownerid
                })
            }
            this.$axios
                .post('/TYwDatacollection/SaveDataList', _data)
                .then(res => {
                    //++++++++++++++++++是否操作成功判断++++++++++++++++++
                    this.$notify({
                        message: '收藏成功',
                        type: 'success',
                        offset: 100,
                    })
                    this.queryData = {}
                    this.onClick_search()
                })
        },
        shopping(data) {
            if (!getToken()) {
                this.$notify({
                    message: '请登录',
                    type: 'error',
                    offset: 100,
                })
                return
            }
            let length = this.multipleSelection.length
            if (this.multipleSelection.length == 0) {
                this.$notify({
                    message: '请选择',
                    type: 'warning',
                    offset: 100,
                })
                return
            }
            this.queryData.serviceID = this.itemData.id
            // let length = this.multipleSelection.length
            var _data = []

            for (let i = 0; i < length; i++) {
                _data.push({
                    Datdid: this.multipleSelection[i].id,
                    DataName: this.multipleSelection[i].name,
                    Datatype: 1,
                    DepId: this.multipleSelection[i].ownerid
                })
            }
            this.$axios
                .post('/TYwDatashoping/SaveDataList', _data)
                .then(res => {
                    this.$notify({
                        type: 'success',
                        message: '成功加入购物车!',
                        offset: 100,
                    })
                })
            this.queryData = {}
            this.onClick_search()
        },
        handleCurrentChange(val) {
            this.advForm.page = val
            this.searchingData()
        },
        showDownload() {
            this.modifyFormVisible = true
        },
        //详情
        information(row) {
            getdetails({ id: row.id, type: 'raster' },{module:this.$route.name})
                .then(res => {
                    this.info_Datdid= row.id,
                    this.info_DataName=row.name,
                    this.info_Datatype= 1,
                    this.info_DepId= row.ownerid,
                    this.options = dealOptions('raster', res.data)
                    this.dialogTableVisible = true
                })
                .catch(err => {
                    console.log(err)
                })
        },
        clearUpLoadFiles() {
            this.$refs.upload.clearFiles()
        },
        //删除上传shp文件处理
        handleRemove(file, fileList) {
            this.clearUpLoadFiles()
        },
        //上传shp文件处理
        handlePreview(file, fileList) {
            var _this = this
            //获得文件格式
            var ftype = file.name.split('.')[file.name.split('.').length - 1]
            if (ftype != '' && ftype != 'shp') {
                //删除不能同时文件名不同的文件
                //this.fileList=fileList.slice(0,fileList.length-1);
                 this.$notify({
                    type: 'error',
                    message:'只能上传shp文件！',
                    offset: 100,
                })
                _this.handleRemove(file, fileList)
                return
            }
            vmson.$emit('emit_t1_handlePreview', file, fileList)
            _this.clearUpLoadFiles()
        },
        //上传shp文件处理 暂无使用
        fileUpload(file, fileList) {},
        // true:数值型的，false：非数值型
        isRealNum(value) {
            var n = Number(value)
            if (!isNaN(n)) {
                // alert("是数字");
                return true
            } else {
                return false
            }
        },
        formatDegree(value) {
            ///<summary>将度转换成为度分秒</summary>
            value = Math.abs(value)
            var v1 = Math.floor(value) //度
            var v2 = Math.floor((value - v1) * 60) //分
            var v3 = Math.round(((value - v1) * 3600) % 60) //秒
            return v1 + '°' + v2 + "'" + v3 + '"'
        },
        DegreeConvertBack(value) {
            ///<summary>度分秒转换成为度</summary>
            var du = value.split('°')[0]
            var fen = value.split('°')[1].split("'")[0]
            var miao = value
                .split('°')[1]
                .split("'")[1]
                .split('"')[0]

            return (
                Math.abs(du) +
                '.' +
                (Math.abs(fen) / 60 + Math.abs(miao) / 3600)
            )
        },
        onClick_LonLatConvert() {
            if (
                this.isRealNum(this.lonLat.longitudeLeft) ||
                this.isRealNum(this.lonLat.latitudeLeft) ||
                this.isRealNum(this.lonLat.longitudeRight) ||
                this.isRealNum(this.lonLat.latitudeRight)
            ) {
                if (this.isRealNum(this.lonLat.longitudeLeft))
                    this.lonLat.longitudeLeft = this.formatDegree(
                        this.lonLat.longitudeLeft
                    )
                if (this.isRealNum(this.lonLat.latitudeLeft))
                    this.lonLat.latitudeLeft = this.formatDegree(
                        this.lonLat.latitudeLeft
                    )
                if (this.isRealNum(this.lonLat.longitudeRight))
                    this.lonLat.longitudeRight = this.formatDegree(
                        this.lonLat.longitudeRight
                    )
                if (this.isRealNum(this.lonLat.latitudeRight))
                    this.lonLat.latitudeRight = this.formatDegree(
                        this.lonLat.latitudeRight
                    )
            } else {
                this.lonLat.longitudeLeft = this.DegreeConvertBack(
                    this.lonLat.longitudeLeft
                )
                this.lonLat.latitudeLeft = this.DegreeConvertBack(
                    this.lonLat.latitudeLeft
                )
                this.lonLat.longitudeRight = this.DegreeConvertBack(
                    this.lonLat.longitudeRight
                )
                this.lonLat.latitudeRight = this.DegreeConvertBack(
                    this.lonLat.latitudeRight
                )
            }
        },
        //测试点击事件
        onClick_draw(val) {
            if (val == '经纬度定位') {
                this.DecimallonLat = JSON.parse(JSON.stringify(this.lonLat))
                if (!this.isRealNum(this.DecimallonLat.longitudeLeft)) {
                    this.DecimallonLat.longitudeLeft = this.DegreeConvertBack(
                        this.DecimallonLat.longitudeLeft
                    )
                }
                if (!this.isRealNum(this.DecimallonLat.latitudeLeft)) {
                    this.DecimallonLat.latitudeLeft = this.DegreeConvertBack(
                        this.DecimallonLat.latitudeLeft
                    )
                }
                if (!this.isRealNum(this.DecimallonLat.longitudeRight)) {
                    this.DecimallonLat.longitudeRight = this.DegreeConvertBack(
                        this.DecimallonLat.longitudeRight
                    )
                }
                if (!this.isRealNum(this.DecimallonLat.latitudeRight)) {
                    this.DecimallonLat.latitudeRight = this.DegreeConvertBack(
                        this.DecimallonLat.latitudeRight
                    )
                }
                vmson.$emit('emit_t1_onClick_draw', val, this.DecimallonLat)
            } else {
                vmson.$emit('emit_t1_onClick_draw', val)
                if (val == '经纬度清除') {
                    this.lonLat = {
                        longitudeLeft: 0, //经度
                        latitudeLeft: 0, //纬度
                        longitudeRight: 0,
                        latitudeRight: 0
                    }
                }
            }
        },
        //重置
        reset() {
            this.advForm = {
                type: '',
                cloudpercent: [0, 100],
                county: '',
                city: '',
                province: '',
                sensors: [],
                queryType: '',
                province: '',
                city: '',
                county: '',
                geom: '',
                srid: '',
                satellite: '',
                sensor: '',
                cloudPercentMin: null,
                cloudPercentMax: null,
                beginReceiveTime: '',
                endReceiveTime: '',
                type: 'raster',
                page: 1,
                pagesize: 10
            }
        },
        searchingData() {
            var qmodel = {
                type: 'raster',
                queryType: this.advForm.queryType,
                province: this.advForm.province,
                city: this.advForm.city,
                county: this.advForm.county,
                geom: this.advForm.geom,
                srid: this.advForm.srid,
                sensor: '',
                cloudPercentMin: this.advForm.cloudpercent[0],
                cloudPercentMax: this.advForm.cloudpercent[1],
                beginReceiveTime: this.advForm.beginReceiveTime,
                endReceiveTime: this.advForm.endReceiveTime,
                page: this.advForm.page,
                pagesize: this.advForm.pagesize
            }
            // let geom=vmson.$emit('emit_get_mapBoxSelectChange');
            // console.log("geom",geom);
            var d = []
            if (this.sensorsData)
                this.sensorsData.forEach(t => {
                    t.sensorsSel.forEach(t0 => {
                        d.push({
                            satellite: t.satellite,
                            sensor: t0
                        })
                    })
                })
            qmodel.sensor = d
            this.$axios
                .post('/TYwDatataskinfo/RasterQueryData', qmodel)
                .then(res => {
                    this.tableDatas = JSON.parse(res.data).data.data
                    // //添加到显示数组
                    // var data = JSON.parse(JSON.stringify(initTestDataForDataRaster)) //initTestDataForDataRaster  initTestDataForMap
                    var data = JSON.parse(JSON.stringify(this.tableDatas))
                    var list = []
                    data.forEach(element => {
                        element['isSelect'] = false
                        element['isView'] = false
                        list.push(element)
                    })
                    this.tableDatas = data
                    //  _this.total = res.data.totalCount;
                    vmson.$emit('emit_t1_AddGraphicForSearch', this.tableDatas, false)
                })
        },
        onClick_search() {
            // queryType	string
            // 查询类型，district：行政区域，latlong:经纬度，scope:范围查询
            // console.log(this.$store.state.mapStore.mapGeomValue)
            // console.log(this.$store.state.mapStore.mapGeomWkid)
            if(this.advActTab!='first'){
                this.advForm.queryType='scope';
                this.advForm.geom=this.$store.state.mapStore.mapGeomValue;
                this.advForm.srid=this.$store.state.mapStore.mapGeomWkid;
                if(this.advForm.srid=='102100'||this.advForm.srid==102100){
                    this.advForm.srid=3857
                }
            }else{
                this.advForm.geom='';
                this.advForm.srid='';
                this.advForm.queryType='district';
            }
            this.advForm.page = 1
            this.searchingData();
            this.mainTab='result';
        },
        rowClick(row, column, event) {
            // this.onClick_handle(0, row, '选中');
            row.isSelect=false;
            this.onClick_handle(0, row, '定位');
        },
        cellEnter(row, column, cell, event){
            row.isSelect=false;
            this.onClick_handle(0, row, '选中');
        },
        cellLeave(row, column, cell, event){
            row.isSelect=true;
            this.onClick_handle(0, row, '选中');
        },
        //搜索结果
        onClick_handle(index,row,val) {
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
                'emit_t1_onClick_handle',
                _this.tableDatas,
                index,
                row,
                val
            )
        },
        testChange(data, index) {
            console.info(this.sensorsData)
        }
    }
}
</script>
<style scope lang="less">
.el-tabs__nav-wrap {
    overflow: hidden;
    margin-bottom: -1px;
    background: #f2f2f2;
    position: relative;
    border-bottom: 1px solid #dedede;
}

.el-tabs--border-card > .el-tabs__content {
    padding: 0;
}
.el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
    border-bottom: 4px solid #0f8deb;
    background-color: #f4f4f4;
}
.el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 100%;
}
.result-result {
    float: right;
    color: #666666;
    font-size: 14px;
    margin-bottom: 8px;
}
.el-tabs__item {
    padding: 0 22px;
}
</style>

