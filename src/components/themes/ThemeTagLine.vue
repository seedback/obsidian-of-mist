<template>
  <span :class="classes">
    <span class="mist--theme-tag-line-question">
      <span class="mist--theme-tag-line-question-letter">
        <slot name="question" />
      </span>
    </span>
    <span class="mist--theme-tag-line-text"><slot /></span>
    <span
      v-if="!no_burn"
      class="mist--theme-tag-line-burn"
    >
      <svg-icon-markable
        icon_name="flame"
        marker_icon_name="cross"
        :is_marked="is_burned"
        :icon_drop_shadow="{
          offset_x: '0',
          offset_y: '0',
          standard_deviation: '2px',
          css_color: 'rgb(var(--mist--theme-city-accent))',
        }"
        icon_fill_color="var(--mist--theme-city-icon-background-bright)"
        offset="2px"
      />
    </span>
  </span>
</template>
<script setup lang="ts">
import SvgIconMarkable from '@components/common/SvgIconMarkable.vue';
import { computed } from 'vue';
const props = defineProps<{
  is_burned?: boolean;
  is_odd?: boolean;
  no_burn?: boolean;
}>();

const classes = computed(() => [
  'mist--theme-tag-line',
  { odd: props.is_odd, "no-burn": props.no_burn },
]);
</script>
<style lang="scss">
@use '@styles/fonts/caveat.scss';
.mist--theme-tag-line {
  display: inline-grid;
  grid-template-columns: 1.5em 1fr 1.5em;
  width: 100%;
  background: var(--mist--theme-city-dashed-underline);
  font-size: var(--font-text-size);
  line-height: var(--h3-size);

  &.no-burn {
    grid-template-columns: 1.5em 1fr;
  }

  &.odd {
    background:
      var(--mist--theme-content-highlight-gradient),
      var(--mist--theme-city-dashed-underline);
  }

  &-question {
    border-right: 1px solid rgb(var(--mist--theme-city-accent) / 0.6);

    &-letter {
      position: relative;
      top: 0.15em;
      padding-left: 0.25em;
      font-family: 'Caveat', 'Labrada', sans-serif;
      font-size: var(--h3-size);
    }
  }

  &-text {
    position: relative;
    padding-left: 0.25em;
    font-family: 'Caveat', 'Labrada', sans-serif;
    font-size: var(--h3-size);
    top: 0.2em;
  }

  &-burn {
    display: inline-flex;
    padding-bottom: 0.2em;
    align-items: end;
    justify-content: center;

    & > span > svg {
      fill: var(--mist--theme-city-icon-background-bright);
    }
  }
}
</style>
