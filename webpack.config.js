module.exports = {
  entry: './client.js',

  output: {
    path: 'public',
    filename: 'bundle.js',
    publicPath: '/'
  },

  module: {
    loaders: [
      { test: /\.js$/,
        exclude: /node_modules|server.js/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react', "stage-1"]
        }
      }
    ]
  }
}
