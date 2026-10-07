<template>
  <main
    class="relative flex min-h-screen items-center justify-center px-4 py-10 text-center text-gray-700 dark:text-gray-200"
  >
    <div
      class="absolute inset-0 bg-gradient-to-br from-teal-50 via-white to-cyan-100 dark:from-gray-950 dark:via-gray-900 dark:to-teal-950"
    />
    <div class="relative w-full">
      <RouterView />
    </div>
  </main>
</template>
