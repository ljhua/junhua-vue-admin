import request from '@/utils/request'

export function getPage (params) {
  return request({
    url: '/sysDic/getPage',
    method: 'get',
    params
  })
}

export function getByPid (params) {
  return request({
    url: '/sysDic/getByPid',
    method: 'get',
    params
  })
}

export function create (data) {
  return request({
    url: '/sysDic/create',
    method: 'post',
    data
  })
}

export function update (data) {
  return request({
    url: '/sysDic/update',
    method: 'post',
    data
  })
}

export function getChildrenByDicCode (params) {
  return request({
    url: '/sysDic/getChildrenByDicCode',
    method: 'get',
    params
  })
}
