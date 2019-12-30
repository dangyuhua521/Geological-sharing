<template>
    <div class="banner">
        <div id="viewDiv">
        </div>
        <!-- <div id='toolbar' class="maptool" v-if="showMapTool">
            <button type="button" class="button black" @click="onClick_draw('数据加载')">数据加载</button>
            <button type="button" class="button black" @click="onClick_draw('绘制矩形')">绘制矩形</button>            
            <button type="button" class="button black" @click="onClick_draw('绘制多边形')">绘制多边形</button>
            <button type="button" class="button black" @click="onClick_draw('清除')">清除</button>
            <el-upload class="upload-demo" id="file" ref="upload" name="uploadFile" :multiple="false" :limit='1'
                :on-remove="handleRemove" accept="shp" action="" :show-file-list="false"
                :on-success="fileUpload"  :auto-upload="false" :on-change='handlePreview'>
                <button type="button" id="uploadFileInput" class="button black">上传SHP文件</button>
                <el-button slot="trigger" class="button black" size="small" type="primary">选取文件</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </div> -->
        <div class="map-right-nav">
			<ul>
                <li>
                    <img src="/static/img/友情链接.png">
                    <el-dropdown>
						<span class="el-dropdown-link" style="font-size:16px;color:#000000" @mouseenter="overDrop(4)" @mouseleave="leaveDrop(4)">
							友情连接
							<i class="el-icon-arrow-down el-icon--right" :class="{'icon-rotate':isrotate4}"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-for="(item, index) in FriendlyLinkList" :key="index">
                                <a :href="item.url"  target="_blank">{{item.label}}</a>
                            </el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</li>
                <li @click="select_mapServer('地图')">
					<img src="/static/img/map.png">地图
				</li>
                <li @click="select_mapServer('卫星')">
                    <img src="/static/img/satellite.png">
                    <el-dropdown @command="select_mapServer">
						<span class="el-dropdown-link" style="font-size:16px;color:#000000" @mouseenter="overDrop(2)" @mouseleave="leaveDrop(2)">
							卫星
							<i class="el-icon-arrow-down el-icon--right" :class="{'icon-rotate':isrotate2}"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="路网">路网</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</li>
				<li>
					<img src="/static/img/tool.png">
					<el-dropdown @command="select_tool">
						<span class="el-dropdown-link" style="font-size:16px;color:#000000" @mouseenter="overDrop(3)" @mouseleave="leaveDrop(3)">
							工具箱
							<i class="el-icon-arrow-down el-icon--right" :class="{'icon-rotate':isrotate3}"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="全幅">全幅显示</el-dropdown-item>
                            <el-dropdown-item command="上一">前一视图</el-dropdown-item>
							<el-dropdown-item command="下一">后一视图</el-dropdown-item>
							<el-dropdown-item command="测线">测距</el-dropdown-item>
							<el-dropdown-item command="测面">测面</el-dropdown-item>
                            <el-dropdown-item command="关闭底图">关闭底图</el-dropdown-item>
							<!-- <el-dropdown-item command="清除">清除</el-dropdown-item> -->
						</el-dropdown-menu>
					</el-dropdown>
				</li>
                <li @click="select_tool('清除')">
					<img src="/static/img/Eliminate.png">清除
				</li>
			</ul>
		</div>
        <div class="mear_label" v-show="showStyle!=null">
			<p v-show="showStyle=='mearLine'">总长：{{popupContent.length}}</p>
			<p v-show="showStyle=='mearGon'">总面积：{{popupContent.area}}</p>
			<p v-show="showStyle=='mearLine'||showStyle=='mearGon'||showStyle=='mapLabel'">单击确定，双击结束</p>
			<p v-show="showStyle=='spaceQuery'">拖拽拉框选择范围</p>
			<p v-show="showStyle=='bufferQuery'">选择位置，可输入属性查询</p>
			<p v-show="showStyle=='mearHeight'">右键点击停止</p>
			<p v-show="showStyle=='cutFillTrue'||showStyle=='cutFillFalse'">当前范围面积：{{popupContent.area}}平方米</p>
			<p v-show="showStyle=='cutFillTrue'" style="color:green">正常分析范围</p>
			<p v-show="showStyle=='cutFillFalse'" style="color:red">超出分析范围</p>
		</div>
        <div class="map-searve" v-if="pageInfo=='地质专题产品'">
			<div class="searve-top">专题服务</div>
			<!-- <div style="max-height: 250px;"> -->
			<div class="right-menu-content">
					<el-tree class="my-tree" empty-text="未加载图层" :data="dataPorodurtLayersData" node-key="id" ref="tree"
					 default-expand-all :expand-on-click-node="true" :draggable="dataPorodurtLayersData.length>1" :allow-drop="allowDrop"
					 :allow-drag="allowDrag" @node-drop="handleDrop">
						<span class="custom-tree-node" slot-scope="{ node, data }">
							<div class="layers-li">
								<span class="my-checkbox">
									<el-checkbox v-model="data.isSelect" @change="selectLayer(data.id,data.isSelect,data.opacity)">{{data.caption}}</el-checkbox>
								</span>
								<el-slider class="my-slider" v-model="data.opacity" @change="slidChange(data.id,data.isSelect,data.opacity)"></el-slider>
								<span class="my-text">{{data.opacity}}%</span>
								<i class="el-icon-location-outline" @click="positGoto(data.id,data.isSelect)"></i>
                                <i class="my-icon-details" @click="treeCheckChangeInfo(data)" title="详情"></i>
								<i class="el-icon-close" title="关闭" @click="delLayer(data.id)"></i>
                                
							</div>
						</span>
					</el-tree>
				</div>

		</div>
        <div class="search">	
             <!-- <DetailMap></DetailMap>		 -->
        <!-- <div class="search"> -->
<!--             <DetailMap></DetailMap>-->
			<!-- <div class="resultDiv" >


				<div id="queryContent" class="show:bol">
                    <el-table :data="arrAll" style="width: 100%">
                        <el-table-column prop="title" label="数据名" width="180"></el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button size="mini" type="primary" @click="t1_onClick_handle(scope.$index, scope.row,'定位')">定位</el-button>
                                <el-button size="mini" type="primary" @click="t1_onClick_handle(scope.$index, scope.row,'选中')">选中</el-button>
                                <el-button size="mini" type="primary" @click="t1_onClick_handle(scope.$index, scope.row,'预览')">预览</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
			</div>			 -->
		</div>
    </div>
</template>
<script>
import vmson from "../../../utils/emptyVue.js"
// import DetailMap from '../sensingSatellite/DetailMap/index'
import {getBaseMapUrl,dataPorodurtLayerPrefix,MapServiceNameList,InitView,FriendlyLinkList} from "@/const/index"
import { loadModules } from "esri-loader";
var maplayer_image = null;//影像地图
var maplayer_imageLabel = null;//影像地图标注
var maplayer_vec = null;//矢量地图
var maplayer_vecLabel = null;//矢量地图标注
var maplayer_baseBoundaryLayer = null;


