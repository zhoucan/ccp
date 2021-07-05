import request from '@/utils/request'

export function register (data) {
  return request({
    url: '/system/registry/registry',
    method: 'post',
    data,
    isShowMessage: true
  })
}
export function login (data) {
  return request({
    url: '/login',
    method: 'post',
    data,
    isShowMessage: true
  })
}
export function sendEmail (data) {
  return request({
    url: '/system/registry/sendEmail',
    method: 'post',
    data,
    isShowMessage: false
  })
}

export function getUserInfo () {
  return request({
    url: '/system/registry/getUserInfo',
    method: 'get',
    isShowMessage: false
  })
}

export function cppOutRecharge (data) {
  return request({
    url: '/system/out/cppOutRecharge',
    method: 'post',
    data,
    isShowMessage: true
  })
}

export function cppOutRechargeList (params) {
  return request({
    url: '/system/out/cppOutRechargeList',
    method: 'get',
    params,
    isShowMessage: false
  })
}
