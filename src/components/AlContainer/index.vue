<template>
  <router-container v-if="type === 'router'">
    <template v-if="$slots.header" #header>
      <slot name="header" />
    </template>
    <slot />
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </router-container>

  <full-container v-else-if="type === 'full'">
    <template v-if="$slots.header" #header>
      <slot name="header" />
    </template>
    <slot />
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </full-container>

  <ghost-container v-else-if="type === 'ghost'">
    <template v-if="$slots.header" #header>
      <slot name="header" />
    </template>
    <slot />
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </ghost-container>

  <card-container v-else>
    <template v-if="$slots.header" #header>
      <slot name="header" />
    </template>
    <slot />
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </card-container>
</template>

<script>
import FullContainer from '@/components/AlContainer/components/FullContainer';
import CardContainer from '@/components/AlContainer/components/CardContainer';
import RouterContainer from '@/components/AlContainer/components/RouterContainer';
import GhostContainer from '@/components/AlContainer/components/GhostContainer';

export default {
  name: 'AlContainer',

  components: {
    FullContainer,
    CardContainer,
    RouterContainer,
    GhostContainer,
  },

  props: {
    type: {
      type: String,
      default: 'card',
    },
  },
};
</script>
