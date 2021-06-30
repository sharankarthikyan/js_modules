const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: 'build/',
  },
  module: {
    // In USE array the ORDER IS MATTER ----- Flow is coming from right to left....
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
      },
      {
        // use: ['style-loader', 'css-loader'], // right to left flow need to add this sequence. In here, first css-loader get executed and with the result of css-loader, ther style-loader gets executed.
        loader: ExtractTextPlugin.extract({
          loader: 'css-loader',
        }), // what ExtractTextPlugin do is whenever this thing sees the css loaded output from css-loader, It will automatically send the css to plugins 'style.css' => which was defined below.
        test: /\.css$/,
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          // 'url-loader', // Instead of putting a simple string we need to make a object. Because, we need to seperate image files based on the size. Output coming from image-webpack-loader it sends to url-loader. Then it finds the size of image.
          {
            loader: 'url-loader',
            options: { limit: 40000 },
          },
          'image-webpack-loader',
        ],
      },
    ],
  },
  plugins: [new ExtractTextPlugin('style.css')],
};

module.exports = config;
