import request from '@/utils/request'

export function register (data) {
  return request({
    url: '/system/registry/registry',
    method: 'post',
    data
  })
}
export function login (data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}
export function sendEmail (data) {
  return request({
    url: '/system/registry/sendEmail',
    method: 'post',
    data
  })
}

export function getUserInfo () {
  return request({
    url: '/system/registry/getUserInfo',
    method: 'get'
  })
}

export function cppOutRecharge (data) {
  return request({
    url: '/system/out/cppOutRecharge',
    method: 'post',
    data
  })
}

export function cppOutRechargeList (params) {
  return request({
    url: '/system/out/cppOutRechargeList',
    method: 'get',
    params
  })
}
