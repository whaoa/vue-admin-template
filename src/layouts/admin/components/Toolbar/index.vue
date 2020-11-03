<template>
  <div class="admin-layout-toolbar flex align-center px20 py10">
    <!-- 操作按钮 -->
    <div class="button mr15">
      <span class="el-icon-back pointer" @click="back" />
      <span class="el-icon-refresh pointer" @click="refresh" />
    </div>
    <!-- 面包屑导航 -->
    <div class="breadcrumb flex align-center">
      <span class="ft14">当前位置：</span>
      <el-breadcrumb class="flex-1" separator="/">
        <el-breadcrumb-item
          v-for="item in route"
          :key="item.name"
        >{{ item.meta.title }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Toolbar',
  inject: ['refresh'],
  computed: {
    route () {
      return this.$route.matched.filter(i => {
        if (!i.meta || typeof i.meta.breadcrumb === 'undefined') return true;
        return i.meta.breadcrumb;
      });
    },
  },
  methods: {
    back () {},
  },
};
</script>

<style scoped lang="scss">
  .admin-layout-toolbar {
    background-color: #fff;
    box-shadow: inset 0px -2px 1px 0px rgba(0,0,0,.08);
  }
</style>
