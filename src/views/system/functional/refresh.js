export default {
  name: 'Refresh',
  beforeRouteEnter (to, from, next) {
    from.meta[`__stamp-${from.fullPath}`] = Date.now();
    next(vm => vm.$router.replace({ path: from.fullPath, meta: from.meta }));
  },
  render: h => h(),
};
