import request from '@/utils/request'

export function getPage(params) {
  return request({
    url: '/sysDic/getPage',
    method: 'get',
    params
  })
}

export function getDicByPid(params) {
  return request({
    url: '/sysDic/getDicByPid',
    method: 'get',
    params
  })
}
