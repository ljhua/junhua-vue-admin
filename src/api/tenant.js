import request from '@/utils/request'

export function getPage (params) {
  return request({
    url: '/sysTenant/getPage',
    method: 'get',
    params
  })
}

export function create (data) {
  return request({
    url: '/sysTenant/create',
    method: 'post',
    data
  })
}

export function update (data) {
  return request({
    url: '/sysTenant/update',
    method: 'post',
    data
  })
}
