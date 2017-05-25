const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const ChunkHashReplacePlugin = require('chunkhash-replace-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');

// process.traceDeprecation = true;

function formatCSS(isProduction, base) {
  let opt = (isProduction ? '.min' : "");
  return base.concat(opt, ".css");
}

function getPlugins(isProduction) {
  let plugins = [];
  let bootstrapRootName = "./src/styles/bootstrap/css/bootstrap";

/* This will replace key with value in code */
  if(isProduction){
    plugins.push(
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production')
        })
    );
  }

  plugins.push(
      new CopyWebpackPlugin([
        {from: formatCSS(isProduction, bootstrapRootName), to: 'css/bootstrap.css'},
        {from: formatCSS(isProduction, bootstrapRootName.concat('-theme')), to: 'css/bootstrap-theme.css'},
        {flatten: 'true', from: './src/styles/bootstrap/fonts/*', to: 'fonts'}
      ])
  );

/* Break out all vendor code into a separate bundle */
  plugins.push(
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: function (module) {
          // this assumes your vendor imports exist in the node_modules directory
          return module.context && module.context.indexOf('node_modules') !== -1;
        }
      })
  );

/* CommonChunksPlugin will now extract out the webpack runtime into a separate manifest. This prevents developer code
   changes from changing the vendor [chunkHash] and vice versa. */
  plugins.push(
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest'
      })
  );

/* This plugin REPLACES <script/> tags with the [name].[chunkHash].js build name in your html file. But we need name].[contenthash].css for CSS
   and it doesn't support that. I opened an issue on github. Switched to HtmlWebpackPlugin instead.
  plugins.push(
      new ChunkHashReplacePlugin({
        src: 'src/index.html',
        dest: 'bin/index.html',
      })
  );
*/

/* Write the  <link href> line(s) for our CSS and the <script src> line(s) for our JavaScript into our template */
  plugins.push(
      new HtmlWebpackPlugin({
        template: path.join( __dirname, 'src', 'index.html'),
        filename: path.join( __dirname, 'bin', 'index.html'),
      })
  );

  /* Help HtmlWebpackPlugin and add defer to the <script/> entries */
  plugins.push(
      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'defer'
      })
  );

  plugins.push(
      new ExtractTextPlugin(isProduction ? '[name].[contenthash].css' : '[name].css')
  );

  /* Show html page of bundle layout and what's in each
    plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static'
        })
    );
  */

  return plugins;
}

module.exports = (env = {}) => {
  console.log('module.exports() env = ' + env);
  for(let propt in env){
    console.log(propt + ': ' + env[propt]);
  }
  let isProduction = env.build === 'production';
  let isProductionAPI = 'true' === env.PRODUCTION_API || false;
  console.log('module.exports() isProduction = ' + isProduction);
  console.log('module.exports() isProductionAPI = ' + isProductionAPI);

  return {
  entry: {
    contacts: './src/index.js'
  },
  output: {
    //[chunkhash] is slow for development
    filename: isProduction ? '[name].[chunkhash].js' : '[name].js',
    path: path.resolve(__dirname, './bin')
  },
  devtool: isProduction ? 'source-map' : 'eval-source-map',
  devServer: {
    proxy: {
      '/appstack/service/**': {
        target: isProductionAPI ? 'http://localhost:8888' : 'http://localhost:3004',
        changeOrigin: true,
        secure: false
      }
    }
  },
  plugins: getPlugins(isProduction),
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        enforce: "pre",
        use: {
          loader: 'eslint-loader',
          options: {
            configFile: '.eslintrc',
            failOnWarning: false,
            failOnError: true
          }
        }
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react', 'stage-2']
          }
        }
      },
      {
        test: /\.(less|css)$/,
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader!less-loader"
        })
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit:'100000'
            }
          }
        ]
      },
      {
        test: /\.jpg$/,
        use: [
          {
            loader: "file-loader",
          }
        ]
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit:'100000',
              mimetype:'application/font-woff'
            }
          }
        ]
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit:'100000',
              mimetype:'application/octet-stream'
            }
          }
        ]
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {loader: 'file-loader'}
        ]
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit:'100000',
              mimetype:'image/svg+xml'
            }
          }
        ]
      }
    ]
  }
}};