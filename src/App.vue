<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  provide () {
    return {
      refresh: async () => {
        console.log(this.$route.name);
        this.$store.commit('page/REMOVE_CACHE_PAGE', this.$route.name);
        console.log(JSON.stringify(this.$store.state.page.cache));
        await this.$nextTick();
        await this.$router.replace({ name: 'refresh' });
        console.log(JSON.stringify(this.$store.state.page.cache));
      },
    };
  },
};
</script>

<style lang="scss">
  @import "~@/styles/index.scss";
</style>
