import request from '@/utils/request'
export function getdetails(params,logParams) {
  return request.get(
      'TYwDatataskinfo/RasterQueryInfo', {
        params: params
      })
    .then(res => {
      let data=JSON.parse(res.data);
      InsertLog(logParams.module,"查看详情","查看详情","卫星遥感资源-"+data.data.name);
      return data;
    }
  )
}
export function InsertLog(module,_action,explain,actionobj) {
  request.get(
      'SystemOperationlog/InsertLog', {
        params: {
          module,
          _action,
          explain,
          actionobj
        }
      })
    .then(res => {})
}
//地质专题产品
export function QueryDataInfo(params,logParams) {
  return request.get(
      'TYwDatataskinfo/QueryDataInfo', {
        params: params
      })
    .then(res => {
      let data=JSON.parse(res.data);
      let name='';
      if(params.type=='special')
      {
        name="地质专题产品-"+data.data.serverName
      }
      else if(params.type=='data')
      {
        name="地质成果数据-"+data.data.data.caption
      }else if(params.type=='dossier')
      {
       //未写完
        name="地质档案-"+data.data.data.caption
      }
      InsertLog(logParams.module,"查看详情","查看详情",name);
      return data;
    })
}
