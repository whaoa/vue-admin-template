<template>
  <div v-if="!(route.meta || { hidden: false }).hidden">
    <!-- 如果是路由 -->
    <el-menu-item
      v-if="!children.length || route.meta.tabs || (route.meta || {}).showAsRoot"
      :key="route.name"
      :index="route.path"
      @click="menuClick(route)"
    >
      <i class="el-icon-menu" />
      <span slot="title">{{ (route.meta || { title: '未命名' }).title }}</span>
    </el-menu-item>
    <!-- 如果有子路由 -->
    <el-submenu v-else :key="route.name" :index="route.path">
      <template slot="title">
        <i class="el-icon-location" />
        <span slot="title">{{ (route.meta || { title: '未命名' }).title }}</span>
      </template>
      <menu-item v-for="child in children" :key="child.name" :route="child" />
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    route: {
      type: Object,
      required: true,
    },
  },
  computed: {
    children () {
      if (!this.route.children || !this.route.children.length) return [];
      return this.route.children.filter(i => !(i.meta || {}).hidden);
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
