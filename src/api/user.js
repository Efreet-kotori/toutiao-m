import request from '@/utils/request'
import store from '@/store'
/**
 *登录
 * @param {*} mobile 手机号
 * @param {*} code 验证码
 * @returns Promise
 */
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: { mobile, code }
  })
}
/**
 * 发送验证码
 * @param {*} mobile 手机号
 * @returns Promise
 */
export const sendCode = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}
/**
 *
 * @returns
 */
export const getUserInfo = () => {
  return request({
    url: '/v1_0/user',
    headers: {
      Authorization: `Bearer ${store.state.user.token}`
    }
  })
}

export const getUser = () => {
  return request({
    url: '/v1_0/user/profile',
    headers: {
      Authorization: `Bearer ${store.state.user.token}`
    }
  })
}

export const recomposesUser = (id, realName, name, gender, birthday, intro) => {
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: { id, realName, name, gender, birthday, intro }
  })
}
