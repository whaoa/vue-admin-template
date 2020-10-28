import { _ } from '@/utils';
import router from '@/router';
import systemRoutes from '@/router/modules/system';

const systemRouteName = systemRoutes.map(i => i.name);

function defaultState () {
  return {
    active: -1,
    opened: [],
    cache: [],
  };
}

export default {
  namespaced: true,

  state: defaultState(),

  mutations: {
    SET_ACTIVE_PAGE (state, index) {
      if (index === 'undefined') return;
      state.active = index;
    },

    // 添加新打开的页面
    ADD_OPENED_PAGE (state, route) {
      if (!route) return;
      state.opened.push(route);
    },
    // 更新已打开的页面信息
    UPDATE_OPENED_PAGE (state, { route, index } = {}) {
      if (typeof index === 'undefined') return;
      state.opened.splice(index, 1, route);
    },
    // 关闭已打开的页面
    REMOVE_OPENED_PAGE (state, index) {
      // 如果没有传入 index, 则重置数据
      if (typeof index === 'undefined') {
        state.opened = [];
        return;
      }
      state.opened.splice(index, 1);
    },

    // 添加需要缓存的组件名称
    ADD_CACHE_PAGE (state, name) {
      if (!name) return;
      state.cache.push(name);
    },
    // 删除缓存页面
    REMOVE_CACHE_PAGE (state, name) {
      // 如果没有传入 name, 则重置数据
      if (!name) {
        state.cache = [];
        return;
      }
      const index = state.cache.findIndex(i => i === name);
      if (index > -1) state.cache.splice(index, 1);
    },

    SET_STATE (state, { path, data }) {
      if (!path) return;
      _.set(state, path, data);
    },

    // 重置 state
    REST_STATE (state) {
      Object.assign(state, defaultState());
    },
  },

  actions: {
    /**
     * 打开一个页面
     * @param {Object} state
     * @param {Function} commit
     * @param {Object} route - 路由数据对象, 通过路由拦截器中的 to 参数获取
     * @param {String} route.name - 路由名称
     * @param {String} route.fullPath - 路由完整路径
     * @param {Object} route.meta - 路由元信息
     * @param {Object} route.query - 路由参数
     * @param {Object} route.params - 路由参数
     */
    open ({ state, commit }, route) {
      if (!route) return;
      // 如果是系统页面
      if (route.name === 'Home' || systemRouteName.includes(route.name)) {
        commit('SET_ACTIVE_PAGE', -1);
        return;
      }
      // 如果没有元信息
      if (!route.meta) route.meta = { title: '未命名' };
      // 查看页面是否被打开过
      const isOpened = state.opened.findIndex(item => item.fullPath === route.fullPath);
      // 如果没有打开过
      const { name, meta, fullPath, query, params } = route;
      // 如果打开过
      if (isOpened > -1) {
        commit('UPDATE_OPENED_PAGE', { route: { name, meta, fullPath, query, params }, index: isOpened });
        // 设置该标签页为当前页
        commit('SET_ACTIVE_PAGE', isOpened);
        return;
      }
      // 添加到已打开列表中
      commit('ADD_OPENED_PAGE', { name, meta, fullPath, query, params });
      // 设置该标签页为当前页
      commit('SET_ACTIVE_PAGE', state.opened.length - 1);
      // TODO: 开启多标签页时是否全部缓存
      // 添加到缓存列表中
      commit('ADD_CACHE_PAGE', name);
      // 如果设置了缓存
      // if (route.meta.cache) commit('ADD_KEEP_ALIVE', route.name);
    },

    /**
     * 关闭一个页面
     * @param {Object} state
     * @param {Function} commit
     * @param {Number} index 要关闭的标签页索引
     */
    close ({ state, commit }, index) {
      // 移除要关闭的页面的缓存配置
      if ((state.opened[index] || {}).name) commit('REMOVE_CACHE_PAGE', state.opened[index].name);
      // 如果要关闭的页面不是当前打开的页面
      if (state.active !== index) {
        commit('REMOVE_OPENED_PAGE', index);
        return;
      }

      // 如果要关闭的是最后一个
      if (index === state.opened.length - 1) {
        commit('SET_ACTIVE_PAGE', index === 0 ? -1 : index - 1);
      } else {
        commit('SET_ACTIVE_PAGE', index + 1);
      }
      commit('REMOVE_OPENED_PAGE', index);
      // 跳转到新标签页
      return router.push({ path: state.opened[state.active] || '/' });
    },

    /**
     * 批量关闭页面
     * @param {Object} state
     * @param {Function} dispatch
     * @param {Function} commit
     * @param {Number} index - 触发事件元素的下标
     * @param {String} type - 批量关闭类型
     * @returns {Promise<Route>}
     */
    closeWithType ({ state, dispatch, commit }, { index, type } = {}) {
      console.log(index, type);
      switch (type) {
        case 'all':
          commit('REST_STATE');
          commit('SET_ACTIVE_PAGE', -1);
          if (state.active !== -1) router.push('/');
          break;

        case 'left':
          // eslint-disable-next-line no-case-declarations
          const rightTabs = state.opened.slice(index, state.opened.length);
          commit('SET_STATE', { path: 'opened', data: rightTabs });
          commit('SET_STATE', { path: 'cache', data: rightTabs.map(i => i.name) });
          // 如果当前激活的标签页下标小于触发下标, 则该页面将会被关闭
          // 需要重定向到触发事件的tab对应的页面
          if (state.active < index) router.push(state.opened[0].fullPath);
          // 设置激活页为触发事件的tab
          if (state.active <= index) commit('SET_ACTIVE_PAGE', 0);
          break;

        case 'right':
          if (index === -1) return dispatch('closeWithType', { type: 'all' });
          // eslint-disable-next-line no-case-declarations
          const leftTabs = state.opened.slice(0, index + 1);
          commit('SET_STATE', { path: 'opened', data: leftTabs });
          commit('SET_STATE', { path: 'cache', data: leftTabs.map(i => i.name) });
          // 如果当前激活的标签页下标大于触发下标, 则该页面将会被关闭
          // 需要重定向到触发事件的tab对应的页面
          if (state.active > index) router.push(state.opened[index].fullPath);
          // 设置激活页为触发事件的tab
          if (state.active > index) commit('SET_ACTIVE_PAGE', index);
          break;

        case 'other':
          if (state.opened[index]) {
            const { name, meta, fullPath, query, params } = state.opened[index];
            commit('SET_STATE', { path: 'opened', data: [{ name, meta, fullPath, query, params }] });
            commit('SET_STATE', { path: 'cache', data: [name] });
            commit('SET_ACTIVE_PAGE', 0);
          } else {
            dispatch('closeWithType', { type: 'all' });
          }
          break;

        default:
      }
    },
  },
};
