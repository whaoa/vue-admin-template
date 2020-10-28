export default [
  {
    url: '/user/login',
    method: 'POST',
    response: (_, { mock, Random }) => {
      const phone = mock(/^1[3456789]\d{9}$/);
      return {
        data: {
          user_name: phone,
          id: mock('@id'),
          name: mock('@cname'),
          email: mock('@email'),
          avatar: Random.image('200x200', '#50B347', '#FFF', 'Mock.js'),
          phone,
          token: mock('@guid'),
          company: '石家庄市永佳房地产经纪有限公司',
          shop: mock('@county(true)'),
          account_auth: mock('@boolean'),
          login_date: Date.now(),
          city_id: 2,
          city_list: [
            { city_id: 2, city_title: '石家庄' },
          ],
        },
      };
    },
  },
];

