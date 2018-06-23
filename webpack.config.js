const path = require('path');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
  entry: [
    'react-hot-loader/patch',
    '@babel/polyfill',    
    './vendor.scss',
    './index.jsx',
  ],
  mode: "development",
  devtool: "source-map",
  resolve: {
    modules: [
      path.resolve(__dirname, './src'),
      'node_modules'
    ],
    alias: {
      "react-router-dom": "react-router-dom/es",
      "semantic-ui-react": "semantic-ui-react/dist/es"
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
    new webpack.HotModuleReplacementPlugin(),
    // new BundleAnalyzerPlugin()
  ]
}