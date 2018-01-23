module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'dist/bundle.js',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' }
    ]
  }
}