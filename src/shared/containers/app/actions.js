// IMPORT DEPENDENCIES
// ==============================================

import types from './constants';





// ACTION FUNC
// ==============================================

function action(type, payload = {}) {
    return { type, ...payload };
}





// EXPORT ACTIONS
// ==============================================

export const loadApp = id => action(types.LOAD_APP, { id });

export const app = {
    request: response => action(types.APP_REQUEST, { response }),
    success: response => action(types.APP_SUCCESS, { response }),
    failure: response => action(types.APP_FAILURE, { response })
};
