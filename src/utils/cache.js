/**
 * @LastEditors whao
 * @Date 2020-08-17 15:40
 * @Description: 本地缓存数据操作封装
 */
import { Message } from 'element-ui';

const NAMESPACE = process.env.VUE_APP_NAMESPACE || 'ADMIN';

/**
 * Cache 构造函数
 * @class
 */
class Cache {
  /**
   * @member {string} namespace - 模块名(命名空间)
   */
  namespace = '';

  constructor (namespace = 'global') {
    this.namespace = `__${NAMESPACE}__${namespace.toLowerCase()}`;
  }

  /**
   * 读取数据
   * @method
   * @param {String} name 用于保存缓存数据的key名
   * @param {*} data 需要缓存的数据，支持任何合法的JSON数据类型
   * @param {Number} expire 有效期时间，单位为ms
   * @param {Boolean} autoRemove 过期是否自动删除
   * @returns {*} 返回传入的 value
   */
  set (name, data, { expire, autoRemove = false } = {}) {
    if (!name) throw new TypeError('设置缓存时缺少 name 参数');

    try {
      const key = `__${this.namespace}__${name}`;
      const cacheData = { data, timestamp: Date.now() };
      if (expire) cacheData.expire = expire;
      if (autoRemove) cacheData.autoRemove = true;
      window.localStorage.setItem(key, JSON.stringify(cacheData));
    } catch (e) {
      createError(e.message);
      throw e;
    }

    return data;
  }

  /**
   * 读取缓存
   * @method
   * @param {String} name 用于保存缓存数据的key名
   * @param {Boolean} full 是否返回完成原始数据，即携带有效期等信息的数据
   * @returns {*}
   */
  get (name, { full = false } = {}) {
    if (!name) throw new TypeError('读取缓存时缺少 name 参数');

    try {
      const key = `__${this.namespace}__${name}`;
      const cacheData = JSON.parse(window.localStorage.getItem(key));

      if (!cacheData) return null;

      // 如果数据过期了
      if (cacheData.expire && cacheData.timestamp + cacheData.expire < Date.now()) {
        // 如果设置了过期自动删除
        if (cacheData.autoRemove) window.localStorage.removeItem(key);
        console.warn(`${key}: 数据已过期`);
        return null;
      }
      // 如果需要完整数据
      if (full) return cacheData;
      return cacheData.data;
    } catch (e) {
      createError(e.message);
      throw e;
    }
  }

  /**
   * 删除缓存数据
   * @method
   * @param name {String} 用于保存缓存数据的key名
   * @returns {boolean|void}
   */
  remove (name) {
    if (!name) throw new TypeError('读取缓存时缺少 name 参数');

    try {
      const key = `__${this.namespace}__${name}`;
      window.localStorage.removeItem(key);
      return true;
    } catch (e) {
      createError(e.message);
      throw e;
    }
  }
}

function createError (message = '', data = {}, type = 'error') {
  if (process.env.NODE_ENV === 'development') {
    console.log('>>>>>> Error >>>>>>');
    console.error(message, data);
  }
  Message({ type, message });
}

export default Cache;
