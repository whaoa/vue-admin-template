/**
 * request 参数
 * @param data {Object} 请求配置参数
 * @param data.options {Object} 自定义配置项
 * @param data.options.operation {Boolean} 是否为操作类型接口，如果是，则会在 code = 1 时弹出 response.msg 作为成功提示
 */
import md5 from 'md5';
import axios from 'axios';
import { Message } from 'element-ui';
import store from '@/store';
import router from '@/router';
import { qs } from '@/utils';

const APPID = process.env.VUE_APP_APPID;
const SECRET = process.env.VUE_APP_SECRET;

// 错误打印及提示
function errorCreate (error) {
  if (process.env.NODE_ENV === 'development') {
    console.log('>>>>>> Error >>>>>>');
    console.log(error);
  }
  Message({
    message: error,
    type: 'error',
    duration: 5 * 1000,
  });
}

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // 请求超时时长
  timeout: 10000,
  // 跨域请求时是否携带token
  // withCredentials: true,
});

service.interceptors.request.use(
  config => {
    // 设置 appid
    if (APPID) config.headers['x-access-appid'] = APPID;
    // 设置 token
    const token = store.getters.token;
    if (token) config.headers['x-access-token'] = token;

    // 处理参数签名
    let params = {};
    if (config.method.toUpperCase() === 'GET') {
      if (!config.params) config.params = {};
      params = config.params;
    } else {
      if (!config.data) config.data = {};
      params = config.data;
    }

    // 设置 city_id
    const city = store.getters.city;
    if (typeof params.city_id === 'undefined' && city && typeof city.city_id !== 'undefined') params.city_id = city.city_id;

    // 处理参数签名
    params.timestamp = Date.now();
    params.signature = md5(encodeURI(qs(params)) + SECRET);

    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  },
);

service.interceptors.response.use(
  response => {
    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data;
    // 这个状态码是和后端约定的
    const { code } = dataAxios;
    // 根据 code 进行判断
    switch (code) {
      // 如果没有 code 代表这不是项目后端开发的接口
      case undefined:
        return dataAxios;

      // 有 code 代表这是一个后端接口 可以进行进一步的判断
      // code === 1 代表没有错误
      case 1:
        // 如果设置请求为操作接口，则在执行成功时显示操作提示信息
        if (response.config.options && response.config.options.operation) Message.success(dataAxios.msg === 'ok' ? '操作成功' : dataAxios.msg);
        return dataAxios.data;

      // 如果登录过期或者需要重新登录
      case 2:
      case 9:
        errorCreate('登录状态失效，请重新登录');
        store.dispatch('user/logout').then(() => {
          router.push('/login');
        });
        return dataAxios.data;

      // 不是正确的 code
      default:
        errorCreate(`${dataAxios.msg}`);
        return Promise.reject(dataAxios);
    }
  },
  error => {
    if (!error.response) {
      errorCreate('请求失败');
      return Promise.reject(error);
    }
    let message = '';
    switch (error.response.status) {
      case 400:
        message = '请求错误';
        break;
      case 401:
        message = '未授权，请登录';
        break;
      case 403:
        message = '拒绝访问';
        break;
      case 404:
        message = `请求地址出错: ${error.response.config.url}`;
        break;
      case 408:
        message = '请求超时';
        break;
      case 500:
        message = '服务器内部错误';
        break;
      case 501:
        message = '服务未实现';
        break;
      case 502:
        message = '网关错误';
        break;
      case 503:
        message = '服务不可用';
        break;
      case 504:
        message = '网关超时';
        break;
      case 505:
        message = 'HTTP版本不受支持';
        break;
      default:
        break;
    }
    errorCreate(message);
    return Promise.reject(error);
  },
);

export default service;

