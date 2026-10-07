<script setup lang="ts">
const modelValue = defineModel<string>({ required: true })
</script>

<template>
  <input
    id="input"
    v-model="modelValue"
    v-bind="$attrs"
    type="text"
    class="w-full rounded-lg border border-gray-200 bg-transparent px-4 py-2 text-center outline-none transition-colors placeholder:opacity-50 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 dark:border-gray-700"
  />
</template>
