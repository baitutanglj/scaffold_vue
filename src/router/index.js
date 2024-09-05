import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

// 完整路由代码
export default new VueRouter({
  // mode:'history',
  routes: [
    {
      path: '/',
      component: () => import('@/views/Main'),
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('@/views/Home/Home'),
        },
        {
          path: '/train',
          name: 'train',
          component: () => import('@/views/Scaffold-Decorator/PageOne'),
        },
        {
          path: '/sampling',
          name: 'sampling',
          component: () => import('@/views/Scaffold-Decorator/PageTwo'),
        },
        {
          path:'*',
          component: () =>import('@/views/error404')
        }
      ]
    }
  ]
})
