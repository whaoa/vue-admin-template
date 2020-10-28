import request from '@/plugins/request';

const API = {
  menus: '/system/menus',
  options: '/system/options',
};

export const menus = {
  /**
   * 获取系统菜单
   * @returns {Promise}
   */
  get: () => request.get(API.menus),
};

export const options = {
  /**
   * 获取系统配置项
   * @param {String} type - 参数类型
   * @returns {Promise}
   */
  get ({ type } = {}) {
    return request.get(API.options, { params: { type } });
  },
};
