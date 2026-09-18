import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import pluginOxlint from 'eslint-plugin-oxlint'
import skipFormatting from 'eslint-config-prettier/flat'
// 如果需要在 TS 环境下使用 process，建议显式导入
// import process from 'node:process'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{vue,ts,mts,tsx}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  ...pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,

  // 👇 将图二的配置迁移到这里 👇
  {
    name: 'app/custom-rules',
    // 对应图二的 parserOptions (Flat Config 中通过 languageOptions 配置)
    languageOptions: {
      ecmaVersion: 'latest',
    },
    rules: {
      // 去掉函数 () 前面的空格
      'space-before-function-paren': 'off',

      // 根据环境变量动态控制
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

      // 关闭驼峰命名规则
      'vue/multi-word-component-names': 'off',
      'vue/require-component-is': 'off',
      'vue/no-deprecated-slot-attribute': 'off',
    },
  },

  ...pluginOxlint.buildFromOxlintConfigFile('.oxlintrc.json'),

  skipFormatting,
)
