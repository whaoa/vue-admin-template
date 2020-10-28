function defaultState () {
  return {};
}

export default {
  namespaced: true,

  state: defaultState(),

  mutations: {
    // 重置 state
    REST_STATE (state) {
      Object.assign(state, defaultState());
    },
  },

  actions: {
    init () {},
  },
};
