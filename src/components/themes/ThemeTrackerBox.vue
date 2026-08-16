<template>
  <span :class="classes">
    <svg-icon
      v-if="is_marked"
      icon_name="x"
      stroke_width="2px"
      class="mist--theme-tracker-box-marker city"
    />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import SvgIcon from '@components/common/SvgIcon.vue';

const props = defineProps<{
  is_down?: boolean;
  is_marked?: boolean;
  is_last?: boolean;
}>();

const classes = computed(() => [
  'mist--theme-tracker-box',
  {
    up: !props.is_down,
    down: props.is_down,
    marked: props.is_marked,
    last: props.is_last,
  },
]);
</script>

<style lang="scss">
.mist--theme-tracker-box {
  display: inline-block;
  height: 10px;
  width: 14px;
  position: relative;
  margin-left: -2px;
  border: 2px solid var(--mist--theme-city-tracker-color);
  border-right: 2px solid transparent;
  background: var(--mist--theme-city-icon-background-bright);

  &-marker {
    width: 0;
    color: red;
    overflow: visible;

    & > svg {
      position: absolute;
      margin-top: calc((var(--icon-size) / 4 * -1) - 1px);
      margin-left: calc((1px + (var(--icon-size) / 4) * -1) - 1px);
    }
  }

  &.last {
    border-right: 2px solid var(--mist--theme-city-tracker-color);
  }

  &::before {
    content: '';
    position: absolute;
    height: 5px;
    width: 7px;
    left: -2px;
  }

  &::after {
    content: '';
    position: absolute;
    height: 5px;
    width: 7px;
    left: 5px;
  }

  &.up {
    border-top: none;

    &::before {
      top: -5px;
      background: linear-gradient(
        to bottom right,
        transparent calc(50% - 1.5px),
        var(--mist--theme-city-tracker-color) 50%,
        var(--mist--theme-city-icon-background-bright) calc(50% + 1.5px)
      );
    }

    &::after {
      top: -5px;
      background: linear-gradient(
        to bottom left,
        transparent calc(50% - 1.5px),
        var(--mist--theme-city-tracker-color) 50%,
        var(--mist--theme-city-icon-background-bright) calc(50% + 1.5px)
      );
    }
  }

  &.down {
    border-bottom: none;

    &::before {

      bottom: -5px;
      background: linear-gradient(
        to top right,
        transparent calc(50% - 1.5px),
        var(--mist--theme-city-tracker-color) 50%,
        var(--mist--theme-city-icon-background-bright) calc(50% + 1.5px)
      );
    }

    &::after {
      bottom: -5px;
      background: linear-gradient(
        to top left,
        transparent calc(50% - 1.5px),
        var(--mist--theme-city-tracker-color) 50%,
        var(--mist--theme-city-icon-background-bright) calc(50% + 1.5px)
      );
    }
  }
}
</style>
