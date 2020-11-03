/**
 * 路由配置说明
 * @description 当一个路由下面的 children 声明的路由大于1个时，会自动变成嵌套的模式, 只有一个时，会将那个子路由当做根路由显示在侧边栏
 * @link https://panjiachen.gitee.io/vue-element-admin-site/zh/guide/essentials/router-and-nav
 * @type {Object}
 * @property {Object} meta - 路由自定义配置对象
 * @property {String} meta.title - 路由名称
 * @property {String} [meta.icon] - 侧边栏显示的图标
 * @property {Boolean} [meta.cache] - 是否需要缓存
 * @property {String} [meta.activeMenuName] - 当前路由对应需要高亮侧边栏路由的 name
 * @property {Boolean} [meta.hidden=false] - 是否在侧边栏中隐藏, 默认为 false
 * @property {Boolean} [meta.showAsRoot=false] - 是否要在侧边栏当作一级路由显示, 默认为 false
 * @property {Boolean} [meta.breadcrumb=true] - 是否在面包屑导航中显示, 默认为 true
 * @property {Boolean} [meta.navClickable=true] - 是否在面包屑导航中可点击, 默认为 true (同 vue-element-admin 的 redirect=noRedirect)
 */

import { login } from '@/router/modules/system';

import demo from '@/router/modules/demo';
import components from '@/router/modules/components';

// 系统路由配置
export { default as systemRoutes } from '@/router/modules/system';

export const notFoundRouter = { path: '*', redirect: { name: '404' }, hidden: true };

export const routerComponents = {
  Home: { component: () => import('@/views/home') },

  ...demo,
  ...components,
};

export default [
  login,
];
