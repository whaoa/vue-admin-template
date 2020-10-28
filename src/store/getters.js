export default {
  // 用户登录信息
  user: state => state.user.info,
  // 用户 token
  token: state => state.user.info.token,
  // 侧边栏菜单
  sidebarMenus (state) {
    return (state.routes.routes[state.routes.active || 0] || { children: [] }).children;
  },
};
