<template>
  <template v-if="model?.system == System.city">
    <div class="mist--theme-border city">
      <div class="mist--theme city">
        <theme-header
          :type="model.type"
          :themebook="model.themebook"
        />
        <theme-title>{{ model.title }}</theme-title>
        <theme-trackers
          :system="model.system"
          :type="model.type"
          :num_improve_boxes="model.slow_and_steady ? 5 : 3"
          :num_improve_boxes_marked="model.improve"
          :num_decay_boxes="model.slow_and_steady ? 5 : 3"
          :num_decay_boxes_marked="model.decay"
        />
        <theme-identity>{{ model?.identity }}</theme-identity>
        <theme-tag-list
          v-if="tag_lists.power_tags.length > 0"
          :tag_list="tag_lists.power_tags"
        >
          Power Tags
        </theme-tag-list>
        <theme-tag-list
          v-if="tag_lists.weakness_tags.length > 0"
          :tag_list="tag_lists.weakness_tags"
          :no_burn="true"
        >
          Weakness Tags
        </theme-tag-list>
        <theme-tag-list
          v-if="tag_lists.story_tags.length > 0"
          :tag_list="tag_lists.story_tags"
        >
          Story Tags
        </theme-tag-list>
      </div>
    </div>
  </template>
  <template v-if="model?.system == System.otherscape">
    <div class="mist--theme otherscape">
      <div>{{ model?.type }}</div>
      <div>{{ model?.identity }}</div>
    </div>
  </template>
  <template v-if="model?.system == System.legend">
    <div class="mist--theme legend">
      <div>{{ model?.type }}</div>
      <div>{{ model?.identity }}</div>
    </div>
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Theme } from '@model/Theme';
import { System, TagType } from '@src/types/types';
import ThemeHeader from '@components/themes/ThemeHeader.vue';
import ThemeTitle from '@components/themes/ThemeTitle.vue';
import ThemeTrackers from '@components/themes/ThemeTrackers.vue';
import ThemeIdentity from '@components/themes/ThemeIdentity.vue';
import ThemeTagList from '@components/themes/ThemeTagList.vue';
import { Tag } from '@/src/model/Tag';

const props = defineProps<{
  model?: Theme;
}>();

const tag_lists = computed(() => {
  let power_tags: Array<Tag> = [];
  let weakness_tags: Array<Tag> = [];
  let story_tags: Array<Tag> = [];

  props.model?.tags?.forEach((tag) => {
    if (tag.type == TagType.power) {
      power_tags.push(tag);
    }
    if (tag.type == TagType.weakness) {
      weakness_tags.push(tag);
    }
    if (tag.type == TagType.story) {
      story_tags.push(tag);
    }
  });

  return {
    power_tags: power_tags,
    weakness_tags: weakness_tags,
    story_tags: story_tags,
  };
});
</script>

<style lang="scss">
.mist--theme {
  display: flex;
  flex-direction: column;
  row-gap: 0.5em;
  border-radius: var(--radius-s);
  width: 100%;

  &-border {
    height: fit-content;
    padding: 0.4em;
    border-radius: var(--radius-m);
    background-color: var(--mist--theme-city-border);
  }

  &.city {
    background: var(--mist--theme-city-background);
    color: var(--mist--theme-city-text);
  }
  &.otherscape {
    background: var(--mist--theme-otherscape-background);
  }
  &.legend {
    background: var(--mist--theme-legend-background);
  }
}
</style>
