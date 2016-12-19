// IMPORT DEPENDENCIES
// ==============================================

import { combineReducers } from 'redux';

import AppReducer from './containers/app/reducer';





// EXPORT REDUCERS
// ==============================================

export default combineReducers({
    app: AppReducer
});
