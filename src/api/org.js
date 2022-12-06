import request from '@/utils/request'

export function getPage (params) {
  return request({
    url: '/sysOrg/getPage',
    method: 'get',
    params
  })
}

export function getByPid (params) {
  return request({
    url: '/sysOrg/getByPid',
    method: 'get',
    params
  })
}

export function create (data) {
  return request({
    url: '/sysOrg/create',
    method: 'post',
    data
  })
}

export function update (data) {
  return request({
    url: '/sysOrg/update',
    method: 'post',
    data
  })
}
