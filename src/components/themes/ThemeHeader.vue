<template>
  <span class="mist--theme-header city">
    <span class="mist--theme-header-type city">TYPE</span>
    <span class="mist--theme-header-name city">{{ themebook }}</span>
    <span class="mist--theme-header-icons city">
      <svg-icon-markable
        icon_name="venetian-mask"
        marker_icon_name="circle"
        marker_stroke_width="3px"
        :icon_fill_color="
          type == ThemeType.logos
            ? 'var(--color-accent)'
            : 'var(--mist--theme-city-icon-background)'
        "
        :is_marked="type == ThemeType.logos"
      />
      /<svg-icon-markable
        icon_name="zap"
        marker_icon_name="circle"
        marker_stroke_width="3px"
        :icon_fill_color="
          type == ThemeType.mythos
            ? 'var(--color-accent)'
            : 'var(--mist--theme-city-icon-background)'
        "
        :is_marked="type == ThemeType.mythos"
      />
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ThemeType } from '@src/types/types';
import SvgIcon from '@components/common/SvgIcon.vue';
import SvgIconMarkable from '@components/common/SvgIconMarkable.vue';

const props = defineProps<{
  type?: ThemeType;
  themebook?: string;
}>();

const icon_classes = (type: ThemeType) => {
  let classes = 'mist--theme-header-icon city';
  if (props.type == type) {
    classes += ' selected';
  }

  return classes;
};
</script>

<style lang="scss">
@use '@styles/fonts/bebas-neue.scss';
@use '@styles/fonts/caveat-brush.scss';
.mist--theme-header {
  --mist--theme-header-height: calc(
    var(--font-text-size) * var(--line-height-normal)
  );

  display: flex;
  align-items: center;
  background-color: rgb(var(--mist--theme-city-accent) / 0.2);
  height: var(--mist--theme-header-height);
  border-radius: var(--radius-s) var(--radius-s) 0 0;
  font-size: var(--font-text-size);

  &-type {
    &.city {
      display: flex;
      height: var(--mist--theme-header-height);
      align-items: center;
      padding: 0 0.5em;
      color: var(--mist--theme-city-background);
      background-color: rgb(var(--mist--theme-city-accent) / 0.5);
      font-family: 'Bebas Neue', sans-serif;
      font-weight: bold;
      font-size: 12px;
      letter-spacing: 0.025em;
      border-radius: var(--radius-s) 0 0 0;
    }
  }
  &-name {
    flex-grow: 1;
    position: relative;
    min-height: calc(12px * var(--line-height-normal));
    line-height: var(--line-height-normal);
    margin: 0 0.5em;
    background: var(--mist--theme-city-dashed-underline);
    line-height: 1;
    font-family: 'Caveat Brush', 'Labrada', sans-serif;
  }
  &-icons {
    &.city {
      display: flex;
      align-items: center;
      background-color: rgb(var(--mist--theme-city-accent) / 0.5);
      border-radius: 0 var(--radius-s) 0 0;
    }
  }
}
</style>
