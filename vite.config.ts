import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

import VueRouter from 'vue-router/vite'
import { VueRouterAutoImports } from 'vue-router/unplugin'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import UnoCSS from 'unocss/vite'
import { unheadVueComposablesImports } from '@unhead/vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    UnoCSS(),
    vueDevTools(),
    VueRouter({
      // 扫描多个文件夹
      routesFolder: ['src/pages', 'src/views'],
      extensions: ['.vue', '.md'],
      // 排除测试文件
      exclude: ['**/*.spec.ts', '**/*.test.ts'],
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
  // 还缺build

  // // https://github.com/vitest-dev/vitest
  // test: {
  //   include: ['test/**/*.test.ts'],
  //   environment: 'jsdom',
  // },
})
