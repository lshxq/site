const { defineConfig } = require('@vue/cli-service')

let path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/site/',
  devServer: {
    proxy: {
      '/site-api': {
        target: 'http://localhost:8082/',
        changeOrigin: false,
        secure: false
      }
    }
  },
  configureWebpack: (config) => {
    config.resolve = {
      extensions: ['.js', '.json', '.vue'],
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    }
  }
})
