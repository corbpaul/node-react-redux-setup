// IMPORT DEPENDENCIES
// ==============================================

import Hapi from 'hapi';
import Hoek from 'hoek';
import Vision from 'vision';

import HapiReactViews from 'hapi-react-views';
import path from 'path';
import webpack from 'webpack';
import webpackPlugin from 'hapi-webpack-plugin';

import config from '../config';
import log from './logging';
import reactMiddleware from './middleware/reactMiddleware';
import webpackConfig from '../webpack.config';





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
    host: config.default.app.host,
    port: config.default.app.port,
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





// VIEWS
// ==============================================

server.register(Vision, (err) => {
    if (err) {
        log.fatal(err, 'Unable to register Vision plugin');
        process.exit(1);
    }
    
    Hoek.assert(!err, err);
    
    server.views({
        engines: {
            jsx: HapiReactViews
        },
        relativeTo: __dirname,
        path: 'views'
    });
});





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
