const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin')

const dist = path.resolve(__dirname, 'dist')

module.exports = {
  mode: 'production',
  entry: {
    index: './www/index.ts',
  },
  output: {
    path: dist,
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: dist,
  },
  plugins: [
    new CopyPlugin([path.resolve(__dirname, 'static')]),

    new WasmPackPlugin({
      crateDirectory: __dirname,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: path.resolve(__dirname, 'node_modules'),
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Create `style` from JS strings
          'style-loader',
          // Translate CSS into CommonJS
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          // Compile Sass to CSS
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
}
