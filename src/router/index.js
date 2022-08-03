import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = () => import('@/views/login')
const manage = () => import('@/views/manage')
const home = () => import('@/views/home')
const userList = () => import('@/views/userList')
const addUser = () => import('@/views/addUser')

const routes = [
  { path: '/', name: 'login', component: login },
  {
    path: '/manage',
    component: manage,
    children: [
      { path: '', component: home, meta: [] },
      { path: '/userList', component: userList, meta: ['数据管理', '用户列表'] },
      { path: '/addUser', component: addUser, meta: ['添加数据', '添加用户'] },
    ],
  },
]

const router = new Router({
  routes,
})

export default router
