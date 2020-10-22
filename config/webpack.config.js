const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin')
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { HotModuleReplacementPlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const path = require('path')

const src = '../src/'
const build = '../build/'

module.exports = (mode) => {
  const isProduction = mode === 'production'
  const isDevelopment = mode === 'development'

  return {
    mode: mode,
    devtool: isDevelopment ? 'eval-source-map' : false,
    entry: {
      index: path.resolve(__dirname, `${src}/index.tsx`),
    },
    output: {
      path: path.resolve(__dirname, build),
      filename: '[name].[hash].js',
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      plugins: [new TsconfigPathsPlugin()],
    },
    plugins: [
      new FriendlyErrorsWebpackPlugin(),
      new ForkTsCheckerWebpackPlugin(),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, `${src}/lib/index.html`),
      }),
      isDevelopment && new HotModuleReplacementPlugin(),
      isDevelopment && new ReactRefreshWebpackPlugin(),
      new ExtractCssChunks({
        filename: isDevelopment ? '[name].css' : '[name].[contenthash].css',
        chunkFilename: isDevelopment ? '[id].css' : '[id].[contenthash].css',
      }),
    ].filter(Boolean),

    module: {
      rules: [
        {
          test: /\.(jsx?|tsx?)$/,
          exclude: [/node_modules/],
          use: [
            'thread-loader',
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-env',
                  '@babel/preset-react',
                  '@babel/preset-typescript',
                ],
                plugins: [
                  '@babel/transform-runtime',
                  ['@babel/plugin-proposal-class-properties'],
                  isDevelopment && require.resolve('react-refresh/babel'),
                ].filter(Boolean),
              },
            },
          ],
        },

        {
          test: /\.scss$/,
          use: [
            {
              loader: ExtractCssChunks.loader,
              options: {
                publicPath: path.resolve(__dirname, build),
                hmr: isDevelopment,
                reloadAll: false,
              },
            },
            {
              loader: 'css-loader',
              options: {
                modules: {
                  mode: 'local',
                  auto: /./,
                  exportGlobals: true,
                  localIdentName: '[name]-[local]',
                },
              },
            },

            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: ['postcss-preset-env'],
                },
              },
            },
            'sass-loader',
          ],
        },

        {
          test: /\.(gltf|glb)$/,
          use: 'file-loader',
        },

        {
          test: /\.(mp3)$/,
          use: 'file-loader',
        },

        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 5000,
                esModule: false,
              },
            },
            'image-webpack-loader',
          ],
        },
      ],
    },
    optimization: {
      minimize: isProduction,
      minimizer: [
        new OptimizeCssAssetsPlugin({
          cssProcessorPluginOptions: {
            preset: ['default', { discardComments: { removeAll: true } }],
          },
        }),
        new TerserPlugin({
          terserOptions: {
            output: {
              comments: false,
            },
          },
          extractComments: false,
          exclude: /node_modules/,
        }),
      ],
    },
    devServer: {
      clientLogLevel: 'silent',
      contentBase: path.resolve(__dirname, build),
      stats: 'errors-only',
      port: 3000,
      hot: isDevelopment,
    },
  }
}
