<script setup lang="ts">
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'

const props = withDefaults(defineProps<{open: boolean}>(), { open: false });

const { open } = toRefs(props);
const emit = defineEmits(['update:open']);
</script>

<template>
    <TransitionRoot :unmount="false" as="template" :show="open">
      <Dialog as="div" class="relative z-10" @close="emit('update:open', false)">
        <TransitionChild
          as="template"
          enter="ease-in-out duration-500"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in-out duration-500"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>
  
        <div class="fixed inset-0 overflow-hidden">
          <div class="absolute inset-0 overflow-hidden">
            <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <TransitionChild
                as="template"
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enter-from="translate-x-full"
                enter-to="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leave-from="translate-x-0"
                leave-to="translate-x-full"
              >
                <DialogPanel class="pointer-events-auto relative w-screen max-w-md">
                  
                  <div class="slide-content flex h-full flex-col overflow-y-scroll py-6 shadow-xl">
                    <div class="relative mt-6 flex-1 px-4 sm:px-6">
                      <slot></slot>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
</template>

<style scoped>
.slide-content {
  background-color: var(--bg-secondary);
}
</style>
