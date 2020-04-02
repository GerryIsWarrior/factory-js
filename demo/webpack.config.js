const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
console.log('zq', process.argv[3])
// console.log('zq', global)

const entryPath = {
  v1: './demo_v1/index',
  v2: './demo_v2/index',
  v3: './demo_v3/index',
}


module.exports = {
  entry: entryPath[process.argv[3]],
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '逻辑管理测试',
      template: './index.html'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
