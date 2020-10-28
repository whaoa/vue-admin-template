export default {
  beforeRouteEnter (to, from, next) {
    next(vm => vm.$router.replace({ path: to.path }));
  },
  render: h => h(),
};
