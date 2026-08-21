<template>
  <span class="mist--danger-profile-mc-moves-container">
    <template
      v-for="(move, index) in mc_moves"
      :key="index"
    >
      <span>&bullet;</span>
      <span>
        <parsed-text :content="move" />
      </span>
    </template>
  </span>
</template>

<script setup lang="ts">
import ParsedText from '@components/common/ParsedText.vue';

const props = withDefaults(
  defineProps<{
    mc_moves?: Array<string>;
  }>(),
  {
    mc_moves: () => [],
  },
);
</script>

<style lang="scss">
.mist--danger-profile-mc-moves {
  &-container {
    display: grid;
    grid-template-columns: 0.5em 1fr;
    color: black;
  }
}
</style>