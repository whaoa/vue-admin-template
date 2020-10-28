<template>
  <div>
    <template v-for="item in routes">
      <!-- 如果有子路由 -->
      <el-submenu v-if="item.children && item.children.length" :key="item.name" :index="item.name">
        <template slot="title">
          <i class="el-icon-location" />
          <span slot="title">{{ (item.meta || { title: '未命名' }).title }}</span>
        </template>
        <menu-item :routes="item.children" />
      </el-submenu>
      <!-- 如果是路由 -->
      <el-menu-item v-else :key="item.name" :index="item.name" @click="menuClick(item)">
        <i class="el-icon-menu" />
        <span slot="title">{{ (item.meta || { title: '未命名' }).title }}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    routes: {
      type: Array,
      required: true,
    },
  },
  methods: {
    menuClick (route) {
      if (route.link) window.open(route.link);
      else this.$router.push({ name: route.name });
    },
  },
};
</script>
