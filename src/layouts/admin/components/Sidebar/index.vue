<template>
  <div class="admin-layout-sidebar flex flex-column" :style="{ width: collapse ? '64px' : '180px' }">
    <div class="sidebar-header flex align-center justify-center py20">
      <p v-if="collapse">Title</p>
      <p v-else>Sidebar</p>
    </div>

    <div class="sidebar-menus flex-1 relative">
      <!-- 菜单数据 -->
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
          class="w-full"
          mode="vertical"
          :default-active="active"
          :collapse="collapse"
          :collapse-transition="false"
        >
          <menu-item v-for="item in menus" :key="item.name" :route="item" />
        </el-menu>
      </el-scrollbar>

      <!-- 折叠按钮 -->
      <div class="collapse flex align-center justify-center pointer" @click="collapse = !collapse">
        <div class="bgc" />
        <i :class="`arrow ft14 el-icon-arrow-${collapse ? 'right' : 'left'}`" />
      </div>
    </div>
  </div>
</template>

<script>
import MenuItem from './MenuItem';

export default {
  name: 'MainLayoutSidebar',
  components: { MenuItem },
  data () {
    return {
      collapse: false,
    };
  },

  computed: {
    menus () {
      return this.$store.getters.sidebarMenus;
    },

    active () {
      return (this.$route.meta || {}).activeMenuPath || this.$route.path;
    },
  },
};
</script>

<style scoped lang="scss">
  .admin-layout-sidebar {
    transition: width .28s;
  }

  .sidebar-header {
    background-color: #1b2336;
    color: #fafafa;
  }

  // 滚动条容器高度
  ::v-deep {
    .el-scrollbar {
      height: 100%;
    }

    .el-scrollbar__wrap {
      overflow-x: hidden !important;
    }
  }

  ::v-deep {
    .el-scrollbar__view {
      height: 100%;
    }
    .el-menu {
      height: 100%;
      background-color: #323952;
      color: #fff;
      border: none;
    }

    .el-menu--collapse {
      .el-submenu > .el-submenu__title > span,
      .el-submenu > .el-submenu__title > .el-submenu__icon-arrow, {
        display: none;
      }
    }

    .el-menu-item,
    .el-menu-item > i,
    .el-submenu__title,
    .el-submenu__title > i {
      color: #fff;
    }

    .el-menu-item, .el-submenu__title {
      &:focus {
        background-color: #323952;
      }
      &:hover {
        background-color: #2a3045;
      }
      &.is-active {
        background-color: #3779fb;
      }
    }
  }

  // 折叠按钮
  .collapse {
    height: 70px;
    color: #fff;
    opacity: 0.6;
    position: absolute;
    top: 0;
    bottom: 0;
    right: -14px;
    margin: auto;
    z-index: 2;

    .arrow {
      position: relative;
      z-index: 1;
    }

    .bgc {
      width: 0;
      height: 50px;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      border-left: 14px solid #323952;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      margin: auto;
    }
  }
</style>
