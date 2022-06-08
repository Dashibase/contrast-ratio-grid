<template>
  <div class="container px-4 pt-24 pb-32 mx-auto flex flex-col gap-16 divide-y sm:pt-44 sm:py-60 min-h-screen">
    <div class="flex flex-col gap-6">
      <h1 class="text-4xl sm:text-6xl font-bold leading-none">
        <span class="text-neutral-900 sm:tracking-wide">Contrast Ratio Grid</span>
      </h1>
      <p class="text-xl text-neutral-500 sm:tracking-wide">
        Check contrast ratios across a range of foregrounds and backgrounds.
      </p>
    </div>
    <div class="grow flex flex-col sm:flex-row text-neutral-700">
      <Info />
      <MobileContrastChecker class="sm:hidden" />
      <ContrastChecker class="hidden sm:flex" />
      <Code class="hidden lg:flex" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Info from './Info.vue'
import MobileContrastChecker from './MobileContrastChecker.vue'
import ContrastChecker from './ContrastChecker.vue'
import Code from './Code.vue'
</script>
