import Vue from 'vue'
// 导入核心JS包
import ElementUI from 'element-ui';
// 注册核心样式
import 'element-ui/lib/theme-chalk/index.css';
// 注册element
import App from './App.vue'

// 导入路由实例
import router from './router/index'

Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 挂载
  router
}).$mount('#app')
