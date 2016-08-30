/* global require, module, __dirname, path */

var path = require('path')
var webpack = require('webpack')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')

module.exports = {
    entry: {
        polyfill: './src/polyfill',
        app: './src/main.js',
        login: './src/login.js',
        vendor: [
            'vue', 'vue-router', 'vuex', 'vuex-router-sync', 'vue-validator'
        ]
    },
    output: {
        path: config.build.assetsRoot,
        publicPath: config.build.assetsPublicPath,
        filename: '[name].js'
    },
    externals: {
        'jquery': 'jQuery'
    },
    resolve: {
        extensions: ['', '.js', '.vue'],
        fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            'src': path.resolve(__dirname, '../src'),
            'assets': path.resolve(__dirname, '../src/assets'),
            'components': path.resolve(__dirname, '../src/components')
        }
    },
    resolveLoader: {
        fallback: [path.join(__dirname, '../node_modules')]
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.js$/,
            loader: 'babel',
            include: projectRoot,
            exclude: /node_modules|vue\/dist|vue-hot-reload-api|vue-router\/|vue-loader/
        }, {
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.html$/,
            loader: 'vue-html'
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url',
            query: {
                limit: 10000,
                name: utils.assetsPath('img/[name].[hash:7].[ext]')
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url',
            query: {
                limit: 10000,
                name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
            }
        }]
    },
    vue: {
        loaders: utils.cssLoaders()
    },
    postcss: [
        autoprefixer({ browsers: [
            'ie >= 8',
            'ie_mob >= 10',
            'ff >= 26',
            'chrome >= 30',
            'safari >= 7',
            'ios >= 7',
            'android >= 2.3'
        ]})
    ],
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ]
}
