<template>
  <div>
    <div class="icon pointer" @click="drawer = true"><i class="el-icon-s-tools" /></div>
    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :with-header="false"
      append-to-body
    >
      <div class="p20">
        <p class="ft20 text-bold py20">系统布局配置</p>
        <div class="py10">
          <!-- TODO: 过渡动画开关 -->
          <span>页面切换过渡动画: </span>
          <el-switch v-model="animation" active-text="开启" inactive-text="关闭" />
        </div>
        <div class="py10">
          <!-- TODO: Tabs标签页开关 -->
          <span>多标签页: </span>
          <el-switch v-model="tabs" active-text="开启" inactive-text="关闭" />
        </div>
        <div class="py10">
          <!-- TODO: 顶部菜单开关 -->
          <span>顶部菜单: </span>
          <el-switch v-model="headerMenus" active-text="开启" inactive-text="关闭" />
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: 'Settings',
  data () {
    return {
      drawer: false,
      animation: true,
      tabs: true,
      headerMenus: true,
    };
  },
};
</script>

<style scoped>
  .icon {
    width: 50px;
    height: 50px;
    background-color: #3D8CFF;
    color: #fff;
    font-size: 24px;
    line-height: 50px;
    text-align: center;
    border-radius: 5px 0 0 5px;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
</style>
