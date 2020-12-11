const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path');
const autoprefixer = require('autoprefixer');

const dev = merge(common, {
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    compress: true,
    port: 4200,
    hot: true,
    stats: 'errors-only',
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer],
              sourceMap: true
            }
          },
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ]
  }
});

module.exports = new Promise((resolve) => {
  resolve(dev);
});