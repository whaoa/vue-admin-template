import store from '@/store';
import router from '@/router';

export default {
  install (Vue) {
    Vue.prototype.$al = {
      // tab 相关操作
      tabs: {
        // 打开新标签页
        async open (route) {
          await router.push(route);
          await store.dispatch('page/open', router.currentRoute);
        },
      },

      // 页面操作
      page: {
        // 前进
        async push (route) {
          await router.push(route);
          await store.commit('page/ADD_HISTORY_RECORD', router.currentRoute);
        },
        // 页面返回
        async back (number = -1) {
          await router.go(number);
          await store.commit('page/SUB_HISTORY_RECORD', router.currentRoute);
        },
      },
    };
  },
};
