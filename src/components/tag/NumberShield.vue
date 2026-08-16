<template>
  <span
    v-if="iconHtml"
    class="mist--number-shield"
    v-html="iconHtml"
  />
  <span class="mist--number-shield--number">{{ displayContent }}</span>
</template>

<script setup lang="ts">
import { getIcon } from 'obsidian';
import { computed } from 'vue';

const props = defineProps<{
  content: string;
}>();

const displayContent = computed(() => {
  if (!isNaN(Number(props.content))) {
    let num = Number(props.content);
    if (num < 0 && num > 9) {
      return 'x';
    }
    return props.content;
  }

  if (props.content == '-' || props.content == '~') {
    return '~';
  }
  if (props.content == 'x' || props.content == 'X') {
    return 'x';
  }
  return props.content;
});

const iconHtml = computed(() => {
  const icon = getIcon('shield');
  if (icon instanceof Element) {
    icon.addClass('mist--number-shield--svg');
    return icon.outerHTML;
  }

  if (typeof icon === 'string') {
    return icon;
  }

  return '';
});
</script>

<style lang="scss">
.mist {
  &--number-shield {
    display: inline-block;
    width: calc((var(--font-text-size) * var(--line-height-normal)) / 3);

    &--svg {
      margin-bottom: calc(
        ((var(--font-text-size) * var(--line-height-normal)) / 4) * -1
      );
      width: calc(var(--font-text-size) * var(--line-height-normal)) !important;
      height: calc(
        var(--font-text-size) * var(--line-height-normal)
      ) !important;
      stroke: rgb(var(--mist--limit-tag-background));
      fill: var(--mist--limit-tag-background);
    }

    &--number {
      display: inline-block;
      width: calc(((var(--font-text-size) * var(--line-height-normal)) / 2));
    }
  }
}
</style>
