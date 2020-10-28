export default [
  {
    url: '/system/menus',
    method: 'GET',
    response: () => ({
      data: [
        {
          title: '工作台',
          name: 'workbench',
          menus: [
            {
              path: '/home',
              title: '首页概览',
              name: 'Home',
              icon: 'dashboard',
              is_show: true,
              actions: ['add', 'edit'],
            },
            {
              path: '/father',
              title: '测试',
              name: 'Father',
              icon: 'dashboard',
              is_show: true,
              children: [
                {
                  path: '/father/children1',
                  title: '测试1',
                  name: 'Children1',
                },
              ],
            },
            {
              path: '/father/children2',
              title: '测试2',
              name: 'Children2',
            },
          ],
        },
        {
          title: '系统设置',
          name: 'system_settings',
          link: 'https://www.baidu.com',
        },
      ],
    }),
  },
];