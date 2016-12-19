// IMPORT DEPENDENCIES
// ==============================================

import { expect } from 'chai'; // eslint-disable-line import/no-extraneous-dependencies

import * as actions from '../actions';
import reducer from '../reducer';

import * as helpers from './testHelpers';





// TESTS
// ==============================================

describe('App reducer', () => {
    let initialState;
    
    beforeEach(() => {
        initialState = {};
    });

    it('should return the initial state', () => {
        const expectedResult = initialState;
        expect(reducer(undefined, {})).to.eql(expectedResult);
    });
    
    it('should handle the app success action correctly', () => {
        const app = helpers.success;
        const expectedResult = { ...initialState, ...app };
        
        expect(reducer(initialState, actions.app.success(app))).to.eql(expectedResult);
    });
});
