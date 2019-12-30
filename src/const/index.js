// export const API = "http://192.168.12.182:2779/api";//共享接口地址
// export const API = "http://192.168.12.182:2778/api";//共享接口地址 调试
//  export const API = "http://192.168.13.59:8081/api";//共享接口地址 服务器 内网
 export const API = "http://125.69.69.133:2237/api";//共享接口地址 服务器 外网
export const COMMON_API = "http://g1665c5697.iask.in:15952/api/"; //共享接口地址
// export const signalRUrl='http://192.168.12.180:7101/signalr';
export const signalRUrl='http://125.69.69.133:2238/signalr';
export const COMMON_DATATYPE_OPTIONS = [
    { value: 1, label: '卫星遥感资源' },
    { value: 2, label: '地质成果数据' },
    { value: 3, label: '地质专题产品' }];// 我的收藏、购物车、我的订单 数据类型数据
export const dataPorodurtLayerPrefix="_dataPorodurtLayerPrefix";//地质专题产品服务前缀
export const MapServiceNameList=["Map Service","MapService","MapServer"];
export const InitView = {
    center: [104.072177, 30.663573], // longitude, latitude
    zoom: 6
}
//获取地图基础服务
export function getBaseMapUrl(layerType) {
    // var baseUrl = '.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles';
    var baseUrl = '.tianditu.com/DataServer?T=';
    var key = '&tk=81a0bbfefe19a48a1f9193d2aaa5bc23';
    // url: 'http://t{0-7}.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=01074e9202138b9ec0baf8668ca7e54c',
    var urlTemplate="";
    switch (layerType) {
        case "vec"://天地图矢量数据
            urlTemplate = "http://t" + Math.round(Math.random() * 7) + baseUrl + "vec_w&x={col}&y={row}&l={level}" + key;
            break;
        case "img": //天地图影像数据
            urlTemplate = "http://t" + Math.round(Math.random() * 7) + baseUrl + "img_w&x={col}&y={row}&l={level}" + key;
            break;
        case "cva": //天地图矢量注记数据
            urlTemplate = "http://t" + Math.round(Math.random() * 7) + baseUrl + "cva_w&x={col}&y={row}&l={level}" + key;
            break;
        case "cia": //天地图影像注记数据
            urlTemplate = "http://t" + Math.round(Math.random() * 7) + baseUrl + "cia_w&x={col}&y={row}&l={level}" + key;
            break;
    }
    // const mapURL = {
//     dojoJS: "http://192.168.3.54:6060/arcgis_js_v330_api/arcgis_js_api/library/3.30/3.30/dojo/dojo.js",
//     // maplayer_image: "http://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer",
//     // maplayer_image: "http://172.18.0.88:6080/arcgis/rest/services/公司沙盘/map/MapServer",
//     maplayer_image :"http://t0.tianditu.com/DataServer?T=img_w&x={col}&y={row}&l={level}&tk=81a0bbfefe19a48a1f9193d2aaa5bc23",
//     maplayer_baseBoundaryLayer: "http://cache1.arcgisonline.cn/arcgis/rest/services/SimpleFeature/ChinaBoundaryLine/MapServer",
//     // maplayer_baseBoundaryLayer : "http://47.107.104.211:6080/arcgis/rest/services/%E5%85%A8%E5%9B%BD%E5%85%89%E4%BC%8F%E5%B9%B3%E5%8F%B0/%E5%9B%9B%E5%B7%9DX/MapServer",
//     // maplayer_road: "http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer",
//     maplayer_road: "http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer",
//     maplayer_label: "http://t0.tianditu.com/DataServer?T=cia_w&x={col}&y={row}&l={level}&tk=81a0bbfefe19a48a1f9193d2aaa5bc23",
// }
    return urlTemplate;
}
export const FriendlyLinkList=[
    {label:'四川省地质调查院',url:"http://www.scddy.com.cn/index.aspx"},
    {label:'地质云',url:"http://geocloud.cgs.gov.cn/#/portal/home"},
    {label:'自然资源卫星影像云服务平台',url:"http://sasclouds.com/chinese/home/"},
    {label:'陆地观测卫星数据服务',url:"http://data.cresda.com:90/#/home"},
]
