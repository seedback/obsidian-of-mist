<template>
  <span
    v-if="type == 'power'"
    :class="tag_classes"
  >
    <template v-if="is_edit_mode">==+</template>{{ label }}<template v-if="is_edit_mode">==</template>
  </span>
  <span
    v-if="type == 'weakness'"
    :class="tag_classes"
  >
    <template v-if="is_edit_mode">==-</template>{{ label }}<template v-if="is_edit_mode">==</template>
  </span>
  <span
    v-if="type == 'status'"
    :class="tag_classes"
  >
    <template v-if="is_edit_mode">==%</template>{{ label }}{{ status_tier ? status_tier_content : "" }}<template v-if="is_edit_mode">==</template>
  </span>
  <span
    v-if="type == 'limit'"
    :class="tag_classes"
  >
    <template v-if="is_edit_mode">==@</template>{{ label }}<number-shield
      v-if="limit_tier || status_tier"
      :content="limit_tier ?? status_tier ?? '0'"
    /><template v-if="is_edit_mode">==</template>
  </span>
  <span
    v-if="type == 'story'"
    :class="tag_classes"
  >
    <template v-if="is_edit_mode">==#</template>
    {{ label }}
    <template v-if="is_edit_mode">==</template>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import NumberShield from './NumberShield.vue';

type TagType = 'power' | 'weakness' | 'status' | 'limit' | 'story';

const props = defineProps<{
  is_edit_mode?: boolean;
  specifier: string;
  content: string;
  status_tier?: string;
  limit_tier?: string;
}>();

const type = computed<TagType>(() => {
  switch (props.specifier) {
    case '+':
      return 'power';
    case '-':
      return 'weakness';
    case '%':
      return 'status';
    case '@':
      return 'limit';
    case '#':
    default:
      return 'story';
  }
});

const tag_classes = computed(() => ['mist--tag', 'mist--tag--' + type.value]);

const status_tier_content = computed(() =>
  props.status_tier != '' ? `:${props.status_tier}` : '',
);

const label = computed(() => props.content);
</script>

<style lang="scss">
.mist--tag {
  display: inline;
  box-sizing: border-box;
  padding: 0 0.1em;

  &--power {
    background-color: var(--mist--power-tag-background);
  }

  &--weakness {
    background-color: var(--mist--weakness-tag-background);
  }

  &--status {
    background-color: var(--mist--status-tag-background);
  }

  &--limit {
    background-color: var(--mist--limit-tag-background);
  }

  &--story {
    background-color: var(--mist--story-tag-background);
  }
}
</style>
