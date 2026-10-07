<script setup lang="ts">
// 高亮 token 颜色（atom-one-dark，与博客底层同为 highlight.js）；放在主题 less 之前，避免同优先级覆盖
import 'highlight.js/styles/atom-one-dark.css'
// md 主题样式随本组件所在 chunk 加载，不影响其他页面
import '@/assets/markdown-theme.less'

// md 插件会传入 :frontmatter，声明以消费该属性（避免渲染到 DOM 上）
defineProps<{ frontmatter?: Record<string, unknown> }>()
</script>

<template>
  <div class="markdown-preview">
    <slot />
  </div>
</template>
