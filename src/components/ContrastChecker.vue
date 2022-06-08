<template>
  <div class="flex gap-2 grow px-20 py-10 w-max overflow-x-auto">
    <div class="flex flex-col gap-2">
      <div class="relative" @click="reset">
        <EmptyColorCard class="invisible pointer-events-none" />
        <div class="absolute top-0 right-0 w-full h-full flex items-center justify-center cursor-pointer hover:shadow-lg transition-all duration-300">
          <RefreshIcon class="w-10" />
        </div>
      </div>
      <div v-for="bg, i in store.backgrounds" class="flex gap-1">
        <ColorCard :modelValue="bg.hsl" :label="bg.label" @update:modelValue="value => store.backgrounds[i].hsl = value"
          @delete="store.backgrounds.splice(i, 1)" />
      </div>
      <div class="flex justify-end">
        <EmptyColorCard @click="addBackground" />
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <div class="flex gap-2">
        <div v-for="fg, i in store.foregrounds" class="flex flex-col gap-1">
          <ColorCard :modelValue="fg.hsl" :label="fg.label" @update:modelValue="value => store.foregrounds[i].hsl = value"
            @delete="store.foregrounds.splice(i, 1)" />
        </div>
        <div class="flex items-end">
          <EmptyColorCard @click="addForeground" />
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <div v-for="bg in store.backgrounds" class="flex gap-2">
          <ContrastCard v-for="fg in store.foregrounds" :background="bg.hsl" :foreground="fg.hsl" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RefreshIcon } from '@heroicons/vue/outline'
import { useStore } from '@/utils/store'
import ColorCard from './ColorCard.vue'
import EmptyColorCard from './EmptyColorCard.vue'
import ContrastCard from './ContrastCard.vue'

const store = useStore()

function reset() {
  store.backgrounds = [{
    label: 'Background 1',
    hsl: [0, 0, 100],
  }]
  store.foregrounds = [{
    label: 'Foreground 1',
    hsl: [0, 0, 25],
  }, {
    label: 'Foreground 2',
    hsl: [0, 0, 25],
  }]
}
function addBackground() {
  let newLabel = `Background ${store.backgrounds.length + 1}`
  let i = 0
  while (store.backgrounds.map(bg => bg.label).includes(newLabel)) {
    i += 1
    newLabel = `Background ${store.backgrounds.length + 1 + i}`
  }
  store.backgrounds.push({
    label: newLabel,
    hsl: [0, 0, 100],
  })
}
function addForeground() {
  let newLabel = `Foreground ${store.foregrounds.length + 1}`
  let i = 0
  while (store.foregrounds.map(bg => bg.label).includes(newLabel)) {
    i += 1
    newLabel = `Foreground ${store.foregrounds.length + 1 + i}`
  }
  store.foregrounds.push({
    label: newLabel,
    hsl: [0, 0, 25],
  })
}
</script>
