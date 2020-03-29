// 导入路由
import VueRouter from 'vue-router'
// 导入vue
import vue from 'vue'

// 导入组件
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Welcome from '../views/Welcome.vue'
import NotFound from '../views/404.vue'
import Article from '../views/Article.vue'
import Image from '../views/Image.vue'


// 导入auth模块
import auth from '@/utils/auth'

// 注册
vue.use(VueRouter)

// 路由规则定义
const routes = [
    { path: '/login', component: Login },
    {
        path: '/', component: Home, children: [
            { path: '/', component: Welcome },
            { path: '/article', component: Article },
            { path: '/image', component: Image }

        ]
    },
    // 404
    { path: '*', component: NotFound }
]
// 初始化路由实例
const router = new VueRouter({ routes })

// 导航守卫
router.beforeEach((to, from, next) => {
    // 如果你访问的路径是除去登录外的路径，并且你此时没有登录，拦截到登录页面。
    // 其他情况一概放行。
    const user = auth.getUser()
    if (to.path !== '/login' && !user.token) return next('/login')
    next()
})


// 导出路由实例
export default router
