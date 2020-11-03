<template>
  <div class="admin-layout-header pr15 flex align-center relative">
    <!-- 顶部导航 -->
    <el-menu class="flex-1" mode="horizontal" :default-active="$route.matched[0].name">
      <el-menu-item v-for="(item, index) in menus" :key="item.name" :index="item.name" @click="handleMenuSelect(item, index)">
        {{ item.title }}
      </el-menu-item>
    </el-menu>
    <!-- 个人中心 -->
    <div>
      <el-dropdown trigger="click">
        <el-avatar class="pointer" size="medium">user</el-avatar>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainLayoutHeaderBar',
  props: {
    sidebarState: {
      type: Boolean,
    },
  },
  computed: {
    menus() {
      return this.$store.state.router.raw.map(i => ({ name: i.name, title: i.title, link: i.link }));
    },
    active () {
      return this.$route.matched[0].name;
    },
  },
  methods: {
    handleMenuSelect (route, index) {
      // 如果是外链
      if (route.link) return window.open(route.link);
      // 如果是切换菜单
      if (this.$store.state.routes.index === index) return;
      this.$store.dispatch('page/closeWithType', { type: 'all' });
      this.$store.dispatch('router/switchMenu', index);
    },
    logout () {
      this.$store.dispatch('user/logout');
    },
  },
};
</script>

<style scoped lang="scss">
  .admin-layout-header {
    height: 60px;
    background: #1b2336;
  }

  .el-menu {
    border: none;
    background-color: #1b2336;
    color: #fff;

    ::v-deep {
      .el-menu-item {
        color: #fff;
        border-bottom: none;

        &:hover,
        &:focus {
          background-color: #101521;
          color: #fff;
        }

        &.is-active {
          background-color: #101521;
          color: #fff;
          border-bottom: none;
        }
      }
    }
  }

  .icon-collapse {
    color: #333;
  }
</style>
