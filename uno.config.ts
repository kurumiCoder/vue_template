import { createLocalFontProcessor } from '@unocss/preset-web-fonts/local'

import {
  defineConfig,
  presetWind3,
  presetAttributify,
  transformerVariantGroup,
  transformerDirectives,
  presetTypography,
  presetIcons,
  presetWebFonts,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    // 主按钮
    [
      'btn',
      'px-4 py-1.5 rounded-lg inline-block bg-teal-600 text-white cursor-pointer transition-colors duration-200 hover:bg-teal-700 active:bg-teal-800 disabled:cursor-default disabled:bg-gray-400 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/60',
    ],
    // 卡片容器
    [
      'card',
      'rounded-2xl bg-white/80 p-8 shadow-xl ring-1 ring-gray-900/5 backdrop-blur dark:bg-gray-900/70 dark:ring-white/10',
    ],
    // 纯图标按钮（如主题切换）
    [
      'icon-btn',
      'inline-flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 cursor-pointer transition-colors duration-200 hover:bg-teal-500/10 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400',
    ],
  ],
  presets: [
    presetWind3(),
    // 无前缀 attributify，配合模板里的 text-4xl / p="x-4" 等写法
    presetAttributify(),
    presetTypography(),
    presetIcons({
      scale: 1.2,
      prefix: 'i-', // 默认图标前缀
    }),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
      processors: createLocalFontProcessor(),
    }),
  ],
  transformers: [transformerVariantGroup(), transformerDirectives()],
  // 不管有没有用到，这 4 个类永远出现在最终 CSS 里，而不是动态生成
  safelist: 'prose prose-sm m-auto text-left'.split(' '),
})
