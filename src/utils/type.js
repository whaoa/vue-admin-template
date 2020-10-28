/**
 * 获取数据类型
 * @param data {*}
 * @returns {string}
 */
export function typeOf (data) {
  return Object.prototype.toString.call(data).slice(8, -1);
}
