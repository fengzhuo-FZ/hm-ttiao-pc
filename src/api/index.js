// 导出配置好的axios提供给main.js去使用
import axios from 'axios'
import auth from '@/utils/auth'

// 进行axios的配置，将来这回又很多axios相关的配置
// 基准地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'

//请求头 配置token
// axios.defaults.headers.Authorization = `Bearer ${auth.getUser().token}`

// 请求拦截器
axios.interceptors.request.use(config => {
    // 当前函数：在每次请求前都会执行。
    // 修改请求头配置，追加上token
    // 做一个严谨的判断，本地存储了token就是追加
    const { token } = auth.getUser()
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
}, err => Promise.reject(err))

export default axios