<template>
  <span class="mist--danger-profile-custom-moves-container">
    <template
      v-for="(move, index) in custom_moves"
      :key="index"
    >
      <span>&bullet;</span>
      <span>
        <strong><parsed-text :content="move.title" />: </strong><parsed-text :content="move.description" />
      </span>
    </template>
  </span>
</template>

<script setup lang="ts">
import type { CustomMove } from '@/src/model/CustomMove';
import ParsedText from '@components/common/ParsedText.vue';

const props = withDefaults(
  defineProps<{
    custom_moves?: Array<CustomMove>;
  }>(),
  {
    custom_moves: () => [],
  },
);
</script>

<style lang="scss">
.mist--danger-profile-custom-moves {
  &-container {
    display: grid;
    grid-template-columns: 0.5em 1fr;
    color: black;
  }
}
</style>
