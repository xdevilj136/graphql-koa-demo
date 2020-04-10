const path = require('path');
const webpack = require('webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');
const VueLoader = require('vue-loader/lib/plugin')

const resolvePath = inputPath => path.join(__dirname, inputPath)

module.exports = {
	mode: 'development',
	// devServer: {
	// 	hot: true
	// },
  entry: {
    "app": [path.resolve(__dirname, './src/main.js')]
  },
  output: {
    filename: '[name].[hash:8].js',
    path: resolvePath('dist'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolvePath('src'),
    }
  },
  plugins: [
    new VueLoader(),
    // 输出 index.html 到 output
    new HtmlwebpackPlugin({
      template: resolvePath('./index.html')
    }),
    new webpack.ProgressPlugin(),
  ],

  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: file => (
          /node_modules/.test(file) && !/\.vue\.js/.test(file)
        )
      },
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /.css$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },

  optimization: {
    minimizer: [new TerserPlugin()],

    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/
        }
      },

      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
      name: true
    }
  }

};
