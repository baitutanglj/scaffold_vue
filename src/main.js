import Vue from 'vue'
import App from './App.vue'
import router from './router'  //引入 vue-router
import store from './store'    //引入 vuex
//引入axios
import axios from 'axios'
import VueAxios from 'vue-axios'
axios.defaults.baseURL = 'http://192.168.109.38:8082'
Vue.use(VueAxios,axios);
// Vue.prototype.$axios = axios.create({
//   baseURL:'http://192.168.109.38:8082'
//   // baseURL:'http://192.168.108.188'
// })

// 全局配置
import '@/assets/scss/reset.scss' //全局样式
import 'element-ui/lib/theme-chalk/index.css' //element-ui样式

// 第三方包
import ElementUI from 'element-ui'
Vue.use(ElementUI)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
