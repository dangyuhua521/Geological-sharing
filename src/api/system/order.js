import request from '@/utils/request'
import { clearDownloadFileHttp } from '@/utils/request'
export function getSystemOrderTask({
  BeginAddTime,
  EndAddTime,
  PageSize,
  Page,
  UserName,
  CheckedType,
  Order,
  id,TaskInfoStatus,
  DataType = 1
}) {
  return request
    .get('TYwDatatask/GetTaskList', {
      params: {
        DataType,
        BeginAddTime,
        EndAddTime,
        PageSize,
        Page,
        UserName,
        CheckedType,
        Order,
        id,TaskInfoStatus
      }
    })
    .then(res => res.data)
}
// 地质专题产品订单管理-查看证明文件
export function downloadCertifyFile({ id }) {
  return clearDownloadFileHttp
    .get(`TYwDataorder/DownloadProveFileZip`, {
      responseType: 'blob',
      params: {
        id
      }
    })
    .then(res => new Blob([res.data]))
}
export function getCertifyFile({ id }) {
  return request
    .get(`/TYWORDERProveFile/Query`, {
      params: {
        id
      }
    })
    .then(res => res.data)
}
export function getInfo({ TaskId }) {
  return request
    .get(`/TYwDatataskinfo/Query`, {
      params: {
        TaskId
      }
    })
    
}
