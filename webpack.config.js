const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
  entry: [
    '@babel/polyfill',
    './vendor.scss',
    './index.js',
  ],
  mode: "development",
  devtool: "source-map",
  resolve: {
    modules: [
      path.resolve(__dirname, './src'),
      'node_modules'
    ],
    alias: {
      'redux': 'redux/es/redux',
      "redux-saga": "redux-saga/es"
    },
    extensions: ['.js', '.jsx']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: [/\.eot$/, /\.ttf$/, /\.svg$/, /\.woff$/, /\.woff2$/],
        loader: 'file-loader'
      },
      { 
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.scss$/,
        exclude: /src/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: '[local]',
            }
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['node_modules']
            }
          }
        ]
      },
      {
        test: /\.scss$/, 
        include: /src/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: '[local]--[hash:base64:8]',
            }
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['node_modules']
            }
          }
        ]
      },
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          enforce: true,
          chunks: 'all',
          reuseExistingChunk: true
        },
        theme: {
          test: /vendor\.scss$/,
          name: 'theme',
          enforce: true,
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    // new BundleAnalyzerPlugin()
  ]
}