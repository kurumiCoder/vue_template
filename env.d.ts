/// <reference types="vite/client" />
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { AttributifyAttributes } from '@unocss/preset-attributify'

declare interface Window {
  // extend the window
}

// with unplugin-vue-markdown, markdown files can be treated as Vue components
declare module '*.md' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, any>
  export default component
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, any>
  export default component
}

declare module '@vue/runtime-dom' {
  interface HTMLAttributes extends AttributifyAttributes {}
}


// 引入 Vite 内置类型（支持导入图片、CSS，以及 import.meta.hot 等）


// // 环境变量类型声明

// interface ImportMetaEnv {
// // 定义 import.meta.env 里面有哪些变量

//   readonly VITE_APP_TITLE: string
//   // 声明一个只读的字符串变量（对应 .env 里的同名变量）

//   readonly VITE_API_BASE_URL: string
//   // 同上，声明 API 基础地址

//   // 更多环境变量...
// }

// interface ImportMeta {
// // 扩展全局 ImportMeta 接口

//   readonly env: ImportMetaEnv
//   // 让 import.meta.env 指向上面定义的 ImportMetaEnv
// }
