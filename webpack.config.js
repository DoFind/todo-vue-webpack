const path = require('path')
const webpack = require('webpack')
const htmlPlugin = require('html-webpack-plugin')
const ExtractPlugin = require('extract-text-webpack-plugin')

const isDev = process.env.NODE_ENV === "development" ? true : false

const config = {

  entry: path.join(__dirname, 'src/index.js'),

  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.[hash:8].js'
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // {
      //   test: /\.jsx$/,
      //   loader: 'babel-loader'
      // },
      // {
      //   test: /\.css$/,
      //   use: [
      //     'style-loader',
      //     'css-loader'
      //   ]
      // },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin ({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    // 教程里是 HTML
    new htmlPlugin()
  ]
}

if (isDev) {

  config.module.rules.push (
    {
      test: /\.styl$/,
      use: [
        'style-loader',
        'css-loader',
        {
          // stylus 和 postcss 都會生成sourceMap， 用前面已生成的可提升编译效率
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        },
        'stylus-loader'
      ]
    }
  )

  // 页面调试代码  .vue  ES6  映射  官方推荐...
  config.devtool = '#cheap-module-eval-source-map'

  config.devServer = {
    port: '8001',
    host: '0.0.0.0',
    overlay: {
      errors: true
    },
    // 热加载
    hot: true
  }
  
  config.plugins.push (
    // hot 需要的俩配置
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
} 
else {
  config.entry = {
    app: path.join(__dirname, 'src/index.js'),
    vendor: ['vue']
  }
  config.output.filename = '[name].[chunkhash:8].js'

  config.module.rules.push (
    {
      test: /\.styl$/,
      use: ExtractPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      })
    }
  )
  config.plugins.push (
    // 指定输出静态文件名
    new ExtractPlugin('styles.[contentHash:8].css'),
    // 打包第三方类库
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    // 单独打包 webpack， 'vendor' 务必在前
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    })
  )
}
module.exports = config;