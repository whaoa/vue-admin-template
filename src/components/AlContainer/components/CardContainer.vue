<template>
  <div class="container-card" :style="{ margin: m }">
    <div v-if="$slots.header" ref="header" class="container-card__header">
      <slot name="header" />
    </div>
    <el-scrollbar>
      <div ref="body" class="container-card__body" :style="{ padding: p }">
        <slot />
      </div>
    </el-scrollbar>
    <div v-if="$slots.footer" ref="footer" class="container-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardContainer',
  props: {
    p: {
      type: String,
      default: '20px',
    },

    m: {
      type: String,
      default: '15px',
    },
  },
};
</script>

<style scoped>
  .container-card {
    background-color: #fff;
  }
</style>
