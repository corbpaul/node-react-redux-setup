// IMPORT DEPENDENCIES
// ==============================================

import { applyMiddleware, createStore } from 'redux';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';





// EXPORT STORE
// ==============================================

export default function (initialState) {
    const create = typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' && process.env.NODE_ENV !== 'production'
        ? window.devToolsExtension()(createStore)
        : createStore;
        
    const createStoreWithMiddleware = applyMiddleware(reduxThunk)(create);
    
    return createStoreWithMiddleware(reducers, initialState);
}
