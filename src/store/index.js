import Vue from 'vue';
import Vuex from 'vuex';
import getters from '@/store/getters';

Vue.use(Vuex);

/**
 * 自动化文件导入
 * @link https://webpack.js.org/guides/dependency-management/#requirecontext
 * @description 若你要引入多个 `import app from './modules/app'` 这样的文件，可以通过该方式进行自动导入 `modules` 下所有的文件
 */
const files = require.context('./modules', true, /\.js$/);

const modules = files.keys().reduce((modules, path) => {
  // 将 './app.js' 转为 'app'
  const key = path.replace(/^\.\/(.*)\.\w+$/, '$1');
  modules[key] = files(path).default;
  return modules;
}, {});

export default new Vuex.Store({
  strict: true,
  getters,
  actions: {
    init ({ dispatch, getters }) {
      if (getters.token) return Promise.resolve(true);
      return dispatch('user/init')
        .then(() => dispatch('router/init'))
        .then(() => dispatch('system/init'))
        .then(() => true)
        .catch(e => {
          console.log(e);
          return dispatch('user/logout', { confirm: false }).then(() => false);
        });
    },
  },
  modules,
});