var webmap = null;
var view = null;
var GraphicsLayer_main= null;//四川边界线
var GraphicsLayer_search= null;//搜索结果
var GraphicsLayer_draw= null;//绘制
var GraphicsLayer_upload= null;//上传shp
var mearsureLayer = null;//测量图层
var imgLayer=null;//图片图层
var MapImageList=[];//地图预览图集
var mainExtent=null;//初始范围
var fullExtents= [];//地图范围记录
export default {
    data(){
        return{
            FriendlyLinkList:[],
            activeName: 'second',
            showMapTool:false,
            isDrawIng:false,//是否绘制
            isMearsureIng:false,//是否量算
            arrAll: [],
            shpFileForDraw:null,
            upShpFile:null,
            searchWkt:null,
            isrotate1: false,//工具栏进入样式
			isrotate2: false,//工具栏进入样式
            isrotate3: false,//工具栏进入样式
            isrotate4: false,//工具栏进入样式
            fullExtentsIndex:null,
            mouseWheel: {
                x: null,
                y: null
            },
            showStyle: null,
            popupContent: {
					area: 0,
					length: 0
            },
            upload:null,
            pageInfo:"",
            dataPorodurtLayersData:[],//地质专题产品显示数组
        }
    },
    // components:{
    //     getBaseMapUrl
    // },
    methods: {
        routeNav(path) {
			this.topBol = false;
			this.$router.push(path);
			document.getElementById("header").scrollIntoView();
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        // routeNav(path) {
        //     this.topBol = false;
        //     this.$router.push(path);
        //     document.getElementById("target").scrollIntoView();
        // },
        //地图初始化
        createMap() {
            this.$store.commit('SET_LOADING', true)
            var _this = this;
            loadModules(
                [
                    "esri/map",
                    "esri/toolbars/draw",
                    "esri/layers/GraphicsLayer",
                    "esri/layers/ArcGISTiledMapServiceLayer",
                    "esri/layers/WebTiledLayer",
                    "esri/layers/MapImage",
                    "esri/layers/MapImageLayer",
                    "esri/geometry/Extent",
                    "esri/geometry/Polygon",
                    "esri/layers/ArcGISImageServiceLayer",
                ]).then(
                (
                    [Map,
                    Draw,
                    GraphicsLayer,
                    ArcGISTiledMapServiceLayer,
                    WebTiledLayer,
                    MapImage,
                    MapImageLayer,
                    Extent,
                    Polygon,
                    ImageryLayer,
                    ]
                ) => {
                    // maplayer_image = new ArcGISTiledMapServiceLayer(mapURL.maplayer_image);//加载arcgis影像
                    maplayer_image = new WebTiledLayer(getBaseMapUrl('img'));//加载天地图影像
                    maplayer_imageLabel = new WebTiledLayer( getBaseMapUrl('cia'));//加载天地图影像标注
                    maplayer_vec = new WebTiledLayer( getBaseMapUrl('vec'));//加载天地图地图
                    maplayer_vecLabel=new WebTiledLayer( getBaseMapUrl('cva'));//加载天地图地图标注
                    webmap =new Map("viewDiv",{
                        minZoom:3,//最小空间等级
                        zoom:InitView.zoom,
                        center: InitView.center,
                        slider:false,logo:false,showAttribution:false//清楚底部powered by ESRI
                    });
                    webmap.addLayer(maplayer_image);
                    // webmap.add(maplayer_baseBoundaryLayer);
                    webmap.addLayer(maplayer_imageLabel);
                    webmap.addLayer(maplayer_vec);
                    webmap.addLayer(maplayer_vecLabel);
                    // maplayer_vec.hide();
                    maplayer_imageLabel.hide();
                    maplayer_image.hide();

                    GraphicsLayer_main= new GraphicsLayer();//四川边界线
                    GraphicsLayer_search= new GraphicsLayer();//搜索结果
                    GraphicsLayer_draw= new GraphicsLayer();//绘制
                    GraphicsLayer_upload= new GraphicsLayer();//上传shp
                    mearsureLayer = new GraphicsLayer();//测量图层

                    webmap.addLayer(GraphicsLayer_main);
                    webmap.addLayer(GraphicsLayer_search);
                    webmap.addLayer(GraphicsLayer_draw);
                    webmap.addLayer(GraphicsLayer_upload);
                    webmap.addLayer(mearsureLayer);
                    //搜索结果点击
                    GraphicsLayer_search.on("click",function(evt){
                        _this.GraphicsLayer_search_Click(evt);

                    });

                    _this.InitAddGraphic();
                    //测试
                    // _this.initTestData();

                    imgLayer=new MapImageLayer({
                        // url: "http://i.tq121.com.cn/i/404.png"
                        "id": "usgs_screen_overlay"
                    });//图片图层
                    webmap.addLayer(imgLayer);
                    //地图范围记录
                    webmap.on("extent-change", function(e) {
                        if (fullExtents.length < 10) {
                                fullExtents.push(webmap.extent);
                        } else {
                            fullExtents.shift();
                            fullExtents.push(webmap.extent);
                        }
                        _this.fullExtentsIndex = null;
                    });
                 }).finally(() => {
                     this.$store.commit('SET_LOADING', false)
                 })
        },
        //测试点击事件
        onClick_draw(val,lonLat){
            var _this=this;
            switch(val){
                case '绘制多边形':
                    _this.clearMarker();
                    _this.activeDraw("gon");
                    break;
                case '绘制矩形':
                    _this.clearMarker();
                    _this.activeDraw("extent");
                    break;
                case '清除':
                    _this.clearMarker();
                    break;
                case '数据加载':
                    _this.initTestData();
                    break;
                case '经纬度清除':
                    _this.clearMarker();
                    break;
                case '经纬度定位':
                    _this.clearMarker();
                    _this.activeDrawLonLatConvert(lonLat);
                    break;
            }
        },
        //清除地图手动绘制
        clearMarker() {
            var _this = this;
            _this.searchWkt=null;
            _this.$store.commit('setMapGeomValue',_this.searchWkt);
            _this.$store.commit('setMapGeomWkid','');
            _this.removeGraphicsLayer(GraphicsLayer_draw);
            _this.upShpFile=null;
            _this.removeGraphicsLayer(GraphicsLayer_upload);
            // this.$refs.upload.clearFiles();
        },
        //地图手动绘制
        activeDraw(type) {
            var _this = this;
            loadModules(
                [
                    "esri/toolbars/draw",
                    "esri/graphic",
                    "esri/geometry/Point",
                    "esri/geometry/Polygon",
                    "esri/geometry/Polyline",
                    "esri/geometry/geometryEngine",
                    "esri/symbols/Font",
                    "esri/symbols/SimpleMarkerSymbol",
                    "esri/symbols/SimpleLineSymbol",
                    "esri/symbols/SimpleFillSymbol",
                    "esri/symbols/TextSymbol",
                    "esri/Color",
                    "esri/tasks/LengthsParameters",
                    "esri/tasks/AreasAndLengthsParameters",
                    "dojo/domReady!"
                ]).then(
                ([Draw,Graphic, Point, Polygon, Polyline, geometryEngine,Font,SimpleMarkerSymbol,SimpleLineSymbol,SimpleFillSymbol,
                TextSymbol,Color,LengthsParameters,AreasAndLengthsParameters]) => {
                    _this.removeGraphicsLayer(GraphicsLayer_draw);
                    webmap.setMapCursor("crosshair");
                    var toolbar = new Draw(webmap,{showTooltips:false});
                    var inputPoints = [];//存储生成点的集合
                    var startFont = new Font('20px').setWeight(Font.WEIGHT_BOLD);//定义文字样式
                    var makerSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE,5,
                        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,new Color([204,102,51]),2),
                        new Color([0,0,0,0]));//定义标记点样式
                    var textSymbolColor=new Color([255,0,0]);//红色
                    var lineSymbolColor=new Color([255,255,0]);//黄色
                    enableCreatePolygon();
                    
                    function enableCreatePolygon() {
                        _this.isDrawIng = true;
                        if (type == "point") {
                            toolbar.activate("point");
                        } else if (type == "line") {
                            toolbar.activate("polyline");
                        } else if (type == "gon") {
                            toolbar.activate("polygon");
                            _this.showStyle = "mapLabel";
                        }else if (type == "extent") {
                            toolbar.activate("extent");
                            _this.showStyle = "spaceQuery";
                        }
                        // 量算功能触发
                        webmap.on("click",function (evt) {
                            if(_this.isDrawIng){
                            mapClick(evt,'click');}
                        });
                        webmap.on("mouse-move", function(evt) {
                            if(_this.isDrawIng){
                            $(".mear_label").css("top", evt.y + 20);
                            $(".mear_label").css("left", evt.x + 20);}
                        });
                        //触发完成的事件
                        toolbar.on("draw-end",function (evt) {
                            if(_this.isDrawIng){
                            addToMap(evt);}
                        });

                    }
                    //生成两点之间的连线
                    toolbar.setLineSymbol(new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,lineSymbolColor,2));
                    //量算函数
                    function mapClick(evt,enterType) {
                        if(_this.isDrawIng){
                        if(enterType=='click'){
                            inputPoints.push(evt.mapPoint);
                            GraphicsLayer_draw.add(new Graphic(evt.mapPoint,makerSymbol));
                        }}
                    }
                    // 添加图形函数
                    function addToMap(evt) {
                        if(_this.isDrawIng){
                            var geometry = evt.geometry;//绘制图形的geometry
                            //将绘制的图形添加到地图上去
                            var symbol = null;
                            switch (geometry.type){
                                case "point":
                                    symbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE,10,
                                        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,lineSymbolColor,1),
                                        new Color([0,255,0,0.25]));
                                    break;
                                case "polyline":
                                    symbol  = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                                        new Color([255,255,0,0.8]),2);
                                    break;
                                case "polygon":
                                    symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                                        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,lineSymbolColor,2),
                                        new Color([255,0,0,0.05]));
                                    break;
                                case "extent":
                                    symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                                        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,lineSymbolColor,2),
                                        new Color([255,0,0,0.05]));
                                    break;
                            }
                            GraphicsLayer_draw.add(new Graphic(geometry,symbol));
                            var wkt = [];var rings=[];
                            if (type == "extent"){
                                 rings= [[
                                            [geometry.xmin, geometry.ymin],
                                            [geometry.xmax, geometry.ymin],
                                            [geometry.xmax, geometry.ymax],
                                            [geometry.xmin, geometry.ymax],
                                            [geometry.xmin, geometry.ymin],
                                        ]]

                            }else{
                                rings = geometry.rings;
                            }
                            for (var i = 0; i < rings.length; i++) {
                                var ring = rings[i];
                                for (var j = 0; j < ring.length; j++) {
                                    wkt.push(ring[j].join(" "));
                                }
                            }
                            _this.searchWkt = "POLYGON((" + wkt.join(",") + "))";
                            _this.$store.commit('setMapGeomValue',_this.searchWkt);
                            _this.$store.commit('setMapGeomWkid',geometry.spatialReference.wkid);

                        }
                        clearAction();
                    }
                    //清空函数
                    function clearAction() {
                        inputPoints.splice(0,inputPoints.length);//删除数组中的所有元素
                        toolbar.deactivate();//撤销地图绘制功能
                        webmap.enableScrollWheelZoom();
                        webmap.setMapCursor("default");
                        _this.showStyle=null;
                        _this.isDrawIng=false;
                    }
                }
            );
        },
        //绘制搜索结果
        activeDrawLonLatConvert(lonLat) {
        	try{
                // view.graphics.removeAll();
                // //分页去掉显示地图
                // console.log(isPage);
                // if(isPage)
                // {
                //     webmap.removeMany(this.showLayers);
                //     this.showLayers=[];
                // }
           }catch(e){}
            if (lonLat) {
                var _this = this;
                loadModules(
                    [
                        "esri/map",
                        "esri/layers/MapImageLayer",
                        "esri/graphic",
                        "esri/geometry/Point",
                        "esri/geometry/Polygon",
                        "esri/symbols/PictureMarkerSymbol",
                        "esri/SpatialReference",
                        "esri/layers/MapImage",
                        "esri/geometry/Extent",
                        "esri/symbols/SimpleMarkerSymbol",
                        "esri/symbols/SimpleLineSymbol",
                        "esri/Color",
                    ]).then(
                    ([Map, MapImageLayer, Graphic,Point,Polygon,PictureMarkerSymbol,SpatialReference,MapImage,
                    Extent,SimpleMarkerSymbol,SimpleLineSymbol,Color]) => {
                        _this.removeGraphicsLayer(GraphicsLayer_draw);
                        var polygonGraphics = [];
                     
                            // if (Datas[i].xmin != null && Datas[i].xmin != "") {
                                var geo=null;
                                var myPolygon=null;

                                var extent=null;

                                //判断是否点或面
                                if(lonLat.longitudeLeft==lonLat.longitudeRight&&lonLat.latitudeLeft==lonLat.latitudeRight)
                                {
                                    // continue;
                                    geo = {
                                        type: "point", // autocasts as new Polygon()
                                        longitude: lonLat.longitudeLeft,
                                        latitude: lonLat.latitudeLeft,
                                    };
                                    extent = new Extent(lonLat.longitudeLeft,lonLat.latitudeLeft,lonLat.longitudeRight,lonLat.latitudeRight, new SpatialReference({ wkid:4326 }));
                                }else{
                                    geo = {
                                        type: "polygon", // autocasts as new Polygon()
                                        rings: [[
                                            [lonLat.longitudeLeft, lonLat.latitudeLeft],
                                            [lonLat.longitudeRight, lonLat.latitudeLeft],
                                            [lonLat.longitudeRight, lonLat.latitudeRight],
                                            [lonLat.longitudeLeft, lonLat.latitudeRight]
                                        ]]
                                    };
                              
                                     extent = new Extent(lonLat.longitudeLeft,lonLat.latitudeLeft,lonLat.longitudeRight,lonLat.latitudeRight, new SpatialReference({ wkid:4326 }));
                                }
                                var fillSymbol;var _Graphic=null;
                                    //根据类型修改样式
                                    if(geo.type=="point")
                                    {
                                        var makerSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE,10,
                                            new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,new Color([204,102,51]),4),
                                            new Color([0,0,0,0]));//定义标记点样式

                                        _Graphic= new Graphic(new Point({x:geo.longitude,y: geo.latitude,spatialReference: { wkid: 4326 }}), makerSymbol);
                                    }else{
                                        myPolygon = {"geometry":{"rings":geo.rings,
                                            "spatialReference":{"wkid":4326}},
                                            "symbol":{
                                                "color":[0, 0, 0, 0],
                                                "outline":{
                                                    "color":[255,0,0,225],
                                                    "width":2,
                                                    "type":"esriSLS",
                                                    "style":"esriSLSSolid"
                                                },
                                                "type":"esriSFS",
                                                "style":"esriSFSSolid"
                                            }
                                        };
                                        _Graphic=new Graphic(myPolygon);
                                    }
                                if(_this.pageInfo=="卫星遥感资源大厅"){
                                    GraphicsLayer_draw.add(_Graphic);
                                    var goto=webmap.setExtent(extent);
                                }
                            // }

                    }
                );
            }
        },
        //加载测试数据
        initTestData(){
            var _this=this;
            //添加到显示数组
            var data=JSON.parse(JSON.stringify(initTestDataForMap));
            var list = [];
            data.row.forEach(element => {
                element["isSelect"] = false;
                element["isView"] = false;
                list.push(element);
            });
            _this.arrAll = data.row;
            _this.AddGraphicForSearch(_this.arrAll,false);
        },
        //搜索结果
        t1_onClick_handle(searchDatas,index, row,val) {
            var _this=this;
            switch(val){
                case '选中':
                    // row.isSelect=!row.isSelect;
                    _this.querySelect(searchDatas,row.isSelect, row.id);
                    break;
                case '定位':
                    _this.gotoLocation(row);
                    _this.querySelect(searchDatas,row.isSelect, row.id);
                    break;
                case '预览':
                    // row.isView=!row.isView;
                    _this.queryView(searchDatas,row.isView, row.id,'');
                    break;
            }
        },
        //搜索结果
        t2_onClick_handle(searchDatas,index, row,val) {
            var _this=this;
            switch(val){
                case '选中':
                    // row.isSelect=!row.isSelect;
                    _this.querySelect_t2(searchDatas,row.isSelect, row.keyid);
                    break;
                case '定位':
                    _this.gotoLocation_t2(row);
                    break;
                case '预览':
                    // row.isView=!row.isView;
                    _this.queryView_t2(searchDatas);
                    break;
            }
        },
        //获取bol显示选中图层和数据
        queryView(searchDatas,isView, keyId, type) {
            var _this=this;
            loadModules(
                [
                    "esri/layers/MapImage",
                ]).then(
                ([MapImage]) => {
                    MapImageList=[];imgLayer.removeAllImages();
                    for(var i = 0; i < searchDatas.length; i++) {
                        if(searchDatas[i].id == keyId) {
                            searchDatas[i].isView = isView;
                        }
                        if(type == "cancel") {
                           searchDatas[i].isView = false;
                        }
                        if(searchDatas[i].isView){
                            var mi = new MapImage({
                                "extent":{
                                    "xmin": searchDatas[i].xmin,
                                    "ymin": searchDatas[i].ymin,
                                    "xmax": searchDatas[i].xmax,
                                    "ymax": searchDatas[i].ymax,
                                    "spatialReference":{"wkid":4326}},
                                "href": searchDatas[i].mapimagelocalpath//serverurl
                            });
                            //
                            // var mi = new MapImage({
                            //     "extent":{
                            //         "xmin": 103.801408,
                            //         "ymin": 30.412412,
                            //         "xmax": 104.431711,
                            //         "ymax": 30.964377,
                            //         "spatialReference":{"wkid":4326}},
                            //     "href": _this.arrAll[i].serverurl
                            // });//调试
                            // var mi = new MapImage({
                            //     "extent":{
                            //         "xmin": 100.075795133613,
                            //         "ymin": 27.8261825855497,
                            //         "xmax": 100.510124912897,
                            //         "ymax": 28.2104236456906,
                            //         "spatialReference":{"wkid":4326}},
                            //     "href": _this.arrAll[i].serverurl
                            // });//调试
                            imgLayer.addImage(mi);
                        }
                    }
                });
        },
        //搜索结果定位
        gotoLocation(data){
            if (data) {
                var _this = this;
                loadModules(
                    [
                        "esri/geometry/Point",
                        "esri/geometry/Polygon",
                        "esri/graphic",
                        "dojo/domReady!"
                    ]).then(
                    ([Point,Polygon,Graphic]) => {
                       if (data.borderxmin != null && data.borderxmin != "") {
                            var geo=null;
                           //判断是否点或面
                            if(data.borderxmin==data.borderxmax)
                            {
                                geo = new Point({
                                    longitude: data.borderymin,
                                    latitude: data.borderxmin
                                });
                            }else{
                                var absX=0;
                                var absY=0;
                                absX=Math.abs(parseFloat(data.borderxmax)-parseFloat(data.borderxmin));
                                absY=Math.abs(parseFloat(data.borderymax)-parseFloat(data.borderymin));
                                var x1=parseFloat(data.borderxmin)-absX;var x2=parseFloat(data.borderxmax)+absX;
                                var y1=parseFloat(data.borderymin)-absY;var y2=parseFloat(data.borderymax)+absY;
                                geo = new Polygon({
                                    rings: [[
                                        [x1, y1],
                                        [x2, y1],
                                        [x2, y2],
                                        [x1, y2]
                                    ]]
                                });
                            }
                            // var goto=webmap.setExtent(geo.getExtent());
                            webmap.centerAt(geo.getExtent().getCenter());
                        }
                    }
                );
            }
        },
        //搜索结果定位
        gotoLocation_t2(data){
            if (data) {
                var _this = this;
                loadModules(
                    [
                        "esri/geometry/Point",
                        "esri/geometry/Polygon",
                        "esri/graphic",
                        "dojo/domReady!"
                    ]).then(
                    ([Point,Polygon,Graphic]) => {
                       if (data.xmin != null && data.xmin != "") {
                            var geo=null;
                           //判断是否点或面
                            if(data.xmin==data.xmax)
                            {
                                geo = new Point({
                                    longitude: data.ymin,
                                    latitude: data.xmin
                                });
                            }else{
                                var absX=0;
                                var absY=0;
                                absX=Math.abs(parseFloat(data.xmax)-parseFloat(data.xmin));
                                absY=Math.abs(parseFloat(data.ymax)-parseFloat(data.ymin));
                                var x1=parseFloat(data.xmin)-absX;var x2=parseFloat(data.xmax)+absX;
                                var y1=parseFloat(data.ymin)-absY;var y2=parseFloat(data.ymax)+absY;
                                geo = new Polygon({
                                    rings: [[
                                        [x1, y1],
                                        [x2, y1],
                                        [x2, y2],
                                        [x1, y2]
                                    ]],
                                    "spatialReference":{"wkid":data.spatialreference},
                                });
                            }
                            var goto=webmap.setExtent(geo.getExtent());
                            // webmap.centerAt(geo.getExtent().getCenter());
                        }
                    }
                );
            }
        },
        //绘制搜索结果
        AddGraphicForSearch(Datas,isPage) {
        	try{
                // view.graphics.removeAll();
                // //分页去掉显示地图
                // console.log(isPage);
                // if(isPage)
                // {
                //     webmap.removeMany(this.showLayers);
                //     this.showLayers=[];
                // }
           }catch(e){}
            if (Datas) {
                var _this = this;
                loadModules(
                    [
                        "esri/map",
                        "esri/layers/MapImageLayer",
                        "esri/graphic",
                        "esri/geometry/Point",
                        "esri/geometry/Polygon",
                        "esri/symbols/PictureMarkerSymbol",
                        "esri/SpatialReference",
                        "esri/layers/MapImage",
                    ]).then(
                    ([Map, MapImageLayer, Graphic,Point,Polygon,PictureMarkerSymbol,SpatialReference,MapImage]) => {
                        _this.removeGraphicsLayer(GraphicsLayer_search);
                        var polygonGraphics = [];
                        for (var i = 0; i < Datas.length; i++) {
                            if (Datas[i].borderxmin != null && Datas[i].borderxmin != "") {
                                var geo=null;
                                var myPolygon=null;

                                //临时加图片***********************************************************
                                var mi = new MapImage({
                                "extent":{
                                    "xmin": Datas[i].borderxmin,
                                    "ymin": Datas[i].borderymin,
                                    "xmax": Datas[i].borderxmax,
                                    "ymax": Datas[i].borderymax,
                                    "spatialReference":{"wkid":4326}},
                                "href": Datas[i].mapimagelocalpath//serverurl
                            });imgLayer.addImage(mi);
                            //临时加图片***********************************************************

                                //判断是否点或面
                                if(Datas[i].borderxmin==Datas[i].borderxmax)
                                {
                                    continue;
                                    geo = {
                                        type: "point", // autocasts as new Polygon()
                                        longitude: Datas[i].borderymin,
                                        latitude: Datas[i].borderxmin
                                    };
                                }else{
                                    var coordinates= JSON.parse(Datas[i].geom).coordinates;
                                    geo = {
                                        type: "polygon", // autocasts as new Polygon()
                                        rings: coordinates
                                        // [[
                                        //     [Datas[i].borderxmin, Datas[i].borderymin],
                                        //     [Datas[i].borderxmax, Datas[i].borderymin],
                                        //     [Datas[i].borderxmax, Datas[i].borderymax],
                                        //     [Datas[i].borderxmin, Datas[i].borderymax]
                                        // ]]
                                    };
                                    if(Datas[i].rings){
                                        geo.rings=Datas[i].rings
                                    }//调试
                                }

                                var fillSymbol;
                                if (Datas[i].isSelect == true) {
                                    //根据类型修改样式
                                    if(geo.type=="point")
                                    {
                                        fillSymbol = {
                                            type: "simple-marker", // autocasts as new SimpleFillSymbol()
                                            color: [255, 69, 0],
                                            size:10,
                                            outline: {
                                                color: [0, 0, 0,0],
                                            }
                                        };
                                    }else{
                                        myPolygon = {"geometry":{"rings":geo.rings,
                                            "spatialReference":{"wkid":4326}},
                                            "symbol":{
                                                "color":[0, 0, 0, 0],
                                                "outline":{
                                                    "color":[255,0,0,225],
                                                    "width":2,
                                                    "type":"esriSLS",
                                                    "style":"esriSLSSolid"
                                                },
                                                "type":"esriSFS",
                                                "style":"esriSFSSolid"
                                            }
                                        };
                                    }
                                } else {
                                    //根据类型修改样式
                                    if(geo.type=="point")
                                    {
                                        fillSymbol = {
                                            type: "simple-marker", // autocasts as new SimpleFillSymbol()
                                            color: [64, 160, 222],
                                            size:10,
                                            outline: {
                                                color: [0, 0, 0,0],
                                            }
                                        };
                                    }else{
                                        myPolygon = {"geometry":{"rings":geo.rings,
                                            "spatialReference":{"wkid":4326}},
                                            "symbol":{
                                                "color":[0,0,0, 0],
                                                "outline":{
                                                    "color":[0,0,255,255],
                                                    "width":1,
                                                    "type":"esriSLS",
                                                    "style":"esriSLSSolid"
                                                },
                                                "type":"esriSFS",
                                                "style":"esriSFSSolid"
                                            }
                                        };
                                    }
                                }
                                if(_this.pageInfo=="地质档案"){
                                    var poly = new Polygon(myPolygon.geometry);
                                    var spoint = new Point(poly.getExtent().getCenter().x,poly.getExtent().getCenter().y,new SpatialReference({ wkid:4326 }));
                                    var pictureMarkerSymbol = new PictureMarkerSymbol('/static/img/未选中.png', 16, 31);
                                    var _graphic=new Graphic(spoint,pictureMarkerSymbol);
                                    _graphic.attr("p_Type", "地质档案");
                                    _graphic.attr("p_Id", Datas[i].id);
                                    GraphicsLayer_search.add(_graphic);
                                }
                                else if(_this.pageInfo=="卫星遥感资源大厅"){
                                    var polygonGraphic = new Graphic(myPolygon);
                                GraphicsLayer_search.add(polygonGraphic);
                                }
                            }
                        }
                    }
                );
            }
        },
        GraphicsLayer_search_Click(evt){
            if(evt&&evt.graphic&&evt.graphic._dataAttrs&&evt.graphic._dataAttrs.p_Type&&evt.graphic._dataAttrs.p_Type=="地质档案"){
                this.setGraphicsLayer_search_ico(evt.graphic._dataAttrs.p_Id)
            }
        },
        initGraphicsLayer_search_ico(){
            GraphicsLayer_search.graphics.forEach(item=>{
                item.symbol.url='/static/img/未选中.png'
            })
            GraphicsLayer_search.refresh();
        },
        setGraphicsLayer_search_ico(p_Id){
            this.initGraphicsLayer_search_ico();
            GraphicsLayer_search.graphics.forEach(item=>{
                if(p_Id==item._dataAttrs.p_Id){
                    item.symbol.url='/static/img/选中.png';
                     this.$notify({
                            type: 'error',
                            message:'弹出详情界面！',
                            offset: 100,
                        })
                   
                }
                // else{
                //     item.symbol.url='/static/img/未选中.png';
                // }
            })
            GraphicsLayer_search.refresh();
        },
        t4_mapBoxSelectChange(val){
            if(val==false){
                this.removeGraphicsLayer(GraphicsLayer_draw);
                this.searchWkt=null;
                this.$store.commit('setMapGeomValue',this.searchWkt);
                this.$store.commit('setMapGeomWkid','');
            }
        },
        //获取bol显示选中图层和数据
        querySelect(searchDatas,isSelect, keyId, type) {
            var _this=this;
            for(var i = 0; i < searchDatas.length; i++) {
                if(searchDatas[i].id == keyId) {
                    searchDatas[i].isSelect = isSelect;
                }
                if(type == "cancel") {
                    searchDatas[i].isSelect = false;
                }
            }
            _this.removeGraphicsLayer(GraphicsLayer_search);
            _this.AddGraphicForSearch(searchDatas,false);
        },
        //获取bol显示选中图层和数据
        queryView_t2(searchDatas,isView, keyId, type) {
            var _this=this;
            _this.remove_dataPorodurtLayer();
            _this.AddSearch_dataPorodurtLayer(searchDatas);
        },
        //绘制搜索结果
        AddSearch_dataPorodurtLayer(Datas) {
        	try{
           }catch(e){}
            if (Datas) {
                var _this = this;
                loadModules(
                    [
                        "esri/map",
                        "esri/layers/MapImageLayer",
                        "esri/layers/ArcGISTiledMapServiceLayer",
                        "esri/layers/ArcGISDynamicMapServiceLayer",
                        "esri/graphic"
                    ]).then(
                    ([Map, MapImageLayer,ArcGISTiledMapServiceLayer,WebTiledLayer, Graphic]) => {
                        var polygonGraphics = [];
                        for (var i = 0; i < Datas.length; i++) {
                            if(Datas[i].isView){
                                var _type=Datas[i].servertype;
                                var _url=Datas[i].url;
                                var _id=dataPorodurtLayerPrefix+Datas[i].id;
                                var _wkid=Datas[i].spatialreference;
                                if(!_wkid) _wkid=4326;
                                var _find= MapServiceNameList.indexOf(_type);
                                if (_find>-1) {
                                     var _layer;
                                    if(_wkid==4326){
                                         _layer = new WebTiledLayer(_url, {id:_id,spatialReference: webmap.spatialReference});
                                    }else{
                                         _layer = new ArcGISTiledMapServiceLayer(_url, {id:_id,spatialReference: {wkid:_wkid}});
                                    }
                                    _layer.spatialReference=webmap.spatialReference;
                                    _layer.refresh();
                                    webmap.addLayer(_layer);
                                    continue;
                                }
                            }
                        }
                    }
                );
            }
        },
        slidChange(dataPorodurtLayerID,isSelect,opacity){

            var _findLayer=null;
            var _id=dataPorodurtLayerPrefix+dataPorodurtLayerID;
            if(isSelect) {
                _findLayer=webmap.getLayer(_id);
                if(_findLayer){
                    _findLayer.opacity = opacity/100;
                    _findLayer.refresh();
                }
            }


           // var ids=webmap.layerIds;
			// ids.forEach(item => {
            //     if(item.id==_id)
            //     {
            //         webmap.getLayer(item).opacity = opacity/100;
            //     }
            // });
            
                    
                
            // for (var i = 0; i < webmap..length; i++) {
            //     if(dataPorodurtLayers[i].id==_id){
            //         _findLayer=dataPorodurtLayers[i];
            //         _findLayer.opacity = opacity/100;
            //     }
            // }
        },
        delLayer(dataPorodurtLayerID){
            for (let a = 0; a < this.dataPorodurtLayersData.length; a++) {
                if (this.dataPorodurtLayersData[a].id == dataPorodurtLayerID) {
                    this.dataPorodurtLayersData.splice(
                        this.dataPorodurtLayersData.indexOf(this.dataPorodurtLayersData[a]),
                        1
                    );
                }
            }
            // console.log(this.dataPorodurtLayersData.indexOf(dataPorodurtLayerID));
            // return
            var _findLayer=null;
            var _id=dataPorodurtLayerPrefix+dataPorodurtLayerID;
            
            _findLayer=webmap.getLayer(_id);
            if(_findLayer){
                webmap.removeLayer(_findLayer);
            }
            // this.dataPorodurtLayersData.splice(this.dataPorodurtLayersData.indexOf(_id),1);
           
        },
        positGoto(dataPorodurtLayerID,isSelect) {
            if(isSelect){
                var _findLayer=null;
                var _id=dataPorodurtLayerPrefix+dataPorodurtLayerID;
                
                _findLayer=webmap.getLayer(_id);
                 var goto=webmap.setExtent(_findLayer.initialExtent);
                 return
                if(_findLayer){
                   var _this = this;
                loadModules(
                    [
                        "esri/geometry/Point",
                        "esri/geometry/Polygon",
                        "esri/graphic",
                        "dojo/domReady!"
                    ]).then(
                    ([Point,Polygon,Graphic]) => {
                       if (data.xmin != null && data.xmin != "") {
                            var geo=null;
                           //判断是否点或面
                            if(data.xmin==data.xmax)
                            {
                                geo = new Point({
                                    longitude: data.ymin,
                                    latitude: data.xmin
                                });
                            }else{
                                var absX=0;
                                var absY=0;
                                absX=Math.abs(parseFloat(data.xmax)-parseFloat(data.xmin));
                                absY=Math.abs(parseFloat(data.ymax)-parseFloat(data.ymin));
                                var x1=parseFloat(data.xmin)-absX;var x2=parseFloat(data.xmax)+absX;
                                var y1=parseFloat(data.ymin)-absY;var y2=parseFloat(data.ymax)+absY;
                                geo = new Polygon({
                                    rings: [[
                                        [x1, y1],
                                        [x2, y1],
                                        [x2, y2],
                                        [x1, y2]
                                    ]],
                                    "spatialReference":{"wkid":data.spatialreference},
                                });
                            }
                            var goto=webmap.setExtent(geo.getExtent());
                        }
                    }
                );
                }
            }
		},
        //显示隐藏
		selectLayer(dataPorodurtLayerID,isSelect,opacity) {
            var Datas=this.dataPorodurtLayersData;
        	try{
           }catch(e){}
            if (Datas) {
                var _this = this;
                loadModules(
                    [
                        "esri/map",
                        "esri/layers/MapImageLayer",
                        "esri/layers/ArcGISTiledMapServiceLayer",
                        "esri/layers/ArcGISDynamicMapServiceLayer",
                        "esri/graphic"
                    ]).then(
                    ([Map, MapImageLayer,ArcGISTiledMapServiceLayer,WebTiledLayer, Graphic]) => {
                        var _findLayer=null;
                        // var ids=webmap.layerIds;
                        var _id=dataPorodurtLayerPrefix+dataPorodurtLayerID;
                                    // ids.forEach(item => {
                                        // if(item.id==_id)
                                        // {
                                            _findLayer=webmap.getLayer(_id);
                                           if(_findLayer){
                                                _findLayer.visible=isSelect;
                                                _findLayer.refresh();
                                                if(isSelect){
                                                    _findLayer.opacity = opacity/100;
                                                    _findLayer.refresh();
                                                }
                                                else{
                                                    webmap.removeLayer(_findLayer);
                                                }
                                                
                                            }
                                        // }
                                    // });
                        // for (var i = 0; i < dataPorodurtLayers.length; i++) {
                        //     var _id=dataPorodurtLayerPrefix+dataPorodurtLayerID;
                        //     if(dataPorodurtLayers[i].id==_id){
                        //         _findLayer=dataPorodurtLayers[i];
                        //         _findLayer.visible=isSelect;
                        //         _findLayer.opacity = opacity/100;
                        //     }
                        // }
                        //未找到
                        if(!_findLayer&&isSelect){
                        for (var i = 0; i < Datas.length; i++) {

                            if(Datas[i].id==dataPorodurtLayerID){
                                var _type=Datas[i].servertype;
                                var _url=Datas[i].url;
                                var _id=dataPorodurtLayerPrefix+Datas[i].id;
                                var _wkid=Datas[i].spatialreference;
                                if(!_wkid) _wkid=4326;
                                var _find= MapServiceNameList.indexOf(_type);
                                if (_find>-1) {
                                     var _layer;
                                    if(_wkid==4326){
                                         _layer = new WebTiledLayer(_url, {id:_id,spatialReference: webmap.spatialReference});
                                    }else{
                                         _layer = new ArcGISTiledMapServiceLayer(_url, {id:_id,spatialReference: {wkid:_wkid}});
                                    }
                                    _layer.opacity = Datas[i].opacity/100;
                                    _layer.spatialReference=webmap.spatialReference;
                                    _layer.refresh();
                                    webmap.addLayer(_layer);
                                    continue;
                                }
                            }
                        }
                        }
                    }
                );
            }
        },
        
        //上传shp文件处理 暂无使用
        fileUpload(file, fileList) {
        },
        //上传shp文件处理
        handlePreview(file, fileList) {
            var _this=this;
            _this.upShpFile=file;
            //获得文件格式
            var ftype = file.name.split(".")[file.name.split(".").length - 1];
            if (ftype != "" && ftype != "shp") {
                //删除不能同时文件名不同的文件
                //this.fileList=fileList.slice(0,fileList.length-1);
                  this.$notify({
                    type: 'error',
                    message:'只能上传shp文件！',
                    offset: 100,
                })
               
                _this.handleRemove(file, fileList);
                return;
            }
            var fileReader = new FileReader();
            var fileData=file.raw;
            fileReader.readAsArrayBuffer(fileData);
            fileReader.onload = function() {
                // 获取读取的结果
                console.log(this.result);
                let shapefile = require("shapefile");
                shapefile.read(this.result).then(geoJson => {
                    console.log(geoJson);
                    _this.AddGraphicForUpload(geoJson);
                });
            }
        },
        //删除上传shp文件处理
        handleRemove(file, fileList) {
            // this.upShpFile=null;this.searchWkt=null;
            // this.removeGraphicsLayer(GraphicsLayer_upload);
            this.clearMarker();
        },
        //绘制上传shp
        AddGraphicForUpload(geoJson){
            if (geoJson) {
                var _this = this;
                loadModules(
                    [
                        "esri/geometry/Point",
                        "esri/geometry/Polygon",
                        "esri/graphic",
                        "dojo/domReady!"
                    ]).then(
                    ([Point,Polygon,Graphic]) => {
                        _this.clearMarker();
                        _this.searchWkt="POLYGON((" + geoJson.features[0].geometry.coordinates[0].join(",") + "))";
                        _this.$store.commit('setMapGeomValue',_this.searchWkt);
                        _this.$store.commit('setMapGeomWkid',4326);
                        var graphics=[];
                        geoJson.features.forEach(feature => {
                            var rings=[];
                            feature.geometry.coordinates.forEach(function(coord) {
                                const coordinates =
                                feature.geometry.type === "MultiPolygon" ? coord[0] : coord;
                                rings.push(coordinates);
                            });
                            var myPolygon = {"geometry":{"rings":rings
                                ,
                                "spatialReference":{"wkid":4326}},
                                "symbol":{
                                    "color":"[0,0,0, 0]",
                                    "outline":{
                                        "color":[255, 69,0,255],
                                        "width":2,
                                        "type":"esriSLS",
                                        "style":"esriSLSSolid"
                                    },
                                    "type":"esriSFS",
                                    "style":"esriSFSSolid"
                                }
                            };
                            var gra = new Graphic(myPolygon);
                             GraphicsLayer_upload.add(gra);
                             var absX=0;
                                var absY=0;
                                absX=Math.abs(parseFloat(gra._extent.xmax)-parseFloat(gra._extent.xmin));
                                absY=Math.abs(parseFloat(gra._extent.ymax)-parseFloat(gra._extent.ymin));
                                var x1=parseFloat(gra._extent.xmin)-absX;var x2=parseFloat(gra._extent.xmax)+absX;
                                var y1=parseFloat(gra._extent.ymin)-absY;var y2=parseFloat(gra._extent.ymax)+absY;
                                var _geo = new Polygon({
                                    rings: [[
                                        [x1, y1],
                                        [x2, y1],
                                        [x2, y2],
                                        [x1, y2]
                                    ]]
                                });
                            var goto=webmap.setExtent(_geo.getExtent());
                        });
                    }
                );
            }
        },
        //绘制四川省边界线
        InitAddGraphic(){
            var geoJson=sichuanBoundary;
            if (geoJson) {
                var _this = this;
                loadModules(
                    [
                        "esri/geometry/Point",
                        "esri/geometry/Polygon",
                        "esri/graphic"
                    ]).then(
                    ([Point,Polygon,Graphic]) => {
                        geoJson.features.forEach(feature => {
                            var rings=[];
                            feature.geometry.coordinates.forEach(function(coord) {
                                const coordinates =
                                feature.geometry.type === "MultiPolygon" ? coord[0] : coord;
                                rings.push(coordinates);
                            });
                            var myPolygon = {"geometry":{"rings":rings
                                ,
                                "spatialReference":{"wkid":4326}},
                                "symbol":{
                                    "color":"[0,0,0, 0]",
                                    "outline":{
                                        "color":[255, 69,0,255],
                                        "width":2,
                                        "type":"esriSLS",
                                        "style":"esriSLSSolid"
                                    },
                                    "type":"esriSFS",
                                    "style":"esriSFSSolid"
                                }
                            };
                            var gra = new Graphic(myPolygon);
                            GraphicsLayer_main.add(gra);
                            // mainExtent=gra._extent;
                            // console.log("mainExtent",mainExtent);
                            // var goto=webmap.setExtent(gra._extent);
                        });
                    }
                );
            }
        },
        //移除地质专题产品服务 dataPorodurtLayerPrefix
        remove_dataPorodurtLayer(){
            var _this = this;
            var ids=webmap.layerIds;
			ids.forEach(item => {
                if(item.search(dataPorodurtLayerPrefix) != -1)
                {
                    webmap.removeLayer(webmap.getLayer(item));
                }
			});
        },
        //移除绘制
        removeGraphicsLayer(graphicsLayer){
            var _this = this;
			graphicsLayer.graphics.forEach(item => {
				_this.$nextTick(() => {
				    graphicsLayer.remove(item);
				});
			});
        },
        //工具箱事件
        select_tool(type) {
            var _this=this;
            // this.showRightBtm='';
            // this.rightBtnBol = false;
            if (type == "全幅") {
                _this.viewAllOver();
            } else if (type == "清除") {
                _this.clearDraw();
            } else if (type == "测线") {
                _this.mearsure("line");
            } else if (type == "测面") {
                _this.mearsure("gon");
            } else if (type == "上一") {
                _this.viewBefore();
            } else if (type == "下一") {
                _this.viewAfter();
            }else if (type == "关闭底图") {
                _this.select_mapServer("关闭底图");
            }
        },
        //底图选择事件
        select_mapServer(type) {
            var _this=this;
            GraphicsLayer_main.show();
            if (type == "地图") {
                maplayer_vec.show();
                maplayer_vecLabel.show();
                maplayer_image.hide();
                maplayer_imageLabel.hide();
            } else if (type == "卫星") {
                maplayer_vec.hide();
                maplayer_vecLabel.hide();
                maplayer_image.show();
                maplayer_imageLabel.show();
            } else if (type == "路网"&&maplayer_image.visible==true) {
                maplayer_vec.hide();
                maplayer_image.show();
                if(maplayer_imageLabel.visible){
                    maplayer_imageLabel.hide();
                }else{
                    maplayer_imageLabel.show();
                }
            }else if (type == "关闭底图") {
                maplayer_vec.hide();
                maplayer_vecLabel.hide();
                maplayer_image.hide();
                maplayer_imageLabel.hide();
                GraphicsLayer_main.hide();
            }
        },
        clearDraw(){
            var _this=this;
            webmap.setMapCursor("default");
            _this.removeGraphicsLayer(mearsureLayer);
            _this.searchWkt=null;
            _this.$store.commit('setMapGeomValue',_this.searchWkt);
            _this.$store.commit('setMapGeomWkid','');
            _this.removeGraphicsLayer(GraphicsLayer_draw);
            _this.upShpFile=null;
            _this.removeGraphicsLayer(GraphicsLayer_upload);
            _this.isMearsureIng=false;
            _this.isDrawIng=false;
        },
        mearsure(type) {
            var _this = this;
            var mearMeter = false;
            loadModules(
                [
                    "esri/toolbars/draw",
                    "esri/graphic",
                    "esri/geometry/Point",
                    "esri/geometry/Polygon",
                    "esri/geometry/Polyline",
                    "esri/geometry/geometryEngine",
                    "esri/symbols/Font",
                    "esri/symbols/SimpleMarkerSymbol",
                    "esri/symbols/SimpleLineSymbol",
                    "esri/symbols/SimpleFillSymbol",
                    "esri/symbols/TextSymbol",
                    "esri/Color",
                    "esri/tasks/LengthsParameters",
                    "esri/tasks/AreasAndLengthsParameters",
                    "dojo/domReady!"
                ]).then(
                ([Draw,Graphic, Point, Polygon, Polyline, geometryEngine,Font,SimpleMarkerSymbol,SimpleLineSymbol,SimpleFillSymbol,
                TextSymbol,Color,LengthsParameters,AreasAndLengthsParameters]) => {
                    webmap.setMapCursor("crosshair");
                    _this.isMearsureIng=true;
                    var id = new Date().getTime();
                    //toolbar工具条
                    var toolbar = new Draw(webmap,{showTooltips:false});
                    var totleDistance = 0.0;//总距离
                    var totalGraphic = null;//存储点集合
                    var disFun =false;//距离测量
                    var areaFun = false;//面积测量
                    var inputPoints = [];//存储生成点的集合
                    var startFont = new Font('20px').setWeight(Font.WEIGHT_BOLD);//定义文字样式
                    var makerSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE,10,
                        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,new Color([204,102,51]),2),
                        new Color([0,0,0,0]));//定义标记点样式
                    var textSymbolColor=new Color([255,0,0]);//红色
                    var lineSymbolColor=new Color([255,255,0]);//黄色
                    enableCreatePolygon();

                    function enableCreatePolygon() {
                        if (type == "line") {
                            _this.showStyle = "mearLine";
                            distanceMeasure();
                        } else if (type == "gon") {
                            _this.showStyle = "mearGon";
                           areaMeasure();
                        }
                        // 量算功能触发
                        webmap.on("click",function (evt) {
                            mapClick(evt);
                        });
                        //触发完成的事件
                        toolbar.on("draw-end",function (evt) {
                            addToMap(evt);
                        });
                    }
                    //长度量算
                    function distanceMeasure() {
                        webmap.enableScrollWheelZoom();
                        disFun=true;
                        areaFun=false;
                        toolbar.activate("polyline");
                    }
                    //面积量算
                    function areaMeasure() {
                        webmap.enableScrollWheelZoom();
                        disFun=false;
                        areaFun=true;
                        toolbar.activate("polygon");
                    }
                    // 量算功能触发
                    webmap.on("click",function (evt) {
                        if((disFun||areaFun)&&_this.isMearsureIng){
                        mapClick(evt,'click');}
                    });
                    webmap.on("mouse-move", function(evt) {
                        if((disFun||areaFun)&&_this.isMearsureIng){
                        mapClick(evt,'move');
                        $(".mear_label").css("top", evt.y + 20);
                        $(".mear_label").css("left", evt.x + 20);}
                    });
                    //触发完成的事件
                    toolbar.on("draw-end",function (evt) {
                        if(disFun||areaFun){
                        addToMap(evt);}
                    });
                    //生成两点之间的连线
                    toolbar.setLineSymbol(new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,lineSymbolColor,2));
                    //量算函数
                    function mapClick(evt,enterType) {
                        if(enterType=='click'){
                            inputPoints.push(evt.mapPoint);
                            if(disFun){
                                var  textSymbol;
                                if(inputPoints.length ===1){
                                    textSymbol = new TextSymbol("起点",startFont,textSymbolColor);
                                    textSymbol.setOffset(0,-20);
                                    mearsureLayer.add(new Graphic(evt.mapPoint,textSymbol));
                                }
                                mearsureLayer.add(new Graphic(evt.mapPoint,makerSymbol));
                                if(inputPoints.length >=2){
                                    var p1 = inputPoints[inputPoints.length-2];
                                    var p2 = inputPoints[inputPoints.length-1];
                                    if(p1.x ===p2.x &&p1.y===p2.y){
                                        return;
                                    }
                                    var polyline = new Polyline(webmap.spatialReference);
                                    polyline.addPath([p1,p2]);
                                    var length = geometryEngine.geodesicLength(polyline, "meters");
                                    totleDistance+=parseFloat(length);//计算总长度
                                    if (totleDistance < 1000) {
                                        _this.popupContent.length = totleDistance.toFixed(2) + "米";
                                    } else {
                                        _this.popupContent.length = (totleDistance / 1000).toFixed(2) + "千米";
                                    }
                                    var tdistance = new TextSymbol(_this.popupContent.length,startFont,textSymbolColor);
                                    tdistance.setOffset(40,-3);

                                    if(totalGraphic){
                                        mearsureLayer.remove(totalGraphic);
                                    }
                                    mearsureLayer.add(new Graphic(p2,tdistance));
                                    //    设置总长度的显示样式，并添加到地图上
                                    var totalSymbol=new TextSymbol("总长度："+_this.popupContent.length,startFont,textSymbolColor);
                                    totalSymbol.setOffset(40,-35);
                                    totalGraphic= mearsureLayer.add(new Graphic(p2,totalSymbol));
                                }
                            }
                            mearsureLayer.add(new Graphic(evt.mapPoint,makerSymbol));

                        }else if(enterType=='move'){
                            if(disFun){
                                if(inputPoints.length >=1){
                                    var p2 = inputPoints[inputPoints.length-1];
                                    var p1 = evt.mapPoint;
                                    var polyline = new Polyline(webmap.spatialReference);
                                    polyline.addPath([p1,p2]);
                                    var length = geometryEngine.geodesicLength(polyline, "meters");
                                    var tempTotleDistance=totleDistance+length;
                                    if (tempTotleDistance < 1000) {
                                        _this.popupContent.length = tempTotleDistance.toFixed(2) + "米";
                                    } else {
                                        _this.popupContent.length = (tempTotleDistance / 1000).toFixed(2) + "千米";
                                    }
                                }
                            }else if(areaFun){
                                if(inputPoints.length >=2){
                                    var _rings=[];
                                    for(var i=0;i<inputPoints.length;i++)
                                    {
                                        _rings.push([inputPoints[i].x,inputPoints[i].y]);
                                    }
                                    _rings.push([evt.mapPoint.x,evt.mapPoint.y]);
                                    var polygonJson  = {"rings":[_rings],"spatialReference":webmap.spatialReference };
                                    _this.popupContent.area = GetArea(polygonJson);
                                }
                            }
                        }
                    }
                    // 添加图形函数
                    function addToMap(evt) {
                        if(disFun||areaFun){
                            var geometry = evt.geometry;//绘制图形的geometry
                            //将绘制的图形添加到地图上去
                            var symbol = null;
                            switch (geometry.type){
                                case "point":
                                    symbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE,10,
                                        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,lineSymbolColor,1),
                                        new Color([0,255,0,0.25]));
                                    break;
                                case "polyline":
                                    symbol  = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                                        new Color([255,255,0,0.8]),2);
                                    break;
                                case "polygon":
                                    symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                                        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,lineSymbolColor,2),
                                        new Color([255,0,0,0.0]));
                                    break;
                                case "extent":
                                    symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                                        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,lineSymbolColor,2),
                                        new Color([255,0,0,0.25]));
                                    break;
                            }
                            mearsureLayer.add(new Graphic(geometry,symbol));
                             var x = 30;
                            if(disFun){
                               
                            }
                            else if(areaFun){
                                if(inputPoints.length >=3){
                                    var _rings=[];
                                    for(var i=0;i<inputPoints.length;i++)
                                    {
                                        _rings.push([inputPoints[i].x,inputPoints[i].y]);
                                    }
                                    var polygonJson  = {"rings":[_rings],"spatialReference":webmap.spatialReference };
                                    var _areaStr = GetArea(polygonJson);
                                    var poly = new Polygon(polygonJson);
                                
                                    var font =new Font("20px",Font.STYLE_NORMAL,Font.VARIANT_NORMAL,Font.WEIGHT_BOLDER);
                                    var areaResult = new TextSymbol(_areaStr,font,textSymbolColor);
                                    var spoint = new Point(poly.getExtent().getCenter().x,poly.getExtent().getCenter().y,
                                    webmap.spatialReference);
                                    mearsureLayer.add(new Graphic(spoint,areaResult));//在地图上显示测量的面积
                                }
                            }

                        }
                        clearAction();
                    }
                    function GetArea(polygonJson){
                        var _areaStr=0;
                        var poly = new Polygon(polygonJson);
                        var area =0;
                        var spatialReference = webmap.spatialReference;
                        if (spatialReference.isWebMercator()||spatialReference.wkid == "4326" ) {
                            area= geometryEngine.geodesicArea(poly, "square-meters")
                        } else {
                            area= geometryEngine.planarArea(poly, "square-meters")
                        }
                        if (area < 0) {
                            var simplifiedPolygon = geometryEngine.simplify(poly);
                            if (simplifiedPolygon) {
                                area = geometryEngine.planarArea(
                                    simplifiedPolygon,
                                    "square-meters"
                                );
                            }
                        }if (area < 1000000) {
                            _areaStr = area.toFixed(2) + "平方米";
                        } else {
                            _areaStr = (area / 1000000).toFixed(2) + "平方千米";
                        }
                        return _areaStr;
                    }
                    //清空函数
                    function clearAction() {
                        inputPoints.splice(0,inputPoints.length);//删除数组中的所有元素
                        totleDistance =0.0;
                        totalGraphic = null;
                        _this.popupContent.length=0;
                        _this.popupContent.area=0;
                        toolbar.deactivate();//撤销地图绘制功能
                        disFun = false;
                        areaFun = false;
                        webmap.enableScrollWheelZoom();
                        webmap.setMapCursor("default");
                        _this.showStyle=null;
                        _this.isMearsureIng=false;
                        // map.graphics.clear();
                        // var graphicLayerIds = map.graphicsLayerIds;
                        // var len = graphicLayerIds.length;
                        // for(var i=0; i<len;i++){
                        //     var gLayer = map.getLayer(graphicLayerIds[i]);
                        //     gLayer.clear();
                        // }
                    }
                }
            );
        },
        overDrop(type) {
            if (type == 1) {
                this.isrotate1 = true;
            } else if (type == 2) {
                this.isrotate2 = true;
            } else if (type == 3){
                this.isrotate3 = true;
            } else if (type == 4){
                this.isrotate4 = true;
            }
        },
        leaveDrop(type) {
            if (type == 1) {
                this.isrotate1 = false;
            } else if (type == 2) {
                this.isrotate2 = false;
            } else if (type == 3){
                this.isrotate3 = false;
            } else if (type == 4){
                this.isrotate4 = false;
            }
        },
        viewAllOver() {
            // var goto=webmap.setExtent(mainExtent);
            webmap.centerAndZoom(InitView.center,InitView.zoom);
        },
        viewBefore() {
            if (this.fullExtentsIndex == null && fullExtents.length != 0) {
                this.fullExtentsIndex = fullExtents.length - 2;
                webmap.setExtent(fullExtents[this.fullExtentsIndex]);
            } else {
                if (this.fullExtentsIndex > 0) {
                    this.fullExtentsIndex--;
                    webmap.setExtent(fullExtents[this.fullExtentsIndex]);
                } else {

                    this.$notify({
                        message: "不能再后退",
                        type: "warning",
                        offset: 100,
                    });
                }
            }
        },
        viewAfter() {
            if (this.fullExtentsIndex == null || this.fullExtentsIndex == fullExtents.length - 1) {
                this.$notify({
                    type: 'warning',
                    message:'不能前进',
                    offset: 100,
                })
               
            } else {
                this.fullExtentsIndex++;
                webmap.setExtent(fullExtents[this.fullExtentsIndex]);
            }
        },
        //获取范围
        get_mapBoxSelectChange(){
           return this.searchWkt;
        },
        handleDrop(draggingNode, dropNode, dropType, ev) {
            var _this = this;
            // window.setTimeout(function() {
            // 	_this.updateMap();
            // }, 200);
        },
        allowDrag(draggingNode) {
            return true;
        },
        allowDrop(draggingNode, dropNode, type) {
            // var flag = false;

            // if ((type == 'prev' || type == "next") && draggingNode.data.levels == dropNode.data.levels) {
            //     flag = true
            // } else {
            //     flag = false
            // }
            // return flag;
        },
        t2_AddTreeService(data){
            let isfind=false;
            for (let a = 0; a < this.dataPorodurtLayersData.length; a++) {
                if (this.dataPorodurtLayersData[a].id == data.id) {
                    isfind=true;
                    if(!data.checked){
                    this.dataPorodurtLayersData.splice(
                        this.dataPorodurtLayersData.indexOf(this.dataPorodurtLayersData[a]),
                        1
                    );
                    return;
                    }

                }
            }
            if(!isfind&&data.checked){
                data["isSelect"] = false
                data["isView"] = false
                data["opacity"] = 100
                this.dataPorodurtLayersData.push(data);
            }
        },
        treeCheckChangeInfo(data){
            vmson.$emit('emit_t2_treeCheckChangeInfo',data)
        },

    },
    mounted() {
        var _this = this;
        _this.FriendlyLinkList=FriendlyLinkList;
        _this.searchWkt=null;
        _this.$store.commit('setMapGeomValue',_this.searchWkt);
        _this.$store.commit('setMapGeomWkid','');
        _this.createMap();

        //F键查看调试框
        _this.showMapTool = !_this.showMapTool;
        document.addEventListener('keydown', function (event) {
            var e = event || window.event || arguments.callee.caller.arguments[0];
            if (e) {
                switch (e.keyCode) {
                    case 70: //F键查看调试框
                        _this.showMapTool = !_this.showMapTool;
                        break;
                    default:
                }
            }
        });
        //F键查看调试框

        vmson.$on("emit_set_page_mapInit",(_pageInfo)=>{
            this.pageInfo=_pageInfo;
            if(_pageInfo=="地质专题产品"){
                // //测试加载服务
                // var data = JSON.parse(JSON.stringify(initTestDataForDataPorodurt))
                // var list = []
                // data.row.forEach(element => {
                //     element["isSelect"] = false
                //     element["isView"] = false
                //     element["opacity"] = 100
                //     // list.push(element)
                // })
                // _this.dataPorodurtLayersData=data.row;
            }
        });
        //获取范围
        vmson.$on("emit_get_mapBoxSelectChange",()=>{
           return this.searchWkt;
        });
        //t1 遥感
        vmson.$on("emit_t1_handlePreview",(file, fileList)=>{
            _this.handlePreview(file, fileList);
        });
        vmson.$on("emit_t1_onClick_draw",(val,lonLat)=>{
            _this.onClick_draw(val,lonLat);
        });
        vmson.$on("emit_t1_AddGraphicForSearch",(searchDatas,isPage)=>{
            _this.AddGraphicForSearch(searchDatas,isPage);
        });
        vmson.$on("emit_t1_onClick_handle",(searchDatas,index, row,val)=>{
            _this.t1_onClick_handle(searchDatas,index, row,val);
        });
        //t2 地质专题产品
        vmson.$on("emit_t2_onClick_handle",(searchDatas,index, row,val)=>{
            _this.t2_onClick_handle(searchDatas,index, row,val);
        });
        vmson.$on("emit_t2_infoSelectChange",(data)=>{
            _this.t2_AddTreeService(data);
        });
        //t4 地质档案
        vmson.$on("emit_t4_onClick_draw",(val)=>{
            _this.onClick_draw(val);
        });
        vmson.$on("emit_t4_AddGraphicForSearch",(searchDatas,isPage)=>{
            _this.AddGraphicForSearch(searchDatas,isPage);
        });
        vmson.$on("emit_t4_mapBoxSelectChange",(val)=>{
            _this.t4_mapBoxSelectChange(val);
        });
    }
}
</script>
<style  scoped>
.container {
    width: 100%;
    height: 100%;
    display: block;
    position: relative;
}
.header {
    display: block;
    width: 100%;
    line-height: 40px;
    padding: 12px 30px;
    vertical-align: middle;
    box-sizing: border-box;
    box-shadow: 0 0 15px rgba(0, 80, 147, 0.2);
    z-index: 99;
    position: relative;
}
.item {
    display: block;
    float: right;
}
.user{
    line-height: 40px;
    padding-left: 24px;
    padding-right: 8px;
}

