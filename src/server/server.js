// IMPORT DEPENDENCIES
// ==============================================

import Hapi from 'hapi';

import path from 'path';
import webpack from 'webpack';
import webpackPlugin from 'hapi-webpack-plugin';

import log from './logging';
import reactMiddleware from './middleware/reactMiddleware';
import webpackConfig from '../../tools/config/webpack/webpack.config';





// CREATE SERVER
// ==============================================

const server = new Hapi.Server({
    connections: {
        router: {
            stripTrailingSlash: true
        },
        routes: {
            files: {
                relativeTo: path.join(__dirname, '../public')
            }
        }
    }
});

server.connection({
    port: process.env.NODE_PORT || 3000,
    host: process.env.HOSTNAME || '0.0.0.0',
    routes: {
        cors: {
            additionalHeaders: [
                'Origin'
            ]
        }
    }
});





// WEBPACK MIDDLEWARE
// ==============================================

if (process.env.NODE_ENV !== 'production') {
    const compiler = webpack(webpackConfig);
    const assets = {
        historyApiFallback: true,
        hot: true,
        quiet: true
    };
    
    server.register({
        register: webpackPlugin,
        options: {
            compiler,
            assets
        }
    });
}





// ROUTES
// ==============================================

server.ext('onPreResponse', (request, reply) => {
    if (typeof request.response.statusCode !== 'undefined') {
        return reply.continue();
    }
    
    return reactMiddleware(request, reply);
});





// START SERVER
// ==============================================

server.start((err) => {
    if (err) {
        log.fatal(err, 'Unable to start server');
    } else {
        log.info(`Server is running at: ${server.info.uri}`);
    }
});
