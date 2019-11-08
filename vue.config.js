const webpack = require('webpack')
const path = require('path')
const appData = require('./public/mock/data.json')
const home = appData.home
const footerInfors = appData.footerInfors
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  pages: {
    app: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: '彩票网站',
      chunks: ['app']
    }
  },
  chainWebpack(config) {
    config.resolve.alias
      .set('components', resolve('src/components'))
      .set('common', resolve('src/common'))
      .set('api', resolve('src/api'))
      .set('views', resolve('src/views'))
      .set('router', resolve('src/router'))
      .set('store', resolve('src/store'))
      .set('js', resolve('src/common/js'))
    config.plugin('context')
      .use(webpack.ContextReplacementPlugin,
        [/moment[/\\]locale$/, /zh-cn/])
  },
  baseUrl: '',
  devServer: {
    proxy: {
      '/test': {
        target: 'http://localhost:8080/api/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/test': '/test'
        }
      },
      '/img': {
        target: 'http://localhost:8080/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/img': '/imgs'
        }
      },
      '/footerInfors': {
        target: 'http://localhost:8080/api',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/footerInfors': '/footerInfors'
        }
      }
    },
    before(app) {
      app.post('/api/test', function (req, res) {
        console.log(req);
        res.json({
          errno: 0,
          data: home
        })
      }),
      app.get('/api/test', function (req, res) {
        res.json({
          errno: 0,
          data: home
        })
      }),
      app.get('/api/footerInfors', function (req, res) {
        res.json({
          errno: 0,
          data: footerInfors
        })
      })
    }
  }
}
