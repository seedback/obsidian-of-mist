<template>
  <span v-if="obsidianPlugin && obsidianContext">
    <template
      v-for="(token, index) in parseText(
        obsidianPlugin,
        content ?? '',
        obsidianContext.sourcePath,
      )"
      :key="index"
    >
      <span v-if="token.type == 'text'">{{ token.text }}</span>
      <mist-tag
        v-if="token.type == 'power'"
        specifier="+"
        :content="token.text"
      />
      <mist-tag
        v-if="token.type == 'weakness'"
        specifier="-"
        :content="token.text"
      />
      <mist-tag
        v-if="token.type == 'status'"
        specifier="%"
        :content="token.text"
      />
      <mist-tag
        v-if="token.type == 'limit'"
        specifier="@"
        :content="token.text"
      />
      <mist-tag
        v-if="token.type == 'story'"
        specifier="#"
        :content="token.text"
      />
      <span
        v-if="token.type == 'wikilink'"
        class="cm-hmd-internal-link"
      >
        <a
          v-if="token.resolvedLink"
          :href="token.resolvedPath"
          class="internal-link mist--danger-profile-title-link"
        >{{ token.alias ?? token.text }}</a>
        <a
          v-else
          class="internal-link is-unresolved"
        >{{ token.text }}</a>
      </span>
    </template>
  </span>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import type { MarkdownPostProcessorContext } from 'obsidian';
import type ObsidianOfMistPlugin from '@src/main';
import { parseText } from '@utils/TextParser';
import MistTag from '@components/tag/MistTag.vue';

const props = withDefaults(
  defineProps<{
    content?: string;
  }>(),
  {
    content: '',
  },
);

const obsidianPlugin = inject<ObsidianOfMistPlugin>('obsidianPlugin');
const obsidianContext = inject<MarkdownPostProcessorContext>('obsidianContext');
</script>

<style lang="scss"></style>
