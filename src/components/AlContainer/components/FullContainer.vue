<template>
  <div class="container-full" :style="{ background: bg }">
    <div v-if="$slots.header" ref="header" class="container-full__header">
      <slot name="header" />
    </div>
    <el-scrollbar>
      <div ref="body" class="container-full__body">
        <slot />
      </div>
    </el-scrollbar>
    <div v-if="$slots.footer" ref="footer" class="container-full__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FullContainer',
  props: {
    bg: {
      type: String,
      default: '#fff',
    },
  },
};
</script>

<style scoped>

</style>
