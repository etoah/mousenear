module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'dist/bundle.js'
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' }
    ]
  }
}