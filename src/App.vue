<script setup lang="ts">
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'Vitesse',
  // unhead v2 服务端默认注入 lang="en"，这里显式覆盖
  htmlAttrs: {
    lang: 'zh-CN',
  },
  meta: [
    {
      name: 'description',
      content: 'Opinionated Vite Starter Template',
    },
    {
      name: 'theme-color',
      content: () => (isDark.value ? '#121212' : '#ffffff'),
    },
  ],
})
</script>

<template>
  <TheThemeToggle class="fixed right-4 top-4 z-50" />
  <RouterView />
</template>

