// IMPORT DEPENDENCIES
// ==============================================

import { Route, IndexRoute } from 'react-router';
import React from 'react';

// App
import App from './containers/app/App';

// Home
import Home from './pages/home/Home';





// EXPORT ROUTES
// ==============================================

export default () =>
    <Route path='/' component={App}>
        <IndexRoute component={Home} />
    </Route>;
