<template>
  <span class="mist--danger-profile-spectrums">
    {{ content }}
    <!-- <template
      v-for="(spectrum, index) in spectrums"
      :key="index"
    >
      <span class="mist--danger-profile-spectrums-content">
        {{
          calculateContent(
            spectrum.text,
            spectrum.tier ?? 0,
            index < spectrums.length - 1,
          )
        }}
        &nbsp;
      </span>
    </template> -->
  </span>
</template>

<script setup lang="ts">
import type { Tag } from '@/src/model/Tag';
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    spectrums?: Array<Tag>;
  }>(),
  {
    spectrums: () => [],
  },
);

const calculateContent = (text: string, tier: number, has_slash: boolean) => {
  let str = text + ' ' + tier;
  if (has_slash) {
    str += ' /';
  }
  return str;
};

const content = computed(() => {
  let str = '';

  props.spectrums.forEach((spectrum, index) => {
    str += spectrum.text;
    str += " ";
    str += spectrum.tier;
    
    if (index < props.spectrums.length - 1) {
      str += " / "
    }
  });

  return str;
});
</script>

<style lang="scss">
.mist--danger-profile-spectrums {
  color: black;

  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.4em;
  font-weight: 400;
}
</style>
