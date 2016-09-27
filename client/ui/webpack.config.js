module.exports = {
  entry: './src/index.js',
  output: {
    path: './bin',
    filename: 'app.bundle.js'
  },
  module: {
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