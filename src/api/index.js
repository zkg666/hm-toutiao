import axios from 'axios'

// 对axios进行设置，设置基准地址，默认会添加上
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'

// 导出

export default axios
