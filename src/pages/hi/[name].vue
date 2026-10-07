<script setup lang="ts">
const router = useRouter()
const route = useRoute('/hi/[name]')
const user = useUserStore()

watchEffect(() => {
  user.setNewName(route.params.name)
})

useHead({
  // 去掉 t()，直接拼接，函数形式保证 user.savedName 变化时标题会更新
  title: () => `Hi, ${user.savedName}`,
})
</script>

<template>
  <div class="card w-full max-w-md">
    <div class="i-carbon-pedestrian text-5xl text-teal-600 dark:text-teal-400" />

    <h1 class="mt-4 text-2xl font-medium">Hi, {{ user.savedName }}</h1>

    <p class="mt-1 text-sm opacity-60">
      <em>This is a dynamic route</em>
    </p>

    <div v-if="user.otherNames.length" class="mt-6">
      <p class="text-xs tracking-wide uppercase opacity-50">aka</p>
      <ul class="mt-2 flex flex-wrap justify-center gap-2">
        <li v-for="otherName in user.otherNames" :key="otherName">
          <RouterLink
            class="inline-block rounded-full bg-teal-500/10 px-3 py-1 text-sm text-teal-700 transition-colors hover:bg-teal-500/20 dark:text-teal-300"
            :to="`/hi/${otherName}`"
            replace
          >
            {{ otherName }}
          </RouterLink>
        </li>
      </ul>
    </div>

    <button class="btn mt-8 text-sm" @click="router.back()">返回</button>
  </div>
</template>
