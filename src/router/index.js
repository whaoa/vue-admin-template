import Vue from 'vue';
import VueRouter from 'vue-router';
import NProgress from 'nprogress';
import routes from './routes';
import store from '@/store';
import { userCache } from '@/store/modules/user';

NProgress.configure({ showSpinner: false });

// 修复 vue-router NavigationDuplicated 错误
const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push (location) {
  return VueRouterPush.call(this, location).catch(err => err);
};

const VueRouterReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace (location) {
  return VueRouterReplace.call(this, location).catch(err => err);
};

Vue.use(VueRouter);

function createRouter () {
  return new VueRouter({
    // mode: 'history',
    routes,
    scrollBehavior: () => ({ y: 0 }),
  });
}

const router = createRouter();

// 不需要权限的路由名称数组
const routerWithoutAuth = { login: true, redirect: true };

// 关于为什么 beforeEach 和 afterEach 中都包含 NProgress.done 相关的 issues
// https://github.com/vuejs/vue-router/issues/1406
// https://github.com/PanJiaChen/vue-element-admin/pull/2939
router.beforeEach(async (to, from, next) => {
  console.log('Router BeforeEach: ', to);
  // 开启进度条
  NProgress.start();

  const { token } = userCache.get('info') || {};

  // 如果未登录
  if (!token) {
    if (routerWithoutAuth[to.name]) return next();
    next({ name: 'login' });
    NProgress.done();
    return;
  }

  // 如果已登录去登录页
  if (to.name === 'login') {
    next('/');
    NProgress.done();
    return;
  }

  if (store.getters.token) return next();

  const state = await store.dispatch('init');
  if (state) {
    // replace: true 是 为了保证 init action 中的 addRoutes 生效
    next({ ...to, replace: true });
  } else {
    next({ name: 'login' });
    NProgress.done();
  }
});

router.afterEach(to => {
  // 结束进度条
  NProgress.done();
  document.title = (to.meta || {}).title || process.env.VUE_APP_TITLE;
});

// 重置路由数据，详见: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
}

export default router;
