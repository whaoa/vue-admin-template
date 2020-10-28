<template>
  <div class="container-ghost" :style="{ background: bg }">
    <div v-if="$slots.header" ref="header" class="container-ghost__header">
      <slot name="header" />
    </div>
    <el-scrollbar>
      <div ref="body" class="container-ghost__body">
        <slot />
      </div>
    </el-scrollbar>
    <div v-if="$slots.footer" ref="footer" class="container-ghost__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'GhostContainer',
  props: {
    bg: {
      type: String,
      default: 'transparent',
    },
  },
};
</script>

<style scoped>

</style>
