<script setup lang="ts">
import { routes } from 'vue-router/auto-routes'

defineOptions({
  name: 'IndexPage',
})
const user = useUserStore()
const name = ref(user.savedName)

const router = useRouter()
function go() {
  if (name.value) router.push(`/hi/${encodeURIComponent(name.value)}`)
}

useHead({
  title: 'Home',
})
</script>

<template>
  <div class="card w-full max-w-md">
    <div class="i-carbon-campsite text-5xl text-teal-600 dark:text-teal-400" />
    <h1
      class="mt-4 bg-linear-to-r from-teal-600 to-cyan-500 bg-clip-text text-3xl font-bold text-transparent"
    >
      Vitesse
    </h1>
    <p class="mt-2 text-sm opacity-75">Opinionated Vite Starter Template</p>

    <div class="mt-8 flex flex-col gap-3">
      <TheInput
        v-model="name"
        placeholder="What's your name?"
        autocomplete="false"
        @keydown.enter="go"
      />
      <label class="hidden" for="input">What's your name?</label>
      <button class="btn" :disabled="!name" @click="go">Go</button>
    </div>

    <div class="mt-8 flex justify-center gap-4 text-sm">
      <RouterLink
        class="text-teal-600 transition-colors hover:text-teal-500 dark:text-teal-400"
        to="/about"
      >
        关于
      </RouterLink>
      <RouterLink
        class="text-teal-600 transition-colors hover:text-teal-500 dark:text-teal-400"
        to="/about"
      >
        关于
      </RouterLink>
      <a
        class="text-teal-600 transition-colors hover:text-teal-500 dark:text-teal-400"
        rel="noreferrer"
        href="https://github.com/antfu/vitesse"
        target="_blank"
      >
        GitHub
      </a>
    </div>

    <div class="mt-8 w-full max-w-md border-t border-gray-200 pt-4 text-left dark:border-gray-700">
      <p class="mb-2 text-xs tracking-wide uppercase opacity-50">全部路由</p>
      <RouteTree :records="routes" />
    </div>
  </div>
</template>
