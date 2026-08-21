<template>
  <span class="mist--svg-icon-markable">
    <svg-icon
      :icon_name="icon_name"
      :stroke_width="icon_stroke_width"
      :drop_shadow="icon_drop_shadow"
      class="mist--svg-icon-markable-icon"
      :fill_color="icon_fill_color"
    />
    <svg-icon
      v-if="is_marked"
      :icon_name="marker_icon_name"
      :stroke_width="marker_stroke_width"
      :drop_shadow="marker_drop_shadow"
      class="mist--svg-icon-markable-marker"
      :style="{ transform: `translateY(${offset ?? '0px'})` }"
      :fill_color="marker_fill_color"
    />
  </span>
</template>

<script setup lang="ts">
import SvgIcon from './SvgIcon.vue';

const props = defineProps<{
  icon_name: string;
  icon_stroke_width?: string;
  icon_drop_shadow?: {
    offset_x: string;
    offset_y: string;
    css_color?: string;
    standard_deviation?: string;
  };
  icon_fill_color?: string;
  marker_icon_name: string;
  marker_stroke_width?: string;
  marker_drop_shadow?: {
    offset_x: string;
    offset_y: string;
    css_color?: string;
    standard_deviation?: string;
  };
  marker_fill_color?: string;
  is_marked?: boolean;
  offset?: string;
}>();
</script>

<style lang="scss">
.mist--svg-icon-markable {
  display: inline-grid;
  width: var(--icon-size);
  height: var(--icon-size);

  > * {
    grid-area: 1 / 1;
  }

  &-marker {
    z-index: 1;
    color: red;
    pointer-events: none;
  }
}
</style>
