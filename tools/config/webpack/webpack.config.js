// IMPORT DEPENDENCIES
// ==============================================

const AssetsPlugin = require('assets-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const cssnext = require('postcss-cssnext');
const nested = require('postcss-nested');
const path = require('path');
const webpack = require('webpack');





// SET CONSTANTS
// ==============================================

const DEV = process.env.NODE_ENV !== 'production';





// WEBPACK CONFIG
// ==============================================

module.exports = {
    entry: DEV
        ? ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', 'babel-polyfill', './index.js']
        : ['babel-polyfill', './index.js'],
    context: path.resolve('./src/client'),
    output: {
        filename: `[name]${DEV ? '' : '.[hash]'}.js`,
        hashDigestLength: 7,
        path: path.resolve('./src/public'),
        publicPath: '/'
    },
    module: {
        loaders: [
            // JS
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: DEV ? {
                    plugins: [['react-transform', {
                        transforms: [{
                            transform: 'react-transform-hmr',
                            imports: ['react'],
                            locals: ['module']
                        }]
                    }]]
                } : {}
            },
            // css
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style',
                `css?modules&importLoaders=1&localIdentName=[name]__[local]${DEV ? '' : '-[hash:base64:4]'}!postcss`) // eslint-disable-line max-len
            }
        ]
    },
    plugins: [
        new AssetsPlugin({
            filename: 'assets.json',
            path: './src/public'
        }),
        new ExtractTextPlugin(`[name]${DEV ? '' : '.[hash]'}.css`),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(DEV ? 'development' : 'production')
        }),
        ...DEV ? [
            new webpack.HotModuleReplacementPlugin()
        ] : [
            new webpack.optimize.DedupePlugin(),
            new webpack.NoErrorsPlugin(),
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
        ]
    ],
    postcss: [
        nested(),
        cssnext()
    ]
};
