<template>
  <span class="mist-danger-profile-collection">
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

const props = defineProps<{
  model?: DangerProfileCollection;
}>();
</script>

<style lang="scss">
.mist-danger-profile-collection {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
}
</style>