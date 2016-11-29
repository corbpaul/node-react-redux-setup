// IMPORT DEPENDENCIES
// ==============================================

import { RouterContext, match } from 'react-router';
import { Provider } from 'react-redux';
import React from 'react';

import configureStore from '../../shared/store';
import createRoutes from '../../shared/routes';

import assets from '../../public/assets.json';





// SET CONSTANTS
// ==============================================

export const store = configureStore();
const routes = createRoutes(store);





// EXPORT MIDDLEWARE
// ==============================================

export default function (request, reply) {
    match({ routes, location: request.url }, (error, redirectLocation, renderProps) => {
        if (error) return reply(error.message).code(500);
        if (redirectLocation) return reply.redirect(redirectLocation.pathname + redirectLocation.search).code(302);
        if (!renderProps) return reply('Page not found').code(404);
        
        const content = (
            <Provider store={store}>
                <RouterContext {...renderProps} />
            </Provider>
        );
        
        const initialState = `window.__INITIAL_STATE__ = ${JSON.stringify(store.getState())};`;
        
        return reply.view('default', { assets, content, initialState });
    });
}
