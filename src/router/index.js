import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 路由页面懒加载
const routes = [
  {
    path: '/login',
    component: () => {
      return import('@/views/login')
    }
  },
  {
    path: '/',
    component: () => {
      return import('@/views/Layout')
    },
    redirect: '/ ',
    children: [
      { path: '/ ', component: () => import('@/views/Home') },
      { path: '/video', component: () => import('@/views/Video') },
      { path: '/qa', component: () => import('@/views/QA') },
      { path: '/profile', component: () => import('@/views/My') }
    ]
  },
  { path: '/search', component: () => import('@/views/Search') },
  { path: '/user', component: () => import('@/views/User') },
  { path: '/new', component: () => import('@/views/New') }
]

const router = new VueRouter({
  routes
})

export default router
