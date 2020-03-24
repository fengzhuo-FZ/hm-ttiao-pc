// main.js 职责有二：
// 职责1：负责导入项目中需要依赖的资源
// 职责2：初始化根实例

import Vue from 'vue'
// 导入核心JS包
import ElementUI from 'element-ui';
// 注册核心样式
import 'element-ui/lib/theme-chalk/index.css';
// 注册element
import App from './App.vue'

// 导入路由实例
import router from './router/index'

// 导入配置好的axios
// 完整路径：./api/index.js
// 简写  ./api  index.js是默认索引文件可以省略
// 使用相对路径要根据目录结构进行书写，如果目录结构一旦发生改变，线路路径的层级也会改变。
// 使用绝对路径就没问题，@ 代表src的绝对路径。补充：vue-cli下才可使用。
import axios from '@/api'

// 挂载axios
Vue.prototype.$http = axios

Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 挂载
  router
}).$mount('#app')
