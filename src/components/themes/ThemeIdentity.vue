<template>
  <span class="mist--theme-identity city">
    <h3 class="mist--theme-identity-title city">Mystery/Identity</h3>
    <span>
      <span class="mist--theme-identity-text">
        <slot />
      </span>
    </span>
  </span>
</template>

<script setup lang="ts"></script>

<style lang="scss">
@use '@styles/fonts/bebas-neue.scss';
@use '@styles/fonts/caveat.scss';
.mist--theme-identity {
  display: inline-flex;
  flex-direction: column;
  padding: 0 0.3em;
  font-size: var(--font-text-size);

  &-title {
    background: var(--mist--theme-title-highlight-gradient);
    font-family: 'Bebas Neue', sans-serif !important;
    margin: 0;
    padding-left: 0.1em;
    padding-top: 0.1em;
  }

  &-text {
    display: inline-block;
    position: relative;
    width: 100%;
    min-height: 2em;
    font-family: 'Caveat', 'Labrada', sans-serif;
    line-height: 1em;
    font-size: var(--h3-size);
    background: var(--mist--theme-content-highlight-gradient);
  }

  &-text {
    position: relative;
    display: block;
    width: 100%;
    min-height: 2em;
    background: var(--mist--theme-content-highlight-gradient);
    font-family: 'Caveat', 'Labrada', sans-serif;
    line-height: 1em;
    font-size: var(--h3-size);
    isolation: isolate;

    &::after {
      content: '';
      position: absolute;
      margin-top: 1px;
      inset: 0;
      z-index: 0;
      pointer-events: none;

      background-image: var(
        --mist--theme-city-dashed-underline-background-image
      );

      mask-image: repeating-linear-gradient(
        to bottom,
        transparent 0,
        transparent calc(1lh - var(--mist--theme-dashed-underline-thickness)),
        black calc(1lh - var(--mist--theme-dashed-underline-thickness)),
        black 1lh
      );
    }
  }
}
</style>
