import { Plugin, type MarkdownPostProcessorContext } from 'obsidian';
import { createApp, type DefineComponent } from 'vue';

export class genericComponentProcessor {
  plugin: Plugin;
  component: DefineComponent<{}, {}, any>;
  model: any;
  component_name: string;
  edit_mode_safe: boolean;
  readonly handler = (
    source: string,
    el: HTMLElement,
    ctx: MarkdownPostProcessorContext,
  ) => this.postProcess(source, el, ctx);

  constructor(
    plugin: Plugin,
    component: DefineComponent<{}, {}, any>,
    model: any,
    component_name: string,
    edit_mode_safe: boolean = false,
  ) {
    this.plugin = plugin;
    this.component = component;
    this.model = model;
    this.component_name = component_name;
    this.edit_mode_safe = edit_mode_safe;
  }

  public postProcess(
    source: string,
    el: HTMLElement,
    ctx: MarkdownPostProcessorContext,
  ): void | Promise<any> {
    genericPostProcess(
      this.plugin,
      source,
      el,
      ctx,
      this.component,
      this.model,
      this.component_name,
      this.edit_mode_safe,
    );
  }
}

export function genericPostProcess(
  plugin: Plugin,
  source: string,
  el: HTMLElement,
  ctx: MarkdownPostProcessorContext,
  component: DefineComponent<{}, {}, any>,
  model: any,
  user_message_name: string,
  edit_mode_safe: boolean,
): void | Promise<any> {
  // Edit mode safe components don't have any interractive or otherwise
  // important elements outside the preview codeblock and thus don't need to
  // be indented
  let wrapper_class: string = edit_mode_safe
    ? 'mist--wrapper-edit-safe'
    : 'mist--wrapper';

  // Create a wrapper for the Vue component
  const vueWrapper = el.createEl('div', { cls: wrapper_class });
  try {
    // Create and mount Vue app directly
    let app: any;
    if (model) {
      app = createApp(component, {
        model: model.parseYaml(plugin, source),
      });
    } else {
      app = createApp(component);
    }
    app.provide('obsidianPlugin', plugin);
    app.provide('obsidianApp', plugin.app);
    app.provide('obsidianContext', ctx);
    app.mount(vueWrapper);

    // Store app instance for cleanup if needed
    (vueWrapper as any)._vueApp = app;
  } catch (error: unknown) {
    let userMessage =
      `The Obsidian of Mist plugin failed to load the ${user_message_name}.\n` +
      `Please correct the following error:\n\n`;

    if (error instanceof Error) {
      userMessage += error.message;
    } else {
      userMessage += String(error);
    }

    vueWrapper.createEl('div', { text: userMessage, cls: 'error-message' });
  }
}
