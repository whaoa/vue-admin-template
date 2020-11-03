import { MessageBox } from 'element-ui';
import router from '@/router';
import { Cache, _ } from '@/utils';
import { user } from '@/api/user';

export const userCache = new Cache('user');

function defaultState () {
  return {
    // 用户信息
    info: {},
  };
}

export default {
  namespaced: true,

  state: defaultState(),

  mutations: {
    /**
     * 更新 State 数据
     * @param {Object} state
     * @param {String} path - state 对象数据路径
     * @param {*} data - 要更新的数据体
     * @param {Boolean} cache - 是否要缓存数据
     * @constructor
     */
    SET_STATE (state, { path, data, cache = true }) {
      if (!path || !data) return;
      _.set(state, path, data);
      if (cache) userCache.set(path, data);
    },
    // 重置 state
    REST_STATE (state) {
      Object.assign(state, defaultState());
      userCache.remove('info');
    },
  },

  actions: {
    /**
     * 用户登录
     * @param {Function} dispatch
     * @param {Function} commit
     * @param {Object} form - 登录参数对象
     * @param {String} form.username 用户名
     * @param {String} form.password 密码
     * @returns {Promise<void>}
     */
    async login ({ dispatch, commit }, form = {}) {
      const info = await user.login(form);
      commit('SET_STATE', { path: 'info', data: info });
      await dispatch('router/generateRoutes', null, { root: true });
      return info;
    },

    async logout ({ commit }, { confirm = true } = {}) {
      try {
        if (confirm) {
          await MessageBox.confirm('确定要注销当前用户吗?', '注销用户', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          });
        }
        commit('REST_STATE');
        commit('router/REST_STATE', null, { root: true });
        commit('system/REST_STATE', null, { root: true });
        await router.replace({ name: 'login' });
      } catch (e) {
        return false;
      }
    },

    init ({ commit }) {
      const info = userCache.get('info');
      if (!info) return Promise.reject(new ReferenceError('没有找到用户信息'));
      commit('SET_STATE', { path: 'info', data: info });
      return Promise.resolve(info);
    },
  },
};
