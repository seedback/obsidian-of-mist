<template>
  <span class="mist--theme-collection">
    <template
      v-for="(theme, index) in model?.themes ?? []"
      :key="index"
    >
      <theme-card :model="theme" />
    </template>
  </span>
</template>

<script setup lang="ts">
import ThemeCard from './ThemeCard.vue';
import { ThemeCollection as ThemeCollectionModel } from '@/src/model/ThemeCollection.ts';
const props = defineProps<{
  model?: ThemeCollectionModel
}>();
</script>

<style lang="scss">
.mist--theme-collection{
  display: grid;
  grid-template-columns: 1fr 1fr;
  font-size: var(--font-text-size);
}
</style>
