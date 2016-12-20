const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/index.jsx',
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
    }, {
      test: /\.svg$/,
      loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]',
    }, {
      test: /\.styl$/,
      /* eslint-disable max-len */
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!stylus-loader'),
      /* eslint-enable max-len */
    }],
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.styl'],
  },
  output: {
    path: `${__dirname}/dist`,
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    devtool: 'eval-source-map',
    inline: true,
    contentBase: './dist',
    hot: true,
    historyApiFallback: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('style.css', { allChunks: true }),
  ],
  postcss: () => [
    autoprefixer({ browsers: ['last 2 versions'] })],
};

module.exports = config;
