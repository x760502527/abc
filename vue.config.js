module.exports = {
  baseUrl: './',
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3680',
        changeOrigin: true
      }
    }

  }
}
