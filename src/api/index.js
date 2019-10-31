import axios from 'axios'
import local from '@/utils/local'
import router from '@/router'
// 引入json-bigint
import JSONBIGINT from 'json-bigint'
// 对axios进行设置，设置基准地址，默认会添加上
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 配置处理响应体的方式，主动配置，不让axios帮忙配置
axios.defaults.transformResponse = [data => {
  // 进行设置响应体
  try {
    return JSONBIGINT.parse(data)
  } catch (e) {
    return data
  }
}]
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // console.log(config)
  const msg = local.getuser() || {}
  config.headers.Authorization = `Bearer ${msg.token}`
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  if (error.response.status === 401) {
    // console.log(router)
    return router.push('/login')
  }
  return Promise.reject(error)
})

export default axios
