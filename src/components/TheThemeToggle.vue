<template>
  <button class="icon-btn" type="button" aria-label="切换主题" title="切换主题" @click="toggleDark()">
    <div class="i-carbon-moon text-lg dark:hidden" />
    <div class="hidden i-carbon-sun text-lg dark:block" />
  </button>
</template>
