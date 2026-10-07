import hljs from 'highlight.js'

// highlight.js 没有 vue/svelte/tsx 这类"框架超集"语言，这里做兜底映射
// （jsx 是 javascript 的内置别名，无需处理）
const LANG_FALLBACK: Record<string, string> = {
  vue: 'xml',
  svelte: 'xml',
  tsx: 'typescript',
}

// 构建期语法高亮：返回内层 HTML，markdown-exit 会自带 <pre><code class="language-x"> 包装。
// 返回空串则走默认转义（无着色）
export function highlight(str: string, lang: string) {
  const resolved = LANG_FALLBACK[lang] ?? lang
  if (resolved && hljs.getLanguage(resolved))
    return hljs.highlight(str, { language: resolved, ignoreIllegals: true }).value
  return ''
}
