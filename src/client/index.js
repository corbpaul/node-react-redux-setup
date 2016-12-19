// IMPORT DEPENDENCIES
// ==============================================

import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import React from 'react';
import { render } from 'react-dom';

import configureStore from '../shared/store';
import routes from '../shared/routes';





// SET CONSTANTS
// ==============================================

const store = configureStore(window.__INITIAL_STATE__);





// RENDER APP
// ==============================================

render(
    <Provider store={store}>
        <Router children={routes} history={browserHistory} onUpdate={() => window.scrollTo(0, 0)} />
    </Provider>,
    document.getElementById('root')
);
