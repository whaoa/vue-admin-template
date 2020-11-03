import { Cache, _ } from '@/utils';
import router, { resetRouter } from '@/router';
import { systemRoutes, routerComponents, notFoundRouter } from '@/router/routes';

import { menus } from '@/api/system';
import { AdminLayout, ChildLayout, TabsLayout } from '@/layouts';

export const routesCache = new Cache('routes');

function defaultState () {
  return {
    index: null,
    routes: [],
    raw: [],
  };
}

/**
 * 获取路由配置数组中的第一个路由配置对象信息
 * @param {Array} routes - 路由配置数组
 * @returns {{}|*}
 */
function findFirstRoute (routes = []) {
  if (!routes.length) return {};
  if (routes.children) return findFirstRoute(routes.children);
  return routes[0] || {};
}

/**
 * 路由配置数据处理
 * @param {Array} asyncRoutes - 接口返回的路由配置数组
 * @param {Object} localRoutes - 本地路由配置对象
 * @param {Object} [parent] - 父级路由配置对象
 * @returns {Array}
 */
function routesCompiler (asyncRoutes = [], localRoutes = {}, parent) {
  if (asyncRoutes.length === 0 || localRoutes.length === 0) return [];
  return asyncRoutes.reduce((acc, cur) => {
    // 读取该路由 name 所对应的页面组件配置
    const route = localRoutes[cur.name] || {};

    // 使用接口数据组装路由元信息
    const meta = {
      icon: cur.icon,
      title: cur.title,
      hidden: !!cur.hidden,
      showAsRoot: !!cur.root,
      breadcrumb: typeof cur.breadcrumb === 'undefined' ? true : cur.breadcrumb,
      navClickable: true,
      operation: cur.actions || [],
    };

    // 生成临时路由配置对象
    const temp = {
      name: cur.name,
      // 接口返回的页面路径 || 父级路径 + 路由 name || 路由 name
      path: cur.path || `${parent && parent.path || ''}/${cur.name}` || `/${cur.name}`,
      meta: Object.assign({}, route.meta || {}, meta),
      component: route.component,
    };

    // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
    temp.path = temp.path.replace('//', '/');

    // 如果路由包含子路由配置
    if (cur.children && cur.children.length) {
      // 如果 name 所对应的路由组件不存在，则当作空路由处理，使用 ChildLayout 布局
      if (!temp.component) temp.component = ChildLayout;
      // 递归处理子路由
      temp.children = routesCompiler(cur.children, localRoutes, temp);
    } else if (cur.tabs && cur.tabs.length) {
      // 如果包含面板配置，统一使用 TabsLayout 布局
      temp.component = TabsLayout;
      // 将 tabs 信息挂载到当前路由对象的元信息上，便于 TabsLayout 布局进行标签页渲染
      temp.meta.tabs = cur.tabs.map(i => ({ name: i.name, title: i.title }));
      // 递归处理 tabs 当作子路由挂载到路由对象上
      temp.children = routesCompiler(cur.tabs, localRoutes, temp);
      // 将当前路由重定向到第一个标签页
      if (temp.children.length && temp.children[0].name) temp.redirect = { name: temp.children[0].name };
    } else {
      // 如果是页面路由配置，但没有找到对应的路由组件配置
      if (!temp.component) return acc;
      if (parent && parent.meta.tabs) temp.meta.activeMenuPath = parent.path;
    }
    // 如果 children 存在，但长度为 0 则不显示
    if (temp.children && temp.children.length === 0) return acc;
    // 如果 tabs 存在，但长度为 0 则不显示
    if (temp.meta.tabs && (temp.meta.tabs.length === 0 || temp.children.length === 0)) return acc;
    acc.push(temp);
    return acc;
  }, []);
}

/**
 * 路由菜单组数据处理
 * @param {Array} routeGroup - 接口返回的路由配置数据
 * @returns {Array}
 */
function transformRoutes (routeGroup = []) {
  if (routeGroup.length === 0) return [];

  return routeGroup.reduce((result, group) => {
    if (!group.link && (!group.children || !group.children.length)) return result;

    const { name, path, title, children } = group;

    const item = { name, path: path || '/' + name, meta: { title } };

    if (group.link) item.link = group.link;

    if (children && children.length) {
      item.children = routesCompiler(children, routerComponents);
    }

    if (item.children && item.children.length) {
      const redirect = findFirstRoute(item.children);
      if (redirect.name) item.redirect = { name: redirect.name };
    }
    item.component = AdminLayout;
    result.push(item);
    return result;
  }, []);
}

export default {
  namespaced: true,

  state: defaultState(),

  mutations: {
    // 设置数据
    SET_STATE (state, { path, data }) {
      if (!path) return;
      _.set(state, path, data);
    },

    // 重置 state
    REST_STATE (state) {
      Object.assign(state, defaultState());
      routesCache.remove('routes');
      resetRouter();
    },
  },

  actions: {
    async generateRoutes ({ dispatch, commit }, routes) {
      // 获取路由数据
      if (!routes) routes = await menus.get();
      // 保存数据到 state
      commit('SET_STATE', { path: 'raw', data: routes });
      // 处理完成后，将原数据缓存到本地
      routesCache.set('raw', routes);
      // 切换菜单
      return dispatch('switchMenu');
    },

    switchMenu ({ state, commit }, index = 0) {
      // 生成路由配置树
      const [route] = transformRoutes([state.raw[index]]);
      // 重置路由对象
      if (typeof state.index === 'number') resetRouter();
      // 保存页面路由数据到 state
      commit('SET_STATE', { path: 'routes', data: route.children });
      // 追加新路由
      route.children = route.children.concat(systemRoutes, notFoundRouter);
      router.addRoutes([
        { path: '/', redirect: { name: route.redirect.name } },
        route,
      ]);
      // 设置菜单激活下标
      commit('SET_STATE', { path: 'index', data: index });
      return { name: route.redirect.name };
    },

    init ({ rootState, dispatch }) {
      if (!rootState.user.info.token) throw new ReferenceError('缺少TOKEN');
      const routes = routesCache.get('raw');
      return dispatch('generateRoutes', routes);
    },
  },
};
