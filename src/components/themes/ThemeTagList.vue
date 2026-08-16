<template>
  <span class="mist--theme-tag-list">
    <span class="mist--theme-tag-list-header">
      <h2 class="mist--theme-tag-list-header-title">
        <slot />
      </h2>
      <span
        v-if="!no_burn"
        class="mist--theme-tag-list-header-burn"
      >BURN</span>
    </span>
    <span class="mist--theme-tag-list-container">
      <template
        v-for="(tag, index) in tag_list"
        :key="index"
      >
        <theme-tag-line
          :is_burned="tag.burned"
          :is_odd="index % 2 == 0"
          :no_burn="no_burn"
        >
          {{ tag.text }}
          <template #question> {{ tag.question }} </template>
        </theme-tag-line>
      </template>
    </span>
  </span>
</template>
<script setup lang="ts">
import type { Tag } from '@/src/model/Tag.ts';
import ThemeTagLine from './ThemeTagLine.vue';
const props = defineProps<{
  tag_list?: Array<Tag>;
  no_burn?: boolean;
}>();
</script>

<style lang="scss">
@use '@styles/fonts/bebas-neue.scss';
@use '@styles/fonts/fira-sans-extra-condensed.scss';
.mist--theme-tag-list {
  display: inline-flex;
  flex-direction: column;
  padding: 0 0.3em;
  font-size: var(--font-text-size);

  &-header {
    display: inline-flex;
    flex-direction: row;
    justify-content: space-between;

    &-title {
      background: var(--mist--theme-title-highlight-gradient);
      font-family: 'Bebas Neue', sans-serif !important;
      margin: 0;
      padding-left: 0.1em;
      padding-top: 0.1em;
    }

    &-burn {
      padding-bottom: 0.3rem;
      font-size: 0.7em;
      line-height: 8px;
      text-align: center;
      font-family: 'Fira Sans Extra Condensed', sans-serif;
      align-self: self-end;
    }
  }
}
</style>
