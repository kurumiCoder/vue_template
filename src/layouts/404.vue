<script setup lang="ts">
const router = useRouter()

useHead({
  title: '页面未找到',
})
</script>

<template>
  <main
    class="flex min-h-screen items-center justify-center px-4 py-10 text-center text-gray-700 dark:text-gray-200"
  >
    <div class="card w-full max-w-md">
      <div class="i-carbon-warning text-5xl text-amber-500" />
      <h1 class="mt-4 text-2xl font-medium">页面未找到</h1>
      <RouterView />
      <div class="mt-8 flex justify-center gap-3">
        <button class="btn text-sm" @click="router.back()">返回上一页</button>
        <RouterLink class="btn text-sm" to="/">回到首页</RouterLink>
      </div>
    </div>
  </main>
</template>
