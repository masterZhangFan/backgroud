import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
export const constantRoutes = [{
  path: '/login',
  component: () => import('@/views/login/index'),
  hidden: true
},

{
  path: '/404',
  component: () => import('@/views/404'),
  hidden: true
},

{
  path: '/',
  component: Layout,
  redirect: '/login',
  hidden: true,
  children: [{
    path: 'dashboard',
    name: 'Dashboard',
    component: () => import('@/views/dashboard/index'),
    meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
  }]
},

{
  path: '/user-list',
  component: Layout,
  // redirect: '/user-list',
  meta: {
    title: '用户管理',
    subtitle: '用户管理',
    icon: 'example'
  },
  children: [{
    path: 'user-list',
    name: 'UerList',
    component: () => import('@/views/user-manage/index'),
    meta: {
      title: '用户管理',
      subtitle: '用户列表',
      icon: 'table'
    }
  }]
},

{
  path: '/agent-manage',
  component: Layout,
  redirect: '/agent-manage/agent-list',
  meta: {
    title: '代理管理',
    subtitle: '代理管理',
    icon: 'agentManage'
  },
  // hidden: true,
  children: [{
    path: 'agent-list',
    name: 'AgentList',
    component: () => import('@/views/agent-mange/index'),
    meta: {
      title: '代理管理',
      subtitle: '代理列表',
      icon: 'form'
    }
  }]
},

{
  path: '/system',
  component: Layout,
  redirect: '/system/system-setup',
  meta: {
    title: '系统设置',
    subtitle: '系统设置',
    icon: 'nested'
  },
  // hidden: true,
  children: [{
    path: 'system-setup',
    component: () => import('@/views/system-manage/index'), // Parent router-view
    name: 'SystemSetup',
    meta: {
      title: '系统设置',
      subtitle: '系统信息',
      icon: 'form'
    }
  }]
},

// 404 page must be placed at the end !!!
{
  path: '*',
  redirect: '/404',
  hidden: true
}
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
