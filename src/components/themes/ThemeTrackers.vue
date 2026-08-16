<template>
  <template v-if="system == System.city">
    <span class="mist--theme-trackers">
      <span class="mist--theme-trackers-box-group up">
        <span class="mist--theme-trackers-box-wrapper up">
          <template
            v-for="i in num_improve_boxes"
            :key="i"
          >
            <theme-tracker-box
              :is_marked="i - 1 < (num_improve_boxes_marked ?? 0)"
              :is_last="i == num_improve_boxes"
            />
          </template>
        </span>
        <span class="mist--theme-trackers-box-text"> ATTENTION </span>
      </span>
      <span class="mist--theme-trackers-box-group down">
        <span class="mist--theme-trackers-box-wrapper down">
          <template
            v-for="i in num_decay_boxes"
            :key="i"
          >
            <theme-tracker-box
              :is_marked="i - 1 < (num_decay_boxes_marked ?? 0)"
              :is_last="i == num_improve_boxes"
              :is_down="true"
            />
          </template>
        </span>
        <span
          v-if="type != ThemeType.logos && type != ThemeType.mythos"
          class="mist--theme-trackers-box-text"
        >
          CRACK/FADE
        </span>
        <span
          v-if="type == ThemeType.logos"
          class="mist--theme-trackers-box-text"
        >
          CRACK
        </span>
        <span
          v-if="type == ThemeType.mythos"
          class="mist--theme-trackers-box-text"
        >
          FADE
        </span>
      </span>
    </span>
  </template>
</template>

<script setup lang="ts">
import { System, ThemeType } from '@src/types/types.ts';
import ThemeTrackerBox from './ThemeTrackerBox.vue';

const props = defineProps<{
  system: System;
  type?: ThemeType;
  improve?: number;
  decay?: number;
  milestone?: number;
  num_improve_boxes?: number;
  num_decay_boxes?: number;
  num_improve_boxes_marked?: number;
  num_decay_boxes_marked?: number;
}>();
</script>

<style lang="scss">
@use '@styles/fonts/bebas-neue.scss';
@use '@styles/fonts/fira-sans-extra-condensed.scss';
.mist--theme-trackers {
  display: flex;
  flex-direction: row;
  padding-left: 0.5em;
  width: 100%;
  font-size: var(--font-text-size);

  &-box {
    &-text {
      font-size: 0.4em;
      line-height: 8px;
      text-align: center;
      font-family: 'Fira Sans Extra Condensed', sans-serif;
    }

    &-group {
      display: flex;
      flex-direction: column;
      row-gap: 0.1em;
      margin: 0 5px;
    }

    &-wrapper {
      display: flex;
      flex-direction: row;
      padding-left: 2px;
      &.up {
        padding-top: 5px;
      }

      &.down {
        display: flex;
        flex-direction: row;
        padding-bottom: 5px;
      }
    }
  }
}
</style>
