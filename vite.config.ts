import { defineConfig } from 'vite'
import type { RouteRecordRaw } from 'vue-router'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

import VueRouter from 'vue-router/vite'
import { VueRouterAutoImports } from 'vue-router/unplugin'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import UnoCSS from 'unocss/vite'
import { unheadVueComposablesImports } from '@unhead/vue'
import Layouts from 'vite-plugin-vue-layouts'

import Markdown from 'unplugin-vue-markdown/vite'
import generateSitemap from 'vite-ssg-sitemap'

import { autoDirIndex } from './build/auto-dir-index.ts'
import { highlight } from './build/markdown-highlight.ts'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    autoDirIndex({ dirs: ['docs'] }),
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    vueJsx(),
    UnoCSS(),
    Layouts({
      layoutsDirs: 'src/layouts',
      defaultLayout: 'default',
    }),
    // https://github.com/unplugin/unplugin-vue-markdown
    // Don't need this? Try vitesse-lite: https://github.com/antfu/vitesse-lite
    Markdown({
      // wrapperClasses: 'prose prose-sm m-auto text-left',
      // 用 MarkdownWrap 组件承载 md 主题样式（组件内导入 markdown-theme.less）
      wrapperComponent: 'MarkdownWrap',
      wrapperDiv: false, // 避免再套一层默认 div
      headEnabled: true,
      // 构建期语法高亮（highlight.js），实现见 build/markdown-highlight.ts
      markdownOptions: { highlight },
      markdownSetup(md) {
        // 保留可能已被其他插件注册的 link_open，没有则退回默认 token 渲染
        const defaultLinkOpen =
          md.renderer.rules.link_open ??
          ((tokens, idx, options, _env, self) => self.renderToken(tokens, idx, options))

        md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
          // href 可能为 null（如纯锚点），空串不会匹配外链正则
          const href = tokens[idx].attrGet('href') ?? ''
          // 仅 http/https 外链追加 target 与 rel
          if (/^https?:\/\//.test(href)) {
            tokens[idx].attrSet('target', '_blank')
            tokens[idx].attrSet('rel', 'noopener')
          }
          return defaultLinkOpen(tokens, idx, options, env, self)
        }
      },
    }),
    VueRouter({
      // 扫描多个文件夹
      routesFolder: ['src/pages','docs'],
      extensions: ['.vue', '.md'],
      // 排除测试文件与说明文档（README.md 不应生成 /README 路由）
      exclude: ['**/*.spec.ts', '**/*.test.ts', '**/README.md'],
      // 生成类型声明到指定位置
      dts: 'src/route-map.d.ts',
    }),

    AutoImport({
      include: [/\.[jt]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
      imports: [
        'vue',
        '@vueuse/core',
        VueRouterAutoImports,
        unheadVueComposablesImports,
        {
          // add any other imports you were relying on
          'vue-router/auto': ['useLink'],
        },
      ],
      /**
       *   AutoImport({
      include: [/\.[jt]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
      imports: [
        'vue',
        'vue-i18n',
        '@vueuse/core',
        unheadVueComposablesImports,
        VueRouterAutoImports,
        {
          // add any other imports you were relying on
          'vue-router/auto': ['useLink'],
        },
      ],
       *
       */
      dts: 'src/auto-imports.d.ts', // 显式指定输出路径
      dirs: ['src/composables', 'src/stores'], // add扫描目录
      //ant-design-vue
      resolvers: [
        // ElementPlusResolver(),
        /*   // 自动导入图标组件
        IconsResolver() */
      ],
      vueTemplate: true, // 开启后，在 Vue 模板中也能使用自动导入的变量。比如在 <template> 中直接写 {{ count }}，而不需要额外在 <script setup> 中声明
    }),
    Components({
      dirs: ['src/components/**'],
      extensions: ['vue', 'md', 'tsx'],
      dts: 'src/components.d.ts',
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/, /\.[jt]sx$/],
      // 解析的 UI 组件库，这里以 Element Plus 和 Ant Design Vue 为例
      resolvers: [
        // ElementPlusResolver(),
        // AntDesignXVueResolver()
        /*   // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep']
        }) */
      ],
    }),
    vueDevTools(),
  ],
  resolve: {
    tsconfigPaths: true,
  },

  // 服务
  server: {
    host: true, // host设置为true才可以使用network的形式，以ip访问项目
    port: 8080, // 端口号
    open: false, // 自动打开浏览器
    cors: true, // 跨域设置允许
    strictPort: true, // 如果端口已占用直接退出
    // 接口代理
    proxy: {
      '/api': {
        // 本地 8000 前端代码的接口 代理到 8000 的服务端口
        target: 'http://localhost:81/',
        changeOrigin: true, // 允许跨域
        rewrite: (path) => path.replace('/api/', '/'),
      },
    },
  },

  // https://github.com/antfu/vite-ssg
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    beastiesOptions: {
      reduceInlineStyles: false,
    },
    // 只预渲染「有页面组件且不含动态参数」的路由，并额外产出 dist/404.html
    includedRoutes(_paths, routes) {
      const paths = new Set<string>(['/404'])

      const walk = (records: readonly RouteRecordRaw[], prefix = '') => {
        for (const record of records) {
          const fullPath = record.path.startsWith('/')
            ? record.path
            : `${prefix}/${record.path}`.replace(/\/{2,}/g, '/')
          const isDynamic = fullPath.includes(':') || fullPath.includes('*')
          // 布局包装路由（vite-plugin-vue-layouts）不产出页面，只递归子路由
          const isLayout = !!(record.meta as { isLayout?: boolean } | undefined)?.isLayout

          if (!isLayout && record.component && !isDynamic)
            paths.add(fullPath === '/' ? '/' : fullPath.replace(/\/$/, ''))

          if (record.children?.length) walk(record.children, fullPath)
        }
      }

      walk(routes)

      return [...paths]
    },
    onFinished() {
      generateSitemap({
        // 默认 hostname 是 http://localhost/，发布前替换成你的真实域名
        hostname: 'https://example.com',
        exclude: ['/404'],
      })
    },
  },
  // 还缺build

  // // https://github.com/vitest-dev/vitest
  // test: {
  //   include: ['test/**/*.test.ts'],
  //   environment: 'jsdom',
  // },
})
