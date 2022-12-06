import request from '@/utils/request'

export function getPage (params) {
  return request({
    url: '/sysTenantPackage/getPage',
    method: 'get',
    params
  })
}

export function create (data) {
  return request({
    url: '/sysTenantPackage/create',
    method: 'post',
    data
  })
}

export function update (data) {
  return request({
    url: '/sysTenantPackage/update',
    method: 'post',
    data
  })
}