.fr{
    display: inline-block;
    position: absolute;
    left: 58%;
    top:8;
    transform: translate(-50%);
}

</style>
<style lang="less">
.el-tabs__item {
    padding: 0 50px;
    height: 40px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 30px;
    display: inline-block;
    list-style: none;
    font-size: 14px;
    font-weight: 500;
    color: #303133;
    position: relative;
}
</style>

// 测试样式
<style lang="less">
#viewDiv,.banner {
    // position: absolute;
    // top: 10%;
    // left: 1%;
    padding: 0;
    margin: 0;
    height: 100%;
    background: #f2f2f2;
    width: 100%;
}
.maptool {
  position: absolute;
  right: 200px;
  top: 147px;
//   height: 40px;
  z-index: 99;
  background-color: rgba(38, 38, 38, 0.75);
  padding: 20px 20px 10px 20px;
  color: #ffffff;
  border: 1px solid #526f82;
}
.maptool button{
  line-height: 30px;
  text-align: center;
  font-weight: bold;
  color: #fff;
  text-shadow: 1px 1px 1px #333;
  border-radius: 3px;
  margin: 0 8px 8px 0;
  position: relative;
  overflow: hidden;
  padding: 0px 15px 0px 15px;
  border: 1px solid #333;
  box-shadow: 0 1px 2px #8b8b8b inset, 0 -1px 0 #3d3d3d inset, 0 -2px 3px #8b8b8b inset;
  background: -webkit-linear-gradient(top,rgba(34, 34, 34, 0.49),rgba(51, 51, 51, 0.55));
}
.search {
    position: absolute;
    left: 40px;
    /*bottom: 3%;
    background: white;
    border-radius: 5px;
    /*overflow: hidden;*/
    -webkit-box-shadow: 0px 0px 10px rgba(0, 138, 255, 0.3);
    box-shadow: 0px 0px 10px rgba(0, 138, 255, 0.3);
    height: auto;
    top:100px;
    width: 460px;
    padding: 0;
    box-sizing: border-box;
    .resultDiv {
        width: 460px;
        z-index: 2;
        height: calc(~'100% - 100px');
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        #queryContent {
            font-size: 12px;
            border-radius: 7px 7px 7px;
            max-height: 100%;
            padding: 0 15px 10px;
            overflow: auto;
        }
    }
    .box-fiter {
        height: 50px;
        text-align: center;
        width: 100%;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        -webkit-box-align: center;
        -webkit-align-items: center;
        align-items: center;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
    }
}
.map-right-nav {
    position: absolute;
    right: 7px;
    top: 7px;
    // width: 550px;
    height: 46px;
    z-index: 99;
    border-radius: 2px;
    background: #fff;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}

.map-right-nav ul {
    width: 100%;
}

.map-right-nav li {
    display: inline-block;
    // width: 24%;
    /* margin-left: -7px; */
    text-align: center;
    line-height: 36px;
    margin-top: 5px;
    padding: 0px 10px 0px 6px;
    /*border-right: 1px solid #E5E5E5;*/
    cursor: pointer;
    position: relative;
}

.map-right-nav li::after {
    content: "";
    height: 30px;
    border-right: 1px solid #e5e5e5;
    position: absolute;
    right: 0;
    top: 5px;
}

.map-right-nav li:last-of-type {
    border: none;
}

.map-right-nav li img {
    margin-right: 5px;
    vertical-align: middle;
}
.icon-rotate {
		transform: rotate(180deg);
		transition: all linear 0.15s;
}
.mear_label {
    border: 2px;
    position: absolute;
    border-style: solid;
    border-radius: 4px;
    border-width: 1;
    border-color: #ffde8e;
    background-color: #ffffff;
    z-index: 3008;
}

.mear_label p {
    margin: 5px 5px 5px 5px;
}
// .esriMapTooltip {
//     display: none;
// }
.map-searve {
		position: absolute;
		right: 20px;
        top: 64px;
        width: 436px;
		z-index: 99;
		border-radius: 5px;
		box-shadow: 0 3px 8px rgba(0, 44, 104, 0.1);
}
.searve-top {
    width: 100%;
    height: 63px;
    color: #ffffff;
    padding: 28px;
    text-align: center;
    font-size: 18px;
    background: url( '../../../../static/img/mapTopbg.png') no-repeat;
    // background: url( '/static/img/mapTopbg.png');
    background-size: cover;
}
.searve-content {
    background: #ffffff;
    border-top-width: 0px;
    border-bottom-width: 0px;
}
.nodata {
    display: flex;
    justify-content: center;
    margin-top: 40px;
}
.my-tree .el-tree-node {
    padding-bottom: 8px;
    // margin-bottom: 2px;
    padding-top: 4px;
}
.el-tree{
    padding: 10px 10px;
}
.custom-tree-node{
     width: 100% !important;
}
.my-slider {
    display: inline-block;
    width:87px;
    vertical-align: middle;
    margin: 0 15px 0 25px;
}
.layers-li{
    .my-text{
        display: inline-block;
        width: 45px;
    }
    .my-checkbox{
        width: 8em;
        word-break: break-all;
        white-space: normal;
        vertical-align: middle;
        display: inline-block;
        line-height: 1.5em;
    }
    i {
        margin-right: 8px;
    }
}
</style>
