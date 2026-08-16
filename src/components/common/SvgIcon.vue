<template>
  <span
    v-if="iconHtml"
    class="mist--svg-icon"
    v-html="iconHtml"
  />
</template>

<script setup lang="ts">
import { getIcon } from 'obsidian';
import { computed } from 'vue';

const props = defineProps<{
  // icon_name must correspond with one from lucide.dev
  icon_name: string;
  stroke_width?: string;
  drop_shadow?: {
    offset_x: string;
    offset_y: string;
    css_color?: string;
    standard_deviation?: string;
  };
  fill_color?: string;
}>();

console.log("drop-shadow on icon", props.drop_shadow);

const iconHtml = computed(() => {
  const icon = getIcon(props.icon_name);

  if (icon instanceof Element) {
    icon.addClass('mist--icon--svg');

    const styles: string[] = [];
    if (props.stroke_width) {
      styles.push(`stroke-width: ${props.stroke_width};`);
    }
    if (props.drop_shadow) {
      const { offset_x, offset_y, standard_deviation, css_color } =
        props.drop_shadow;
      styles.push(
        `filter: drop-shadow(${offset_x} ${offset_y} ${standard_deviation ?? 0} ${css_color ?? 'black'});`,
      );
    }
    if(props.fill_color){
      styles.push(`fill: ${props.fill_color};`);
    }

    if (styles.length > 0) {
      icon.setAttribute('style', styles.join(' '));
    }

    iconFixes(icon);
    return icon.outerHTML;
  }

  if (typeof icon === 'string') {
    return icon;
  }

  return '';
});

const iconFixes = (icon: SVGSVGElement) => {
  // SVG paints in DOM order, so move the mouth path after the mask outline to keep it on top of any fill.
  if (props.icon_name === 'venetian-mask') {
    const firstPath = icon.querySelector('path');
    if (firstPath) {
      icon.appendChild(firstPath);
    }
  }
};
</script>

<style lang="scss">
.mist--svg-icon {
  display: inline-flex;
  width: var(--icon-size);
  height: var(--icon-size);
}
</style>
