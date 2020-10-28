const isProduct = process.env.NODE_ENV === 'production';

module.exports = [
  // Vue Framework
  { name: 'vue', library: 'Vue', js: `https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue${isProduct ? '.min' : ''}.js` },
  { name: 'vue-router', library: 'VueRouter', js: `https://cdn.jsdelivr.net/npm/vue-router@3.4.6/dist/vue-router${isProduct ? '.min' : ''}.js` },
  { name: 'vuex', library: 'Vuex', js: `https://cdn.jsdelivr.net/npm/vuex@3.5.1/dist/vuex${isProduct ? '.min' : ''}.js` },
  { name: 'vuex-persistedstate', library: 'createPersistedState', js: 'https://cdn.jsdelivr.net/npm/vuex-persistedstate@4.0.0-beta.1/dist/vuex-persistedstate.umd.js' },
  // Utils
  { name: 'axios', library: 'axios', js: 'https://cdn.jsdelivr.net/npm/axios@0.20.0/dist/axios.min.js' },
  { name: 'md5', library: 'MD5', js: 'https://cdn.jsdelivr.net/npm/md5@2.3.0/dist/md5.min.js' },
  { name: 'dayjs', library: 'dayjs', js: 'https://cdn.jsdelivr.net/npm/dayjs@1.9.3/dayjs.min.js' },
  { name: 'echarts', library: 'echarts', js: 'https://cdn.jsdelivr.net/npm/echarts@4.9.0/dist/echarts.min.js' },
  { name: 'v-charts', library: 'VeIndex', js: 'https://cdn.jsdelivr.net/npm/v-charts@1.19.0/lib/index.min.js', css: 'https://cdn.jsdelivr.net/npm/v-charts@1.19.0/lib/style.min.css' },
  // { name: 'mockjs', library: 'Mock', js: 'https://cdn.jsdelivr.net/npm/mockjs@1.1.0/dist/mock-min.js' },
  // { name: 'axios-mock-adapter', library: 'AxiosMockAdapter', js: 'https://cdn.jsdelivr.net/npm/axios-mock-adapter@1.18.1/dist/axios-mock-adapter.min.js' },
  // Element-UI
  { name: 'element-ui', library: 'ELEMENT', js: 'https://cdn.jsdelivr.net/npm/element-ui@2.13.2/lib/index.js' },
  // JS Library
  { name: 'vue-baidu-map', library: 'VueBaiduMap', js: 'https://cdn.jsdelivr.net/npm/vue-baidu-map@0.21.22/index.js' },
  { name: 'sortablejs', library: 'Sortable', js: 'https://cdn.jsdelivr.net/npm/sortablejs@1.10.2/Sortable.min.js' },
  { name: 'vuedraggable', library: 'vuedraggable', js: 'https://cdn.jsdelivr.net/npm/vuedraggable@2.24.1/dist/vuedraggable.umd.min.js' },
  { name: 'nprogress', library: 'NProgress', js: 'https://cdn.jsdelivr.net/npm/nprogress@0.2.0/nprogress.js', css: 'https://cdn.jsdelivr.net/npm/nprogress@0.2.0/nprogress.css' },
  { name: 'screenfull', library: 'screenfull', js: 'https://cdn.jsdelivr.net/npm/screenfull@5.0.2/dist/screenfull.js' },
  // Style
  { name: 'normalize.css', library: 'normalize.css', css: 'https://cdn.jsdelivr.net/npm/normalize.css@8.0.1/normalize.min.css' },
];
