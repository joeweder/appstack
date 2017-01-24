module.exports = {
  entry: './src/index.js',
  output: {
    path: './bin',
    filename: 'app.bundle.js'
  },
  devtool: 'eval-source-map',
  eslint: {
    configFile: '.eslintrc',
    failOnWarning: false,
    failOnError: true,
  },
  devServer: {
    proxy: {
      '/appstack/service/**': {
        target: 'http://localhost:8888',
        changeOrigin: true,
        secure: false
      }
    }
  },
  module: {
    preLoaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
    ],
    loaders: [
    {
      test: /\.css$/, loader: "style!css"
    },
		{
      test: /\.js?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'react', 'stage-2']
      }
    }
    ]
  }
};