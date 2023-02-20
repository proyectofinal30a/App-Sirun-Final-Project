import path from 'path'
import vue from '@vitejs/plugin-vue'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },
}