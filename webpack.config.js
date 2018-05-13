var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var BomPlugin = require('webpack-utf8-bom');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var isProduction = function() {
    return process.env.NODE_ENV === 'production';
}

var config = {
    context: path.resolve(__dirname, './'),
    entry: {
        app: './src/entry.js',
        page: './src/modules/page/index.js',
        //vendors: ['angular', 'angular-route'] 
    },
    output: {
        path: path.resolve(__dirname, './web'),
        publicPath: '/',
        filename: !isProduction() ? 'assets/js/[name]-main.js' : 'assets/js/[name]-main-[hash:6].js',
        //filename:'assets/js/[name]-main-[hash:6].js',
        chunkFilename: 'assets/js/[name]-[chunkhash:8]-chunk.js'
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'postcss-loader'
                    ]
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'postcss-loader',
                        'less-loader'
                    ]
                })
            },
            {
                test: /\.sass$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'postcss-loader',
                        'sass-loader'
                    ]
                })
            },
            {
                test: /\.json$/,
                use: [
                    'json-loader'
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: { limit: 1024, name: 'assets/images/[name].[ext]' }
                }]
            },
            {
                test: /\.(woff2?|otf|eot|svg|ttf)$/i,
                use: [{
                    loader: 'url-loader',
                    options: { name: 'assets/fonts/[name].[ext]' }
                }]
            },
            {
                test: /\.html$/,
                use: [
                    { loader: 'html-loader', options: { minimize: false, removeComments: false, collapseWhitespace: false } }
                ]
            },
            {
                test: /\.(docx|doc)$/i,
                use: [{
                    loader: 'url-loader',
                    options: { name: 'assets/docs/[name].[ext]' }
                }]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json'],
        modules: [
            'node_modules',
            path.resolve(__dirname, './src/libs'),
        ],
        alias: {
            layer: path.resolve(__dirname, './node_modules/layer/src/mobile/layer'),
            layercss: path.resolve(__dirname, './node_modules/layer/src/mobile/need/layer.css')
        }
    },
    plugins: [
        new ExtractTextPlugin(!isProduction() ? 'assets/css/[name]-main.css' : 'assets/css/[name]-main-[contenthash:6].css'),
        //new ExtractTextPlugin('assets/css/[name]-main-[contenthash:6].css'),
        new BomPlugin(true, /\.(html)$/),
        new HtmlWebpackPlugin({
            title: 'web种子项目',
            filename: 'index.html',
            template: './src/assets/template/index.html'
        }),
        new HtmlWebpackPlugin({
            title: 'web种子项目Page',
            filename: 'page.html',
            template: './src/assets/template/page.html',
            chunks:['page']
        }),

        // new webpack.optimize.UglifyJsPlugin({
        //     output: {
        //       comments: false
        //     },
        //     compress: {
        //         warnings: false
        //     },
        // }),
        // new webpack.optimize.CommonsChunkPlugin({name: 'vendors',filename:'assets/[name]/vendors.js'}),
        new webpack.DllReferencePlugin({
            manifest: require('./web/assets/vendor/ng-manifest.json'),
        }),
        new CleanWebpackPlugin(
            ['css/*.*', 'js/*.*','images/*.*'], 　 //匹配删除的文件
            {
                root: path.resolve(__dirname, './web/assets'),//根目录
                verbose: true,//开启在控制台输出信息
                dry: false,//启用删除文件,
                exclude:[],
                watch:true
            }
        ),
        new CopyWebpackPlugin([
            // {from:'node_modules/admin-lte/dist',to:'assets/libs/admin-lte/dist'},
            // {from:'node_modules/font-awesome/css',to:'assets/libs/font-awesome/css'},
            // {from:'node_modules/font-awesome/fonts',to:'assets/libs/font-awesome/fonts'},
            // {from:'node_modules/ionicons/css',to:'assets/libs/ionicons/css'},
            // {from:'node_modules/ionicons/fonts',to:'assets/libs/ionicons/fonts'},
            // {from:'node_modules/bootstrap/dist',to:'assets/libs/bootstrap/dist'},
            // {from:'node_modules/jquery/dist',to:'assets/libs/jquery/dist'}
        ])
    ],
    devtool: "source-map"
}

module.exports = config;
