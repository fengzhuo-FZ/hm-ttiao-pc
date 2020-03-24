// 导入路由
import VueRouter from 'vue-router'
// 导入vue
import vue from 'vue'

// 导入组件
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Welcome from '../views/Welcome.vue'

// 注册
vue.use(VueRouter)

// 路由规则定义
const routes = [
    { path: '/login', component: Login },
    {
        path: '/', component: Home, children: [
            { path: '/', component: Welcome }
        ]
    }
]
// 初始化路由实例
const router = new VueRouter({ routes })

// 导出路由实例
export default router
