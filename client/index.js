// IMPORT DEPENDENCIES
// ==============================================

import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import React from 'react';
import { render } from 'react-dom';

import configureStore from '../shared/store';
import createRoutes from '../shared/routes';





// SET CONSTANTS
// ==============================================

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);
const routes = createRoutes(store);





// RENDER APP
// ==============================================

render(
    <Provider store={store}>
        <Router children={routes} history={browserHistory} onUpdate={() => window.scrollTo(0, 0)} />
    </Provider>,
    document.getElementById('root')
);
