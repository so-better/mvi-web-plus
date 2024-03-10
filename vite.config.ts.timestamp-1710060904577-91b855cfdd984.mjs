// vite.config.ts
import { defineConfig } from "file:///Users/lingkai/Desktop/%E5%89%8D%E7%AB%AF%E5%BA%93/mvi-web-plus/node_modules/vite/dist/node/index.js";
import vue from "file:///Users/lingkai/Desktop/%E5%89%8D%E7%AB%AF%E5%BA%93/mvi-web-plus/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import dts from "file:///Users/lingkai/Desktop/%E5%89%8D%E7%AB%AF%E5%BA%93/mvi-web-plus/node_modules/vite-plugin-dts/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "/Users/lingkai/Desktop/\u524D\u7AEF\u5E93/mvi-web-plus";
var vite_config_default = defineConfig({
  plugins: [vue(), dts()],
  build: {
    outDir: "lib",
    minify: "terser",
    lib: {
      entry: path.resolve(__vite_injected_original_dirname, "packages/index.ts"),
      name: "mvi",
      fileName: (format) => `mvi.${format}.js`
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["vue"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue"
        },
        exports: "named"
      }
    },
    //是否构建source map 文件
    sourcemap: false
  },
  css: {
    preprocessorOptions: {
      less: {
        // 使用 less 编写样式的 UI 库（如 antd）时建议加入这个设置
        javascriptEnabled: true
      }
    }
  },
  server: {
    host: "0.0.0.0"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbGluZ2thaS9EZXNrdG9wL1x1NTI0RFx1N0FFRlx1NUU5My9tdmktd2ViLXBsdXNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9saW5na2FpL0Rlc2t0b3AvXHU1MjREXHU3QUVGXHU1RTkzL212aS13ZWItcGx1cy92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvbGluZ2thaS9EZXNrdG9wLyVFNSU4OSU4RCVFNyVBQiVBRiVFNSVCQSU5My9tdmktd2ViLXBsdXMvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cydcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG5cdHBsdWdpbnM6IFt2dWUoKSwgZHRzKCldLFxuXHRidWlsZDoge1xuXHRcdG91dERpcjogJ2xpYicsXG5cdFx0bWluaWZ5OiAndGVyc2VyJyxcblx0XHRsaWI6IHtcblx0XHRcdGVudHJ5OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAncGFja2FnZXMvaW5kZXgudHMnKSxcblx0XHRcdG5hbWU6ICdtdmknLFxuXHRcdFx0ZmlsZU5hbWU6IGZvcm1hdCA9PiBgbXZpLiR7Zm9ybWF0fS5qc2Bcblx0XHR9LFxuXHRcdHJvbGx1cE9wdGlvbnM6IHtcblx0XHRcdC8vIFx1Nzg2RVx1NEZERFx1NTkxNlx1OTBFOFx1NTMxNlx1NTkwNFx1NzQwNlx1OTBBM1x1NEU5Qlx1NEY2MFx1NEUwRFx1NjBGM1x1NjI1M1x1NTMwNVx1OEZEQlx1NUU5M1x1NzY4NFx1NEY5RFx1OEQ1NlxuXHRcdFx0ZXh0ZXJuYWw6IFsndnVlJ10sXG5cdFx0XHRvdXRwdXQ6IHtcblx0XHRcdFx0Ly8gXHU1NzI4IFVNRCBcdTY3ODRcdTVFRkFcdTZBMjFcdTVGMEZcdTRFMEJcdTRFM0FcdThGRDlcdTRFOUJcdTU5MTZcdTkwRThcdTUzMTZcdTc2ODRcdTRGOURcdThENTZcdTYzRDBcdTRGOUJcdTRFMDBcdTRFMkFcdTUxNjhcdTVDNDBcdTUzRDhcdTkxQ0Zcblx0XHRcdFx0Z2xvYmFsczoge1xuXHRcdFx0XHRcdHZ1ZTogJ1Z1ZSdcblx0XHRcdFx0fSxcblx0XHRcdFx0ZXhwb3J0czogJ25hbWVkJ1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0Ly9cdTY2MkZcdTU0MjZcdTY3ODRcdTVFRkFzb3VyY2UgbWFwIFx1NjU4N1x1NEVGNlxuXHRcdHNvdXJjZW1hcDogZmFsc2Vcblx0fSxcblx0Y3NzOiB7XG5cdFx0cHJlcHJvY2Vzc29yT3B0aW9uczoge1xuXHRcdFx0bGVzczoge1xuXHRcdFx0XHQvLyBcdTRGN0ZcdTc1MjggbGVzcyBcdTdGMTZcdTUxOTlcdTY4MzdcdTVGMEZcdTc2ODQgVUkgXHU1RTkzXHVGRjA4XHU1OTgyIGFudGRcdUZGMDlcdTY1RjZcdTVFRkFcdThCQUVcdTUyQTBcdTUxNjVcdThGRDlcdTRFMkFcdThCQkVcdTdGNkVcblx0XHRcdFx0amF2YXNjcmlwdEVuYWJsZWQ6IHRydWVcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cdHNlcnZlcjoge1xuXHRcdGhvc3Q6ICcwLjAuMC4wJ1xuXHR9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUErVCxTQUFTLG9CQUFvQjtBQUM1VixPQUFPLFNBQVM7QUFDaEIsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sVUFBVTtBQUhqQixJQUFNLG1DQUFtQztBQUt6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMzQixTQUFTLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztBQUFBLEVBQ3RCLE9BQU87QUFBQSxJQUNOLFFBQVE7QUFBQSxJQUNSLFFBQVE7QUFBQSxJQUNSLEtBQUs7QUFBQSxNQUNKLE9BQU8sS0FBSyxRQUFRLGtDQUFXLG1CQUFtQjtBQUFBLE1BQ2xELE1BQU07QUFBQSxNQUNOLFVBQVUsWUFBVSxPQUFPLE1BQU07QUFBQSxJQUNsQztBQUFBLElBQ0EsZUFBZTtBQUFBO0FBQUEsTUFFZCxVQUFVLENBQUMsS0FBSztBQUFBLE1BQ2hCLFFBQVE7QUFBQTtBQUFBLFFBRVAsU0FBUztBQUFBLFVBQ1IsS0FBSztBQUFBLFFBQ047QUFBQSxRQUNBLFNBQVM7QUFBQSxNQUNWO0FBQUEsSUFDRDtBQUFBO0FBQUEsSUFFQSxXQUFXO0FBQUEsRUFDWjtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0oscUJBQXFCO0FBQUEsTUFDcEIsTUFBTTtBQUFBO0FBQUEsUUFFTCxtQkFBbUI7QUFBQSxNQUNwQjtBQUFBLElBQ0Q7QUFBQSxFQUNEO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDUCxNQUFNO0FBQUEsRUFDUDtBQUNELENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
