// IMPORT DEPENDENCIES
// ==============================================

import { RouterContext, match } from 'react-router';
import { Provider } from 'react-redux';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import Helmet from 'react-helmet';
import React from 'react';

import configureStore from '../../shared/store';
import routes from '../../shared/routes';

import assets from '../../public/assets.json';

import HTMLDocument, { doctype } from '../views/default';





// FUNCS
// ==============================================

function renderApplication(props) {
    return doctype + renderToStaticMarkup(<HTMLDocument {...props} />);
}





// EXPORT MIDDLEWARE
// ==============================================

export default function (request, reply) {
    const store = configureStore();
    
    match({ routes, location: request.url }, (error, redirect, props) => {
        if (error) {
            reply(error.message).code(500);
        } else if (redirect) {
            reply.redirect(redirect.pathname + redirect.search);
        } else if (props) {
            const rootComponent = (
                <Provider store={store}>
                    <RouterContext {...props} />
                </Provider>
            );

            const initialState = store.getState();
            const content = renderToString(rootComponent);
            const head = Helmet.rewind();

            reply(renderApplication({ initialState, content, head, assets }));
        } else {
            reply('Not Found').code(404);
        }
    });
}
