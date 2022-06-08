<template>
  <div class="sm:sticky top-0 h-[30rem] max-w-xs py-10 flex flex-col gap-4">
    <div class="flex-1 h-1/2 flex flex-col">
      <div class="flex gap-2">
        <div class="font-bold text-xl">{{ copiedForeground ? 'Copied!' : 'Foregrounds' }}</div>
        <DuplicateIcon class="w-4 cursor-pointer" @click="copyForeground" />
      </div>
      <textarea :value="foregroundHexes" readonly class="grow border rounded-lg p-1" style="resize: none" />
    </div>
    <div class="flex-1 h-1/2 flex flex-col">
      <div class="flex gap-2">
        <div class="font-bold text-xl">{{ copiedBackground ? 'Copied!' : 'Backgrounds' }}</div>
        <DuplicateIcon class="w-4 cursor-pointer" @click="copyBackground" />
      </div>
      <textarea :value="backgroundHexes" readonly class="grow border rounded-lg p-1" style="resize: none" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import convert from 'color-convert'
import { DuplicateIcon } from '@heroicons/vue/outline'
import { useStore } from '@/utils/store'
import { copyToClipboard } from '@/utils/utils'

const store = useStore()

const copiedForeground = ref(false)
const foregroundHexes = computed({
  get () {
    return JSON.stringify(store.foregrounds.map(fg => {
      return [fg.label, '#' + convert.hsl.hex(fg.hsl)]
    }).reduce((a, v) => ({ ...a, [v[0]]: v[1]}), {}), null, 2)
  }
})
function copyForeground () {
  copyToClipboard(foregroundHexes.value)
  copiedForeground.value = true
  setTimeout(() => copiedForeground.value = false, 1000)
}

const copiedBackground = ref(false)
const backgroundHexes = computed({
  get () {
    return JSON.stringify(store.backgrounds.map(bg => {
      return [bg.label, '#' + convert.hsl.hex(bg.hsl)]
    }).reduce((a, v) => ({ ...a, [v[0]]: v[1]}), {}), null, 2)
  }
})
function copyBackground () {
  copyToClipboard(backgroundHexes.value)
  copiedBackground.value = true
  setTimeout(() => copiedBackground.value = false, 1000)
}
</script>
