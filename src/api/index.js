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
    isShowMessage: true
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

export function sendUpdateEmail (data) {
  return request({
    url: '/system/registry/sendUpdateEmail',
    method: 'post',
    data,
    isShowMessage: true
  })
}

export function retrievePwdByEmail (data) {
  return request({
    url: '/system/registry/retrievePwdByEmail',
    method: 'post',
    data,
    isShowMessage: true
  })
}
