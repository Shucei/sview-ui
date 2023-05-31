/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'
import DefineOptions from 'unplugin-vue-define-options/vite'
// import pkg from "../script/transipkg/package.json";
// , ...Object.keys(pkg.dependencies)

export default defineConfig({
  build: {
    target: 'modules',
    //打包文件目录
    outDir: 'es',
    //压缩
    minify: false,
    //css分离
    //cssCodeSplit: true,
    rollupOptions: {
      //忽略打包vue文件
      external: ['vue'],
      input: ['index.ts'],
      output: [
        {
          format: 'es',
          //不用打包成.es.js,这里我们想把它打包成.js
          entryFileNames: '[name].js',
          //让打包目录和我们目录对应
          preserveModules: true,
          //配置打包根目录
          dir: 'es',
          preserveModulesRoot: 'src'
        },
        {
          format: 'cjs',
          entryFileNames: '[name].js',
          //让打包目录和我们目录对应
          preserveModules: true,
          //配置打包根目录
          dir: 'lib',
          preserveModulesRoot: 'src'
        }
      ]
    },
    lib: {
      entry: './index.ts',
      formats: ['es', 'cjs']
    }
  },
  plugins: [
    vue(),
    DefineOptions(), // 用于支持 defineComponent 的 props 类型推导
    dts({
      tsConfigFilePath: '../../tsconfig.json'
    }),
    {
      name: 'node_modules',
      generateBundle(_, bundle) {
        const keys = Object.keys(bundle)
        for (const key of keys) {
          const bundler: any = bundle[key as any]
          this.emitFile({
            type: 'asset',
            fileName: key.replace(/node_modules/g, 'node_module'),
            source: bundler.code.replace(/node_modules/g, 'node_module')
          })
        }
      }
    },
    dts({
      // 指定使用的 tsconfig.json，如果不配置也可以在 components 下新建 tsconfig.json
      tsConfigFilePath: '../../tsconfig.json',
      // 因为这个插件默认打包到es下，我们想让lib目录下也生成声明文件需要再配置一个
      outputDir: 'lib'
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './components')
    }
  }
})
