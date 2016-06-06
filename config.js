// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
    build: {
        index: path.resolve(__dirname, 'dist/index.html'),
        assetsRoot: path.resolve(__dirname, 'dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        productionSourceMap: false
    },
    dev: {
        port: 8080,
        proxyTable: {
            // '/launcher': {
            //     target: 'http://www.naitang.me',
            //     changeOrigin: true,
            //     pathRewrite: {
            //         '^/launcher': '/launcher'
            //     },
            //     headers: {
            //         'Cookie': 'SID=810q3nmoi5mfp8geb9bkm9jql0;'
            //     }
            // }
        }
    }
}
