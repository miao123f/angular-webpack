var webpack = require('webpack');
var path = require("path");

module.exports = {
  output: {
        path: path.resolve(__dirname,'./web/assets/vendor'),
        filename: '[name].js',
        library: '[name]',
    },
    entry: {
        ng: ['angular', 'angular-route', 'angular-animate'],
    },
    resolve: {
      extensions: [".js"],
      modules:[
          'node_modules',
          path.resolve(__dirname,'./src/libs'),
        ],
        alias:{
          layer:path.resolve(__dirname,'./node_modules/layer/src/mobile/layer'),
          layercss:path.resolve(__dirname,'./node_modules/layer/src/mobile/need/layer.css'),
          
        }
    },
    plugins: [

        new webpack.DllPlugin({
            path: './web/assets/vendor/[name]-manifest.json',
            name: '[name]',
            context: __dirname,
        }),
        new webpack.optimize.UglifyJsPlugin({
        output: {
          comments: false
        },
        compress: {
            warnings: false
        }
    })
    ]
}