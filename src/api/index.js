// 导出配置好的axios提供给main.js去使用
import axios from 'axios'
import auth from '@/utils/auth'

// 进行axios的配置，将来这回又很多axios相关的配置
// 基准地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'

//请求头 配置token
axios.defaults.headers.Authorization = `Bearer ${auth.getUser().token}`

export default axios