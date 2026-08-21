<template>
  <span class="mist--danger-profile">
    <danger-profile-title
      :name="model?.name"
      :danger_ratings="model?.danger_rating"
      :is_mythos_power="model?.is_mythos_power"
    />
    <parsed-text
      :content="model?.description"
      class="mist--danger-profile-description"
    />
    <danger-profile-spectrums :spectrums="model?.spectrums" />
    <danger-profile-custom-moves-list :custom_moves="model?.custom_moves" />
    <hr
      v-if="
        (model?.custom_moves?.length ?? 0 > 0) &&
          ((model?.hard_moves?.length ?? 0 > 0) ||
            (model?.soft_moves?.length ?? 0 > 0))
      "
    >
    <danger-profile-mc-moves-list :mc_moves="model?.hard_moves" />
    <hr
      v-if="
        (model?.hard_moves?.length ?? 0 > 0) &&
          (model?.soft_moves?.length ?? 0 > 0)
      "
    >
    <danger-profile-mc-moves-list :mc_moves="model?.soft_moves" />
  </span>
</template>

<script setup lang="ts">
import type ObsidianOfMistPlugin from '@src/main';
import type { DangerProfile } from '@model/DangerProfile';
import { parseText, type ParsedTextToken } from '@utils/TextParser';
import type { MarkdownPostProcessorContext } from 'obsidian';
import { inject } from 'vue';
import MistTag from '@components/tag/MistTag.vue';
import DangerProfileTitle from './DangerProfileTitle.vue';
import ParsedText from '@components/common/ParsedText.vue';
import DangerProfileSpectrums from './DangerProfileSpectrums.vue';
import DangerProfileCustomMovesList from './DangerProfileCustomMovesList.vue';
import DangerProfileMcMovesList from './DangerProfileMcMovesList.vue';

const props = defineProps<{
  model?: DangerProfile;
}>();

console.log(props.model);
</script>

<style lang="scss">
@use '@styles/fonts/bebas-neue.scss';
.mist--danger-profile {
  display: flex;
  flex-direction: column;
  height: fit-content;
  padding: 0.5em;
  margin: 2px;
  background: #e6dcc1;
  font-size: var(--font-text-size);

  --corner-cutoff: 10px;
  /* Apply the polygon to cut all 4 corners */
  clip-path: polygon(
    /* Top edge: start after left cut, end before right cut */
    var(--corner-cutoff) 0,
    calc(100% - var(--corner-cutoff)) 0,

    /* Right edge: start after top cut, end before bottom cut */ 100%
      var(--corner-cutoff),
    100% calc(100% - var(--corner-cutoff)),
    /* Bottom edge: start after right cut, end before left cut */
    calc(100% - var(--corner-cutoff)) 100%,
    var(--corner-cutoff) 100%,

    /* Left edge: start after bottom cut, end before top cut */ 0
      calc(100% - var(--corner-cutoff)),
    0 var(--corner-cutoff)
  );

  &-description {
    color: black;
  }

  hr {
    margin: 0.1em 0.5em;
    border-top-width: 1px;
  }
}
</style>
