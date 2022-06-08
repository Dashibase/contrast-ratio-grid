<template>
  <div class="relative w-28 h-48 shadow-lg rounded-lg flex flex-col">
    <div
      :style="{ background: '#' + convert.hsl.hex(props.background), color: '#' + convert.hsl.hex(props.foreground) }"
      class="h-28 h-28 rounded-t-lg flex justify-center items-center cursor-pointer" @click="textMode = !textMode"
      title="Click to toggle text/box mode">
      <div v-if="textMode" class="p-2 text-center">
        {{ props.text }}
      </div>
      <div v-if="!textMode" class="w-16 h-16 rounded"
        :style="{ background: '#' + convert.hsl.hex(props.foreground) }" />
    </div>
    <div class="flex justify-center items-center grow rounded-b-lg" :class="contrastRatio < 3 ? 'bg-red-700' : ''">
      <div class="truncate" title="Contrast ratio"
        :class="[contrastRatio < 3 ? 'text-white font-medium' : '', contrastRatio >= 3 && contrastRatio < 4.5 ? 'text-red-700' : '', contrastRatio >= 4.5 && contrastRatio < 7 ? 'text-yellow-700' : '', contrastRatio >= 7 ? 'text-green-700' : '']">
        {{ contrastRatio.toFixed(2) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import luminance from 'relative-luminance'
import convert from 'color-convert'

const props = defineProps({
  foreground: {
    type: Object as PropType<number[]>,
    default: [0, 100, 50],
  },
  background: {
    type: Object as PropType<number[]>,
    default: [0, 100, 50],
  },
  text: {
    type: String,
    default: 'Lorem ipsum',
  }
})

const textMode = ref(true)

function getContrastRatio(rgb1, rgb2) {
  const ratio = (luminance(rgb1) + 0.05) / (luminance(rgb2) + 0.05)
  if (ratio < 1) return 1 / ratio
  return ratio
}

const contrastRatio = computed(() => {
  return getContrastRatio(convert.hsl.rgb(props.foreground), convert.hsl.rgb(props.background))
})
</script>
