import request from '@/utils/request'

export function getPage (params) {
  return request({
    url: '/sysResource/getPage',
    method: 'get',
    params
  })
}

export function getByPid (params) {
  return request({
    url: '/sysResource/getByPid',
    method: 'get',
    params
  })
}

export function create (data) {
  return request({
    url: '/sysResource/create',
    method: 'post',
    data
  })
}

export function update (data) {
  return request({
    url: '/sysResource/update',
    method: 'post',
    data
  })
}
