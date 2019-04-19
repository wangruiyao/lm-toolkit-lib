var path = require('path');
function resolve (dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  // 修改 src 目录 为 examples 目录
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  productionSourceMap: false,
  css: {
    extract: false,
    loaderOptions: {
      postcss: { // 配置px2rem
        plugins: [
          require('postcss-px2rem')({
            remUnit: 37.5
          })
        ]
      },
      sass: {
        data: `
            @import "./examples/assets/styles/variables.scss";
            @import "./examples/assets/styles/mixins.scss";
          `
      }
    }
  },
  devServer: {
    historyApiFallback: true, // history模式开启
    proxy: {
      '/api': {
        // target: 'http://yapi.demo.qunar.com/mock/62969/toolkit',
        target: 'http://192.168.0.210:7700/externallogic-lvyg/emarketOpenController/',
        changeOrigin: true,
        pathRewrite:{
          '^/api':''
        }
      }
    }
  },
  // 扩展 webpack 配置，使 packages 加入编译
  chainWebpack: config => {
    config.module
      .rule('js')
      .include
      .add('/packages')
      .add('/examples')
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        // 修改它的选项...
        return options
      });
    config.resolve.alias
      .set('examples', resolve('examples'))
      .set('components', resolve('examples/components'))
      .set('assets', resolve('examples/assets'))
      .set('packages', resolve('packages'))
      .set('views', resolve('examples/views'))
      .set('core', resolve('examples/core'))
      .set('utils', resolve('examples/utils'))
      .set('api', resolve('examples/api'))
  }
};