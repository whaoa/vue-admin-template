<template>
  <component :is="component" v-bind="$attrs">
    <template v-if="$slots.header" #header>
      <slot name="header" />
    </template>
    <slot />
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </component>
</template>

<script>
const containers = {
  full: () => import('./components/FullContainer'),
  ghost: () => import('./components/GhostContainer'),
  card: () => import('./components/CardContainer'),
  router: () => import('./components/RouterContainer'),
};

export default {
  name: 'AlContainer',

  props: {
    type: {
      type: String,
      default: 'card',
    },
  },

  computed: {
    // 始终返回渲染组件
    component () {
      return containers[this.type] || containers.card;
    },
  },
};
</script>
