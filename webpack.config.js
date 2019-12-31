// const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      }
    ]
  }
  //   devServer: {
  //     contentBase: path.resolve(__dirname, "dist"),
  //     port: 9000
  //   },
  //   plugins: [
  //     new HtmlWebpackPlugin({
  //       template: "src/index.html" //source html
  //     })
  //   ]
};
