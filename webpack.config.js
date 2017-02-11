const path = require('path')
const webpack = require('webpack')
const extractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          css: extractTextPlugin.extract({
            loader: 'css-loader',
            fallbackLoader: 'vue-style-loader'
          })
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.styl/,
        loader:['style-loader','css-loader','stylus-loader']
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue'
    },
    extensions:['.js','.vue']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    inline: true
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new extractTextPlugin({
      filename:'./assets/style.css',
      allChunks:true
    })
  ])
}
