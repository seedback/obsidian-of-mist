<template>
  <span
    v-if="obsidianPlugin && obsidianContext"
    class="mist--danger-profile-title"
  >
    <parsed-text :content="name" />
    <span class="mist--danger-profile-title-star-container">
      <template
        v-for="(danger_rating, index) in danger_ratings"
        :key="index"
      >
        <template v-if="is_mythos_power">+</template>
        <template
          v-for="rating in danger_rating"
          :key="rating"
        >
          <svg-icon
            icon_name="star"
            class="mist--danger-profile-title-star"
            fill_color="black"
          />
        </template>
        <template v-if="index < danger_ratings.length - 1"> /&nbsp;</template>
      </template>
    </span>
  </span>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import type { MarkdownPostProcessorContext } from 'obsidian';
import type ObsidianOfMistPlugin from '@src/main';

import SvgIcon from '@components/common/SvgIcon.vue';
import ParsedText from '@components/common/ParsedText.vue';

const props = withDefaults(
  defineProps<{
    name?: string;
    danger_ratings?: Array<number>;
    is_mythos_power?: boolean;
  }>(),
  {
    name: '',
    danger_ratings: () => [],
  },
);

console.log('danger-ratings', props.danger_ratings);

const obsidianPlugin = inject<ObsidianOfMistPlugin>('obsidianPlugin');
const obsidianContext = inject<MarkdownPostProcessorContext>('obsidianContext');
</script>

<style lang="scss">
.mist--danger-profile-title {
  width: fit-content;
  color: black;
  border-bottom: 3px solid black;
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.65em;
  font-weight: 800;
  text-transform: uppercase;
  line-height: 1;
  

  &-link {
    text-decoration: none !important;
  }

  &-star {
    

    &-container {
      margin-left: 0.25em;
    }
  }
}
</style>
