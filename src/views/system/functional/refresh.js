export default {
  beforeRouteEnter (to, from, next) {
    next(vm => vm.$router.replace({ path: from.path, params: from.param, query: from.query }));
  },
  render: h => h(),
};
