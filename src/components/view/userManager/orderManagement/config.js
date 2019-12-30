import {
    getSystemOrderTask,
    downloadCertifyFile,
    getInfo
} from '@/api/system/order.js'
import moment from 'moment'
export default {
    satelliteRemote: {
        type: 'mini',
        options: {
            imgUrl: '/static/img/block.png',
            data: [{
                    name: '卫星',
                    content: '测试'
                },
                {
                    name: '传感器',
                    content: '测试'
                },
                {
                    name: '采集时间',
                    content: '测试'
                },
                {
                    name: '云量',
                    content: '测试'
                },
                {
                    name: '分辨率',
                    content: '测试'
                },
                {
                    name: '轨道编号',
                    content: '测试'
                },
                {
                    name: 'Path/Row',
                    content: '测试'
                },
                {
                    name: '产品号',
                    content: '测试'
                },
                {
                    name: '左上',
                    content: '测试'
                },
                {
                    name: '右上',
                    content: '测试'
                },
                {
                    name: '左下',
                    content: '测试'
                },
                {
                    name: '右下',
                    content: '测试'
                }
            ]
        },

        downloadFile: downloadCertifyFile,
        searchApi: params => getSystemOrderTask({...params, DataType: 1 }),
        getInfo,
        table_column_labels_sensingSatellite: [{
                prop: 'name',
                name: '卫星',
                config: {
                    'show-overflow-tooltip': true
                },
            },
            // {
            //   prop: 'address',
            //   name: '传感器',
            //   config: {
            //     'show-overflow-tooltip': true
            //   },		    
            // },
            {
                prop: 'date',
                name: '时间',
                config: {
                    'show-overflow-tooltip': true
                },
                filter: date => date != null ? moment(date).format('YYYY-MM-DD HH:mm') : ""
            },
            {
                prop: 'address',
                name: '云量',
                config: {
                    'show-overflow-tooltip': true
                },
            }
        ],
        table_column_labels_children: [{
                prop: 'dataName',
                name: '数据名称'
            },
            {
                prop: 'aproTime',
                name: '申请时间',
                config: {
                    'show-overflow-tooltip': true
                },
                filter: aproTime => aproTime != null ? moment(aproTime).format('YYYY-MM-DD HH:mm') : ""
            },
            {
                prop: 'statusName',
                name: '订单状态',
                config: {
                    'show-overflow-tooltip': true
                }
            }
        ],
        table_column_labels: [{
                prop: 'typeName',
                name: '订单名称'
            },
            {
                prop: 'addTime',
                name: '申请时间',
                config: {
                    'show-overflow-tooltip': true
                },
                filter: addTime => addTime != null ? moment(addTime).format('YYYY-MM-DD HH:mm') : ""
            },
            {
                prop: 'doneTime',
                name: '完成时间',
                config: {
                    'show-overflow-tooltip': true
                },
                filter: doneTime => doneTime != null ? moment(doneTime).format('YYYY-MM-DD HH:mm') : ""
            },
            {
                prop: 'getTime',
                name: '提取时间',
                config: {
                    'show-overflow-tooltip': true
                },
                filter: getTime => getTime != null ? moment(getTime).format('YYYY-MM-DD HH:mm') : ""
            },
            // {
            //     prop: 'TaskStatus',
            //     name: '订单状态',
            //     config: {
            //         'show-overflow-tooltip': true
            //     }
            // },
            {
                prop: 'reason',
                name: '申请理由',
                config: {
                    'show-overflow-tooltip': true
                }
            },
            {
                prop: 'userName',
                name: '申请人',
                config: {
                    'show-overflow-tooltip': true
                }
            }
        ]
    },
    geologyAchievement: {
        type: 'small',
        options: {
            imgUrl: '/static/img/block.png',
            data: {
                base: [{
                        name: '编号',
                        content: '测试'
                    },
                    {
                        name: '产品名称',
                        content: '测试'
                    },
                    {
                        name: '产品描述',
                        content: '测试'
                    },
                    {
                        name: '关键词',
                        content: '测试'
                    },
                    {
                        name: '产品一级类别',
                        content: '测试'
                    },
                    {
                        name: '生产日期',
                        content: '测试'
                    },
                    {
                        name: '单位名称',
                        content: '测试'
                    },
                    {
                        name: '服务对象名称',
                        content: '测试'
                    },
                    {
                        name: '服务地址',
                        content: '测试'
                    },
                    {
                        name: '下载地址',
                        content: '测试'
                    }
                ],
                extend: [{
                        name: '专业类别',
                        content: '测试'
                    },
                    {
                        name: '比例尺',
                        content: '测试'
                    },
                    {
                        name: '图编号',
                        content: '测试'
                    },
                    {
                        name: '图名',
                        content: '测试'
                    },
                    {
                        name: '空间位置',
                        content: '测试'
                    },
                    {
                        name: '服务类型',
                        content: '测试'
                    },
                    {
                        name: '坐标范围',
                        content: '测试'
                    },
                    {
                        name: '坐标系',
                        content: '测试'
                    },
                    {
                        name: '投影类型',
                        content: '测试'
                    }
                ],
                correlation: [{
                    name: 'xxxxxxxx',
                    content: 'yyyyyy'
                }]
            }
        },

        downloadFile: downloadCertifyFile,
        searchApi: params => getSystemOrderTask({...params, DataType: 2 }),
        getInfo,
        table_column_labels_children: [{
                prop: 'dataName',
                name: '数据名称'
            },
            {
                prop: 'addTime',
                name: '申请时间',
                config: {
                    'show-overflow-tooltip': true
                },
                filter: addTime => addTime != null ? moment(addTime).format('YYYY-MM-DD HH:mm') : ""
            },
            {
                prop: 'Taskstatus',
                name: '订单状态',
                config: {
                    'show-overflow-tooltip': true
                }
            }
        ],
        table_column_labels: [{
                prop: 'typeName',
                name: '订单名称'
            },
            {
                prop: 'addTime',
                name: '申请时间',
                config: {
                    'show-overflow-tooltip': true
                },
                filter: addTime => addTime != null ? moment(addTime).format('YYYY-MM-DD HH:mm') : ""
            },
            {
                prop: 'doneTime',
                name: '完成时间',
                config: {
                    'show-overflow-tooltip': true
                },
                filter: doneTime => doneTime != null ? moment(doneTime).format('YYYY-MM-DD HH:mm') : ""
            },
            {
                prop: 'getTime',
                name: '提取时间',
                config: {
                    'show-overflow-tooltip': true
                },
                filter: getTime => getTime != null ? moment(getTime).format('YYYY-MM-DD HH:mm') : ""
            },
            {
                prop: 'TaskStatus',
                name: '订单状态',
                config: {
                    'show-overflow-tooltip': true
                }
            },
            {
                prop: 'Editdes',
                name: '申请理由',
                config: {
                    'show-overflow-tooltip': true
                }
            },
            {
                prop: 'Userid',
                name: '申请人',
                config: {
                    'show-overflow-tooltip': true
                }
            }
        ]
    },
    geologyThematic: {
        type: 'small',
        options: {
            imgUrl: '/static/img/block.png',
            data: {
                base: [{
                        name: '编号',
                        content: '测试'
                    },
                    {
                        name: '产品名称',
                        content: '测试'
                    },
                    {
                        name: '产品描述',
                        content: '测试'
                    },
                    {
                        name: '关键词',
                        content: '测试'
                    },
                    {
                        name: '产品一级类别',
                        content: '测试'
                    },
                    {
                        name: '生产日期',
                        content: '测试'
                    },
                    {
                        name: '单位名称',
                        content: '测试'
                    },
                    {
                        name: '服务对象名称',
                        content: '测试'
                    },
                    {
                        name: '服务地址',
                        content: '测试'
                    },
                    {
                        name: '下载地址',
                        content: '测试'
                    }
                ],
                extend: [{
                        name: '专业类别',
                        content: '测试'
                    },
                    {
                        name: '比例尺',
                        content: '测试'
                    },
                    {
                        name: '图编号',
                        content: '测试'
                    },
                    {
                        name: '图名',
                        content: '测试'
                    },
                    {
                        name: '空间位置',
                        content: '测试'
                    },
                    {
                        name: '服务类型',
                        content: '测试'
                    },
                    {
                        name: '坐标范围',
                        content: '测试'
                    },
                    {
                        name: '坐标系',
                        content: '测试'
                    },
                    {
                        name: '投影类型',
                        content: '测试'
                    }
                ],
                correlation: [{
                    name: 'xxxxxxxx',
                    content: 'yyyyyy'
                }]
            }
        },

        downloadFile: downloadCertifyFile,
        searchApi: params => getSystemOrderTask({...params, DataType: 3 }),
        getInfo,
        table_column_labels_children: [{
                prop: 'itemCode',
                name: '数据名称'
            },
            {
                prop: 'addTime',
                name: '申请时间',
                config: {
                    'show-overflow-tooltip': true
                },
                filter: addTime => addTime != null ? moment(addTime).format('YYYY-MM-DD HH:mm') : ""
            },
            {
                prop: 'Taskstatus',
                name: '订单状态',
                config: {
                    'show-overflow-tooltip': true
                }
            }
        ],
        table_column_labels: [{
                prop: 'typeName',
                name: '订单名称'
            },
            {
                prop: 'addTime',
                name: '申请时间',
                config: {
                    'show-overflow-tooltip': true
                },
                filter: addTime => addTime != null ? moment(addTime).format('YYYY-MM-DD HH:mm') : ""
            },
            {
                prop: 'doneTime',
                name: '完成时间',
                config: {
                    'show-overflow-tooltip': true
                },
                filter: doneTime => doneTime != null ? moment(doneTime).format('YYYY-MM-DD HH:mm') : ""
            },
            {
                prop: 'getTime',
                name: '提取时间',
                config: {
                    'show-overflow-tooltip': true
                },
                filter: getTime => getTime != null ? moment(getTime).format('YYYY-MM-DD HH:mm') : ""
            },
            {
                prop: 'TaskStatus',
                name: '订单状态',
                config: {
                    'show-overflow-tooltip': true
                }
            },
            {
                prop: 'Editdes',
                name: '申请理由',
                config: {
                    'show-overflow-tooltip': true
                }
            },
            {
                prop: 'Userid',
                name: '申请人',
                config: {
                    'show-overflow-tooltip': true
                }
            }
        ]
    }
}