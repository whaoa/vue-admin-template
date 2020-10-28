import { typeOf } from '@/utils/type';

/**
 * 将对象转为 querystring
 * @param params {Object} 需要处理的数据对象
 * @param baseUrl {String} 需要拼接的 baseUrl
 * @param encode {Boolean} 是否需要转义编码
 * @returns {string}
 */
export default function qs (params = {}, { baseUrl = '', encode = false } = {}) {
  let querystring = Object
    .keys(params)
    .filter(key => params[key])
    .sort()
    .map(key => {
      // 如果值为数组类型
      if (typeOf(params[key]) === 'Array') params[key].map(i => `${key}[]=${i}`).join('&');
      // 其他数据类型
      return `${key}=${params[key]}`;
    })
    .join('&');

  if (encode) querystring = encodeURIComponent(querystring);
  if (baseUrl) querystring = baseUrl + '?' + querystring;

  return querystring;
}
