<template>
  <span class="mist--theme-title">
    <span class="mist--theme-title-underline-container">
      <span class="mist--theme-title-underline">
        <span class="mist--theme-title-underline-background">Theme</span>
      </span>
      <span class="mist--theme-title-underline">
        <span class="mist--theme-title-underline-background">Title</span>
      </span>
    </span>
    <span class="mist--theme-title-text"><slot /></span>
  </span>
</template>

<script setup lang="ts"></script>

<style lang="scss">
@use '@styles/fonts/bebas-neue.scss';
.mist--theme-title {
  display: inline-flex;
  flex-direction: column;
  height: calc(var(--h1-size) * 2);
  width: 100%;
  padding: 0 0.3em;
  font-size: var(--font-text-size);

  &-text {
    position: relative;
    width: 100%;
    min-height: 2em;
    top: 0.1em;
    font-family: 'Caveat', 'Labrada', sans-serif;
    font-size: var(--h1-size);
    line-height: calc(1em + 1px);
    z-index: 100;
    overflow-y: hidden;
  }
  &-underline {
    display: flex;
    min-height: 1em;
    max-height: 1em;
    width: 100%;
    background: var(--mist--theme-city-dashed-underline);
    font-size: var(--h1-size);

    &-background {
      position: relative;
      font-family: 'Bebas Neue', sans-serif;
      color: rgb(255 255 255 / 0.4);
      top: -0.1em;
    }

    &-container {
      display: flex;
      flex-direction: column;
      height: 0;
      width: 100%;
      overflow: visible;
      margin-top: -0.15em;
    }
  }
}
</style>
