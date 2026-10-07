<template>
  <main class="mx-auto min-h-screen max-w-3xl px-4 py-10 text-gray-700 dark:text-gray-200">
    <RouterView />
    <footer class="mt-16 border-t border-gray-200 pt-4 text-center text-sm opacity-60 dark:border-gray-800">
      <RouterLink class="transition-colors hover:text-teal-600 dark:hover:text-teal-400" to="/">
        ← 返回首页
      </RouterLink>
    </footer>
  </main>
</template>
