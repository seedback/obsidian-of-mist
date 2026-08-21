import { Plugin } from "obsidian";
import { genericComponentProcessor } from "./ComponentProcessor";

import ThemeCard from "@components/themes/ThemeCard.vue";
import ThemeCollection from "@components/themes/ThemeCollection.vue";
import DangerProfileCollection from "@components/dangerProfile/DangerProfileCollection.vue";

import { Theme as ThemeModel } from "@model/Theme";
import { ThemeCollection as ThemeCollectionModel } from "@model/ThemeCollection";
import { DangerProfileCollection as DangerProfileCollectionModel } from "@model/DangerProfileCollection";


export function registerElements(plugin: Plugin) {
  const theme_processor = new genericComponentProcessor(
    plugin,
    ThemeCollection,
    ThemeCollectionModel,
    "Theme",
    true
  );
  plugin.registerMarkdownCodeBlockProcessor(
    "mist-theme",
    theme_processor.handler
  )

  const danger_profile_processor = new genericComponentProcessor(
    plugin,
    DangerProfileCollection,
    DangerProfileCollectionModel,
    "Danger Profile",
    true
  );
  plugin.registerMarkdownCodeBlockProcessor(
    "mist-danger-profile",
    danger_profile_processor.handler
  )
}
