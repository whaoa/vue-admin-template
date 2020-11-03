<template>
  <div class="admin-layout-wrapper flex">
    <sidebar />
    <div class="flex-1 flex flex-column overflow-hidden">
      <header-bar />
      <page-tab />
      <toolbar />
      <div class="container flex-1 flex flex-column">
        <transition name="fade-transverse">
          <al-container type="router" />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { Sidebar, HeaderBar, Toolbar, PageTab } from './components';

export default {
  name: 'AdminLayout',
  components: { Sidebar, HeaderBar, Toolbar, PageTab },
};
</script>

<style scoped lang="scss">
  .admin-layout-wrapper {
    width: 100%;
    height: 100%;
    min-width: 900px;
    overflow: hidden;
    position: relative;
  }
</style>
