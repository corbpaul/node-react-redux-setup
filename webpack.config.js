// IMPORT DEPENDENCIES
// ==============================================

import AssetsPlugin from 'assets-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import cssnext from 'postcss-cssnext';
import nested from 'postcss-nested';
import path from 'path';
import webpack from 'webpack';





// SET CONSTANTS
// ==============================================

const DEV = process.env.NODE_ENV !== 'production';





// WEBPACK CONFIG
// ==============================================

export default {
    entry: DEV
        ? ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', './index.js']
        : './index.js',
    context: path.resolve(__dirname, './client'),
    output: {
        filename: `[name]${DEV ? '' : '.[hash]'}.js`,
        hashDigestLength: 7,
        path: path.resolve(__dirname, './public'),
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
            path: 'public'
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
