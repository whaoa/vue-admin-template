/**
 * Axios Mock Util
 * @author Wanghao
 * @description 适用于 Axios 请求器的 Mock 拦截器
 */
import MockAdapter from 'axios-mock-adapter';
import Mock from 'mockjs';
import axios from '@/plugins/request';
import { typeOf } from '@/utils';

// 创建 Mock 实例，参数为 Axios 实例，Mock 配置对象
const mock = new MockAdapter(axios, {
  // 响应延迟，单位为 ms
  delayResponse: 500,
  // 未匹配到的请求直接放行
  onNoMatch: 'passthrough',
});

// 导入项目中的 Mock 配置文件
const modules = [];
const files = require.context('@/mock', false, /\.js$/);

files.keys().forEach(key => {
  const configArray = files(key).default;
  // 判断数据类型是否为数组
  const type = typeOf(configArray);
  if (typeOf(configArray) !== 'Array') {
    console.error(`Axios Mock 配置文件数据类型错误: [${key}] 期望导入一个Array, 但是得到了一个 ${type}`);
    return;
  }
  modules.push(...configArray);
});

// 循环处理 Mock 配置对象
modules.forEach(item => {
  // 如果缺少参数
  if (!item.method || !item.url || !item.response) {
    console.error(`Axios Mock 配置文件参数错误: ${Object.keys(item).join()}`);
    return;
  }
  const { url, response } = item;

  // 首字母转大写
  const method = item.method
    .toLowerCase()
    .replace(/^([a-z])([a-z]+)/g, (str, p1, p2) => `${p1.toUpperCase()}${p2}`);

  // 注册 Mock 配置
  mock[`on${method}`](url).reply(config => {
    // 解析 request 中的 body 参数
    if (config.data) config.data = JSON.parse(config.data);

    // 执行响应方法
    try {
      const {
        code = 1,
        msg = 'ok',
        data = {},
        timestamp = Date.now(),
        header = {},
      } = response(config, Mock);

      if (process.env.NODE_ENV !== 'production') console.log('[Axios Mock] :', config, { code, msg, data, timestamp });

      return [200, { code, msg, data, timestamp }, header];
    } catch (e) {
      console.log('[Axios Mock Error] ');
      console.error(e);
      return [200, { code: 500, msg: `服务端错误: ${e.toString()}`, timeStamp: Date.now() }];
    }
  });
});

export default mock;
