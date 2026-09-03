<template>
  <span :class="classes">
    <template
      v-for="(profile, index) in model?.danger_profiles"
      :key="index"
    >
      <danger-profile :model="profile" />
    </template>
  </span>
</template>

<script setup lang="ts">
import type { DangerProfileCollection } from '@/src/model/DangerProfileCollection';
import DangerProfile from './DangerProfile.vue';
import { computed } from 'vue';

const props = defineProps<{
  model?: DangerProfileCollection;
}>();

const classes = computed(() => [
  "mist-danger-profile-collection",
  {
    "mist-danger-profile-collection-single": (props.model?.danger_profiles?.length ?? 0) <= 1,
  }
])
</script>

<style lang="scss">
.mist-danger-profile-collection {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  &-single {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>