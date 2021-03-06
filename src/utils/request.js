import axios from 'axios'
import store from '@/store'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 3000
})

request.interceptors.request.use(
  // 在发送请求前做什么
  // config 本次请求的配置
  // 必须返回出去
  (config) => {
    const token = store.state.user.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  // 请求错误时，处理的方法
  (error) => {
    return Promise.reject(error)
  }
)

export default request
