import Vue from 'vue';
import ElementUI from 'element-ui';
import '@/styles/element-ui-theme/index.css';

import App from './App.vue';

import store from '@/store';
import router from '@/router';
import Al from '@/plugins/al';
import components from '@/components';

Vue.use(Al);
Vue.use(ElementUI);
Vue.use(components);

// 仅在非生产环境下引入 mock
if (process.env.NODE_ENV !== 'production') require('@/plugins/mock');

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
