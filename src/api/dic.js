import request from '@/utils/request'

export function getPage(params) {
  return request({
    url: '/sysDic/getPage',
    method: 'get',
    params
  })
}

export function getChildrenList(params) {
  return request({
    url: '/sysDic/getChildrenList',
    method: 'get',
    params
  })
}
