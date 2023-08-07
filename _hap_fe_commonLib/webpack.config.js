import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import webpack from 'webpack'
import { env } from '@appblocks/node-sdk'
import exposed from './federation-expose.js'
import sharedJson from './federation-shared.js'

const { ModuleFederationPlugin } = webpack.container

env.init()

const __dirname = path.resolve()

const port = 3000

export default {
  entry: './src/index',
  mode: 'development',
  devServer: {
    static: path.join(__dirname, 'dist'),
    port,
  },
  externals: {
    env: JSON.stringify(process.env),
  },
  output: {
    publicPath: 'auto',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react'],
        },
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', // Injects CSS into the DOM
          'css-loader', // Translates CSS into CommonJS
          'postcss-loader', // Apply PostCSS transformations
          'sass-loader', // Compiles Sass to CSS
        ],
      },
      {
        test: /.m?js/,
        type: 'javascript/auto',
      },
      {
        test: /.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /.(jpg|png|svg)$/,
        use: {
          loader: 'url-loader',
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
    new ModuleFederationPlugin({
      name: '_hap_fe_commonLib',
      filename: 'remoteEntry.js',
      exposes: exposed,
      shared: sharedJson,
      // exposes: {},
      // shared: {
      //   '@appblocks/js-sdk': {
      //     import: '@appblocks/js-sdk',
      //     shareKey: '@appblocks/js-sdk',
      //     shareScope: 'default',
      //     singleton: true,
      //     version: '^0.0.11',
      //   },
      // },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
}
