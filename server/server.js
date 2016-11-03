// IMPORT DEPENDENCIES
// ==============================================

import Hapi from 'hapi';
import Hoek from 'hoek';
import Vision from 'vision';

import path from 'path';
import pug from 'pug';

import config from '../config';
import log from './logging';
import routes from './routes';





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
            pug
        },
        relativeTo: __dirname,
        path: 'views'
    });
});





// ROUTES
// ==============================================

server.route(routes);





// START SERVER
// ==============================================

server.start((err) => {
    if (err) {
        log.fatal(err, 'Unable to start server');
    } else {
        log.info(`Server is running at: ${server.info.uri}`);
    }
});
