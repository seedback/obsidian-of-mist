import { Plugin } from "obsidian";
import { genericComponentProcessor } from "./ComponentProcessor";

import ThemeCard from "@components/themes/ThemeCard.vue";

import { Theme as ThemeModel } from "@model/Theme";
import { ThemeCollection as ThemeCollectionModel } from "@model/themeCollection";
import ThemeCollection from "@components/themes/ThemeCollection.vue";

export function registerElements(plugin: Plugin) {
  const story_theme_processor = new genericComponentProcessor(
    plugin,
    ThemeCard,
    ThemeModel,
    "Story Theme",
    true
  );
  plugin.registerMarkdownCodeBlockProcessor(
    "mist-story-theme",
    story_theme_processor.handler
  )

  const theme_collection_processor = new genericComponentProcessor(
    plugin,
    ThemeCollection,
    ThemeCollectionModel,
    "Theme Collection",
    true
  );
  plugin.registerMarkdownCodeBlockProcessor(
    "mist-theme-collection",
    theme_collection_processor.handler
  )
}
