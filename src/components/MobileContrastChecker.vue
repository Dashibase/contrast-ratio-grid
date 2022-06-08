<template>
  <div>
  <div class="text-center font-semibold">View this on your desktop for the full grid experience</div>
    <div class="flex gap-2 grow p-10 w-max overflow-x-auto">
      <div class="flex flex-col gap-2">
        <div class="relative">
          <EmptyColorCard class="invisible pointer-events-none" />
        </div>
        <div v-for="bg, i in store.backgrounds.slice(0, 1)" class="flex gap-1">
          <ColorCard :modelValue="bg.hsl" label="Background" @update:modelValue="value => store.backgrounds[i].hsl = value"
            @delete="store.backgrounds.splice(i, 1)" :disableOptions="true" />
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <div class="flex gap-2">
          <div v-for="fg, i in store.foregrounds.slice(0, 1)" class="flex flex-col gap-1">
            <ColorCard :modelValue="fg.hsl" label="Foreground" @update:modelValue="value => store.foregrounds[i].hsl = value"
              @delete="store.foregrounds.splice(i, 1)" :disableOptions="true" />
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <div v-for="bg in store.backgrounds.slice(0, 1)" class="flex gap-2">
            <ContrastCard v-for="fg in store.foregrounds.slice(0, 1)" :background="bg.hsl" :foreground="fg.hsl" />
          </div>
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
</script>
