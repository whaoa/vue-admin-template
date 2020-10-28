// 登录页
const login = [
  {
    name: 'login',
    path: '/system/login',
    meta: { title: '系统登录' },
    component: () => import('@/views/system/login'),
  },
];

// 操作结果页配置
export const operation = [
  {
    name: 'operationSuccess',
    path: '/system/operation/success',
    meta: { title: '操作成功' },
    component: () => import(/* webpackChunkName: "operation" */ '@/views/system/operation/success'),
  },

  {
    name: 'operationFail',
    path: '/system/operation/fail',
    meta: { title: '操作失败' },
    component: () => import(/* webpackChunkName: "operation" */ '@/views/system/operation/fail'),
  },
];

// 错误页面配置
export const error = [
  {
    name: '401',
    path: '/system/error/401',
    alias: '/system/error/no-permission',
    meta: { title: '401' },
    component: () => import(/* webpackChunkName: "error" */ '@/views/system/error/401'),
  },

  {
    name: '403',
    path: '/system/error/403',
    alias: '/system/error/unauthorized',
    meta: { title: '403' },
    component: () => import(/* webpackChunkName: "error" */ '@/views/system/error/403'),
  },

  {
    name: '404',
    path: '/system/error/404',
    alias: '/system/error/not-found',
    meta: { title: '404' },
    component: () => import(/* webpackChunkName: "error" */ '@/views/system/error/404'),
  },
];

export const functional = [
  {
    name: 'refresh',
    path: '/system/refresh',
    component: () => import('@/views/system/functional/refresh'),
  },
  {
    name: 'redirect',
    path: '/system/redirect/:path*',
    component: () => import('@/views/system/functional/redirect'),
  },
];

export default [...login, ...operation, ...error, ...functional].map(route => {
  if (!route.meta) route.meta = {};
  route.meta.hidden = true;
  route.meta.breadcrumb = false;
  return route;
});
