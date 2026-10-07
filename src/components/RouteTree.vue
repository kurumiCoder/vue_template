<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'

defineOptions({ name: 'RouteTree' }) // 名字与文件名一致，模板里可直接递归引用自己

const props = withDefaults(
  defineProps<{
    records: readonly RouteRecordRaw[]
    basePath?: string // 父级完整路径，用于拼接子路由
  }>(),
  { basePath: '' },
)

// 兜底 404（/:all(.*)）不展示
const visible = computed(() => props.records.filter((r) => !r.path.includes('(.*)')))

// 子路由 path 可能是相对写法，拼成完整路径用于展示和跳转
function fullPath(path: string) {
  return path.startsWith('/') ? path : `${props.basePath}/${path}`.replace(/\/{2,}/g, '/')
}

// 动态参数填示例值：/hi/:name -> /hi/example，保证可点击
function toPath(path: string) {
  return path.replace(/:[^/]+/g, 'example')
}

// 路由 path 是百分号编码（如 /%E5%89%8D%E7%AB%AF/Axios），展示时解码成中文
function displayPath(path: string) {
  try {
    return decodeURI(path)
  }
  catch {
    return path
  }
}
</script>

<template>
  <ul class="flex flex-col gap-1.5 text-sm">
    <li v-for="r in visible" :key="r.path">
      <RouterLink
        :to="toPath(fullPath(r.path))"
        class="inline-flex items-center gap-1 text-teal-600 transition-colors hover:text-teal-500 hover:underline dark:text-teal-400"
      >
        <span class="i-carbon-arrow-right" />{{ displayPath(fullPath(r.path)) }}
      </RouterLink>

      <!-- 有 children 时递归渲染，缩进一层；子路由相对路径基于父级拼接 -->
      <div
        v-if="r.children?.length"
        class="mt-1 ml-3 border-l-2 border-gray-200 pl-3 dark:border-gray-700"
      >
        <RouteTree :records="r.children" :base-path="fullPath(r.path)" />
      </div>
    </li>
  </ul>
</template>
