// const withSass = require('@zeit/next-sass')
const withLess = require('@zeit/next-less')
const withPWA = require('next-pwa')

// const fetch = require('axios')
// const path = require('path');
// const CompressionPlugin = require('compression-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

/**
 * next的配置文件，支持配置嵌套
 */
module.exports =
    withPWA(
        withLess(
            {
                cssModules: true,
                cssLoaderOptions: {
                    importLoaders: 1,
                    localIdentName: '[path][name]__[local]--[hash:base64:5]'
                },
                pwa: {
                    dest: 'public'
                },
                experimental: {
                    publicDirectory: true
                },
                webpack(config, options) {
                    config.plugins.push(
                        // new CompressionPlugin(),
                        // new BundleAnalyzerPlugin({
                        //     analyzerPort: 'auto'
                        // })
                    )
                    return config
                },
                exportPathMap: async function (defaultPathMap) {
                    // return {
                    //     '/': { page: '/' },
                    //     // '/article/xxx': { page: '/article/[id]' },
                    //     '/life': { page: '/life' },
                    //     '/about': { page: '/about' },
                    //     '/admin/login': { page: '/admin/login' },
                    //     '/admin/adminHome': { page: '/admin/adminHome' },
                    //     // '/about': { page: '/about' },
                    //     // '/p/hello-nextjs': { page: '/post', query: { title: 'hello-nextjs' } },
                    //     // '/p/learn-nextjs': { page: '/post', query: { title: 'learn-nextjs' } },
                    //     // '/p/deploy-nextjs': { page: '/post', query: { title: 'deploy-nextjs' } }
                    // }

                    //export动态导出
                    // const res = await fetch({
                    //     method: 'post',
                    //     url: 'https://xxxxx/api/articleList',

                    // })
                    // const pageList = await res.json();
                    // const pages = pageList.reduce((prev, curr) => {
                    //     return Object.assign({}, prev, { [`/article/${curr._id}`]: { page: '/article/[id]' } })
                    // }, {})
                    // console.log(pages);

                    let pages = {};
                    return Object.assign({}, pages, {
                        '/': { page: '/' },
                        // '/article/xxx': { page: '/article/[id]' },
                        '/life': { page: '/life' },
                        '/about': { page: '/about' },
                        '/admin/login': { page: '/admin/login' },
                        '/admin/adminHome': { page: '/admin/adminHome' },
                        // '/about': { page: '/about' },
                        // '/p/hello-nextjs': { page: '/post', query: { title: 'hello-nextjs' } },
                        // '/p/learn-nextjs': { page: '/post', query: { title: 'learn-nextjs' } },
                        // '/p/deploy-nextjs': { page: '/post', query: { title: 'deploy-nextjs' } }
                    })
                }
            }
        )
    )





