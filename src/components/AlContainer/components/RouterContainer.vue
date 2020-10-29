<template>
  <keep-alive :include="cache">
    <router-view />
  </keep-alive>
</template>

<script>
export default {
  name: 'RouterContainer',
  computed: {
    cache () {
      return ['Home', 'Refresh'].concat(this.$store.state.page.cache);
    },
  },
};
</script>

<style scoped>

</style>
