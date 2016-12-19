// IMPORT DEPENDENCIES
// ==============================================

import types from './constants';





// INITIAL STATE
// ==============================================

const initialState = {};





// REDUCER
// ==============================================

export default function app(state = initialState, action) {
    switch (action.type) {
    case types.APP_SUCCESS:
        return { ...state, ...action.response };
    default:
        return state;
    }
}
