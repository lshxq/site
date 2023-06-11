const { defineConfig } = require('@vue/cli-service')

let path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/site/',
  configureWebpack: (config) => {
    config.resolve = {
      extensions: ['.js', '.json', '.vue'],
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    }
  }
})
