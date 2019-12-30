export function dealOptions(type, data) {
    var options = {};
    switch (type) {
        //遥感
        case 'raster':
            options = {
                imgUrl: '/static/img/block.png', //maxthumbnailpath图片
                data: []
            };

            options.data.push({ name: "名称", content: data.name })
            options.data.push({ name: "卫星", content: data.satellite })
            options.data.push({ name: "传感器", content: data.sensor })
            data.receivetime = RevertTime(data.receivetime);
            options.data.push({ name: "采集时间", content: data.receivetime })
            options.data.push({ name: "云量", content: data.cloudpercent })
                // options.data.push({ name: "分辨率",content: metadata.satellite })// 没有这个字段
                // {
                //   "englishname": "CenterTime",
                //   "datavalue": "2019-05-14 12:29:32",
                //   "chinesename": null
                // }
                // options.data.push({name:"轨道编号",content:data.satellite})//没有这个字段
                // options.data.push({name:"Path/Row",content:data.satellite})//没有这个字段
                // options.data.push({name:"产品号",content:data.satellite})//没有这个字段
            options.data.push({ name: "左上", content: data.borderxmin })
            options.data.push({ name: "右上", content: data.borderxmax })
            options.data.push({ name: "左下", content: data.borderymin })
            options.data.push({ name: "右下", content: data.borderymax })
            break;
            //专题
        case 'special':
            options = {
                imgUrl: '/static/img/block.png', //maxthumbnailpath图片
                data: {
                    base: [],
                    primary: [],
                    accessory: []
                }
            };
            options.data.base.push({ name: "服务名称", content: data.serverName })

            options.data.base.push({ name: "服务类型", content: data.servertype })
                // data.createTime = RevertTime(data.createTime);
            options.data.base.push({ name: "形成时间", content: data.createTime })
            options.data.base.push({ name: "编著者", content: data.creator })
            options.data.base.push({ name: "资料类别", content: data.receivetime })
            options.data.base.push({ name: "项目起始时间", content: data.cloudpercent })
            options.data.base.push({ name: "起始经度", content: data.sensor })
            options.data.base.push({ name: "起始纬度", content: data.receivetime })
            options.data.base.push({ name: "行政区", content: data.cloudpercent })
            
            options.data.base.push({ name: "内容摘要", content: data.computer })
            options.data.primary.push({ name: "正文内容", content: data.standardOgc })
            options.data.accessory.push({ name: "附图类", content: data.standardOgc })
            break;
            //成果
        case 'data':
            options = {
                imgUrl: '/static/img/block.png', //maxthumbnailpath图片
                data: {
                    base: [],
                    primary: [],
                    accessory: []
                }
            };
            options.data.base.push({
                    name: "档案",
                    content: data.data.dossierId
                })
                // data.data.catagoryCode = RevertTime(data.data.catagoryCode);
            options.data.base.push({
                name: "形成时间",
                content: data.data.catagoryCode
            })
            options.data.base.push({
                name: "编著者",
                content: data.data.caption
            })
            options.data.base.push({
                name: "资料类别",
                content: data.data.creator
            })
            data.data.createTime = RevertTime(data.data.createTime);
            options.data.base.push({
                name: "项目起始时间",
                content: data.data.createTime
            })
            options.data.base.push({
                name: "起始经度",
                content: data.data.confidentiality
            })
            options.data.base.push({
                name: "起始纬度",
                content: data.data.worth
            })
            options.data.base.push({
                name: "行政区",
                content: data.data.mdFile
            })
            options.data.base.push({
                name: "主题词",
                content: data.data.data_path
            })
            options.data.base.push({
                name: "内容摘要",
                content: data.data.computer
            })
            options.data.primary.push({
                name: "正文内容",
                content: data.data.filePath
            })
            options.data.accessory.push({
                name: "附图类",
                content: data.data.mapImage
            })
            break;

            //档案
        case 'dossier':
            options = {
                imgUrl: '/static/img/block.png', //maxthumbnailpath图片
                data: {
                    base: [],
                    primary: [],
                    accessory: []
                }
            };
            options.data.base.push({
                name: "名称",
                content: data.data.caption
            })
            data.data.createTime = RevertTime(data.data.createTime);
            options.data.base.push({
                name: "创建时间",
                content: data.data.createTime
            })
            options.data.base.push({
                name: "比例尺",
                content: data.data.scale
            })
            options.data.base.push({
                name: "坐标系",
                content: data.data.coordsystem
            })

            // options.data.base.push({
            //   name: "主题词",
            //   content: data.data.caption
            // })
            // options.data.base.push({
            //   name: "内容摘要",
            //   content: data.data.caption
            // })
            options.data.primary.push({
                name: "正文内容",
                content: data.data.caption
            })
            options.data.accessory.push({
                name: "文件数量",
                content: data.file.length
            })
            break;

    }

    return options;
}

function RevertTime(time) {
    if (time == null || time.length < 4) return "";
    let date = new Date(time);
    let Y = date.getFullYear() + "-";
    let M =
        (date.getMonth() + 1 < 10 ?
            "0" + (date.getMonth() + 1) :
            date.getMonth() + 1) + "-";
    let D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
    let hh =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
    let mm =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
    let ss =
        (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()) +
        " ";
    return Y + M + D + hh + mm + ss;
}