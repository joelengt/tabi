var debug = process.env.NODE_ENV !== "production";
var path = require('path');
var webpack = require('webpack');

var PROD = JSON.parse(process.env.PROD_ENV || '1');

module.exports = {
  context: path.join(__dirname),
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./src/client/js/index.js",
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
        }
      }
    ]
  },
  output: {
    path: __dirname,
    filename: PROD ? '/public/js/index.min.js' : '/public/js/index.js'
  },
  plugins: PROD ? [
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({ 
        mangle: false, 
        sourcemap: false, 
        compress: { warnings: false }
    })
  ] : [],
};
