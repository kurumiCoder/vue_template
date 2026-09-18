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
    [
      'btn',
      'px-4 py-1  rounded inline-block bg-teal-700 text-white cursor-pointer !outline-none hover:bg-teal-800 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50',
    ],
  ],
  presets: [
    presetWind3(),
    presetAttributify({
      prefix: 'un-',
      prefixedOnly: true,
    }),
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
