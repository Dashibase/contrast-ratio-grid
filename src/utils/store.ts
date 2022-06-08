import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface hslColor {
  hsl: number[];
  label: string;
}

export const useStore = defineStore(
  'main',
  () => {
    const foregrounds = ref([{
      label: 'Foreground 1',
      hsl: [0, 0, 25],
    }, {
      label: 'Foreground 2',
      hsl: [0, 0, 25],
    }] as hslColor[])
    const backgrounds = ref([{
      label: 'Background 1',
      hsl: [0, 0, 100],
    }] as hslColor[])
    return {
      foregrounds,
      backgrounds,
    }
  }, {
    persist: true,
  },
)
