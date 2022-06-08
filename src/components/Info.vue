<template>
  <div class="sm:sticky top-0 w-56 py-10 space-y-4 h-full">
    <div class="font-bold text-xl">Contrast Recommendations</div>
    <div class="space-y-2">
      <div class="font-semibold text-lg">For text</div>
      <div>
        <div><a href="https://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast" target="_blank"
            class="underline">WCAG 2.0 AA</a> requires a contrast ratio (CR) of at least</div>
        <ul class="list-disc list-inside">
          <li>3 for large
            <div class="hidden sm:inline relative group">
              <QuestionMarkCircleIcon class="w-4 inline -ml-1 mb-1" />
              <div class="absolute top-0 left-full text-sm w-48 bg-white p-2 shadow-lg opacity-0 group-hover:opacity-100 transition">
                At least 18 point (24px) or bold and 14 point (18px)
              </div>
            </div> text
          </li>
          <li>4.5 for normal text</li>
        </ul>
      </div>
      <div>
        <div><a href="https://www.w3.org/TR/WCAG20/#visual-audio-contrast7" target="_blank" class="underline">WCAG 2.0
            AAA</a> requires a CR of at least</div>
        <ul class="list-disc list-inside">
          <li>4.5 for large text
          </li>
          <li>7 for normal text</li>
        </ul>
      </div>
    </div>
    <div class="space-y-2">
      <div class="font-semibold text-lg">For GUI elements like borders</div>
      <div><a href="https://www.w3.org/TR/WCAG21/x1-4-11-non-text-contrast" target="_blank" class="underline">WCAG
          2.1</a> requires a CR of at least 3</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { QuestionMarkCircleIcon } from '@heroicons/vue/solid'
</script>
