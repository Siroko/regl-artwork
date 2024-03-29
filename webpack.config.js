var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'babel-polyfill',
    './src/theme/main.less',
    './src/app',
    'webpack-dev-server/client?http://localhost:8080'
  ],
  output: {
      publicPath: '/',
      filename: 'app.js'
  },
  debug: true,
  devtool: 'source-map',
  module: {
    loaders: [
      { 
        test: /\.js$/,
        include: [
            path.join(__dirname, 'src')
        ],
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      { 
        test: /\.less$/,
        loader: "style!css!autoprefixer!less"
      },
      {
        test: /\.glsl$/,
        loader: 'webpack-glsl'
      },
      {
        test: /\.json/,
        loader: 'json-loader'
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve('./node_modules'),
      path.resolve('./src')
    ]
  },
  devTool: 'cheap-eval-source-map',
  devServer: {
    contentBase: "./src"
  }
};
