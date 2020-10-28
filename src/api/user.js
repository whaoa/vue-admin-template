import request from '@/plugins/request';

const API = {
  login: '/user/login',
};

// 用户相关请求
export const user = {
  /**
   * 用户登录
   * @param {String} username - 用户账号
   * @param {String} password - 登录密码
   * @returns {Promise}
   */
  login ({ username, password } = {}) {
    return request.post(API.login, { username, password });
  },
};

