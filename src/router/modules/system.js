// 登录页
export const login = {
  name: 'login',
  path: '/system/login',
  meta: { title: '系统登录' },
  component: () => import(/* webpackChunkName: "system" */ '@/views/system/login'),
};

export default [
  // 操作结果页配置
  {
    name: 'operationSuccess',
    path: 'system/operation/success',
    meta: { title: '操作成功', hidden: true, system: true },
    component: () => import(/* webpackChunkName: "system" */ '@/views/system/operation/success'),
  },

  {
    name: 'operationFail',
    path: 'system/operation/fail',
    meta: { title: '操作失败', hidden: true, system: true },
    component: () => import(/* webpackChunkName: "system" */ '@/views/system/operation/fail'),
  },

  // 错误页面配置
  {
    name: '401',
    path: 'system/error/401',
    meta: { title: '401', hidden: true, system: true },
    component: () => import(/* webpackChunkName: "system" */ '@/views/system/error/401'),
  },
  {
    name: '403',
    path: 'system/error/403',
    meta: { title: '403', hidden: true, system: true },
    component: () => import(/* webpackChunkName: "system" */ '@/views/system/error/403'),
  },
  {
    name: '404',
    path: 'system/error/404',
    meta: { title: '404', hidden: true, system: true },
    component: () => import(/* webpackChunkName: "system" */ '@/views/system/error/404'),
  },

  // 功能页
  {
    name: 'refresh',
    path: 'system/refresh',
    meta: { hidden: true, system: true },
    component: () => import(/* webpackChunkName: "system" */ '@/views/system/functional/refresh'),
  },
  {
    name: 'redirect',
    path: 'system/redirect/:path*',
    meta: { hidden: true, system: true },
    component: () => import(/* webpackChunkName: "system" */ '@/views/system/functional/redirect'),
  },
];
