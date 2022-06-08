<template>
  <div class="relative shadow-lg w-28 h-48 rounded-lg">
    <Popover class="relative">
      <PopoverButton>
        <div class="w-28 h-28 rounded-t-lg" :style="{ background: hex, }" />
        <DuplicateIcon v-if="!props.disableOptions" class="absolute top-2 left-2 w-5 opacity-10 hover:opacity-100 transition duration-300"
          :class="props.modelValue[2] > 50 ? 'text-black' : 'text-white'" @click="copy" />
        <XIcon v-if="!props.disableOptions" class="absolute top-2 right-2 w-5 opacity-10 hover:opacity-100 transition duration-300"
          :class="[props.modelValue[2] > 50 ? 'text-black' : 'text-white', props.modelValue[2] > 50 ? 'text-black' : 'text-white']" @click="deleteColor" />
      </PopoverButton>
      <PopoverPanel class="absolute left-full translate-x-2 top-0 z-10">
        <div class="rounded-lg shadow-lg">
          <ColorPicker class="w-48 rounded-lg" :color="hex" @colorChange="hex = $event.colors.hex.slice(0, 7)"
            default-format="hex" alpha-channel="hide">
            <template #copy-button>
              <DuplicateIcon class="w-4" />
            </template>
            <template #format-switch-button>
              <SwitchVerticalIcon class="w-4 text-neutral-700" />
            </template>
          </ColorPicker>
        </div>
      </PopoverPanel>
    </Popover>
    <div class="w-28 -mt-1.5 relative h-20 rounded-b-lg overflow-hidden">
      <input type="text"
        class="pt-1 mx-auto max-w-full text-center uppercase transition border border-transparent hover:border-neutral-300 rounded font-semibold cursor-pointer"
        :class="copied ? 'opacity-0' : 'opacity-100'" :value="hex" @input="updateHex" />
      <p class="absolute top-0 py-1 mx-auto w-full max-w-full text-center uppercase transition pointer-events-none"
        :class="copied ? 'opacity-100' : 'opacity-0'">#Copied</p>
      <div>
        <input type="text" class="px-1 max-w-full text-center border border-transparent truncate hover:border-neutral-300 rounded cursor-pointer" :value="props.label" />
        <input type="range" class="pt-1 px-1 max-w-full cursor-pointer" :value="lum" @input="lum = $event.target.value" min="0"
          max="100" title="Lightness" />
      </div>
    </div>
  </div>

</template>

<style>
button.vacp-copy-button {
  background: rgb(61, 61, 61);
}

.vacp-copy-button:enabled:not(:hover) svg {
  display: block;
}
</style>

<script setup lang="ts">
import { ref, computed, onMounted, PropType } from 'vue'
import { ColorPicker } from 'vue-accessible-color-picker'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { DuplicateIcon, SwitchVerticalIcon } from '@heroicons/vue/outline'
import { XIcon } from '@heroicons/vue/solid'
import convert from 'color-convert'
import { copyToClipboard } from '@/utils/utils'

const props = defineProps({
  modelValue: {
    type: Object as PropType<number[]>,
    default: [0, 100, 50],
  },
  label: {
    type: String,
    default: 'My Color',
  },
  disableOptions: {
    type: Boolean,
    default: false,
  }
})
const emit = defineEmits(['update:modelValue', 'delete'])

const hex = computed({
  get() {
    return '#' + convert.hsl.hex(props.modelValue)
  },
  set(hex) {
    emit('update:modelValue', convert.hex.hsl.raw(hex))
  }
})

const lum = computed({
  get() {
    return props.modelValue[2]
  },
  set(newLum) {
    const hsl = props.modelValue
    hsl[2] = newLum
    emit('update:modelValue', hsl)
  },
})

function updateHex (event:Event) {
  if (event.target.value.startsWith('#') && event.target.value.length < 7) return
  else if (event.target.value.length < 6) return
  else hex.value = event.target.value
}

const copied = ref(false)
function copy(event: Event) {
  event.stopPropagation()
  copyToClipboard(hex.value)
  copied.value = true
  setTimeout(() => copied.value = false, 1000)
}

function deleteColor(event: Event) {
  event.stopPropagation
  emit('delete')
}
</script>