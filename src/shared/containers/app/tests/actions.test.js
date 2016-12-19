// IMPORT DEPENDENCIES
// ==============================================

import { expect } from 'chai'; // eslint-disable-line import/no-extraneous-dependencies

import * as actions from '../actions';
import types from '../constants';

import * as helpers from './testHelpers';





// TESTS
// ==============================================

describe('App actions', () => {
    describe('load app', () => {
        it('should return the correct type and payload', () => {
            const id = 0;
            const expectedResult = {
                type: types.LOAD_APP,
                id
            };
            
            expect(actions.loadApp(id)).to.eql(expectedResult);
        });
    });
        
    describe('app entity', () => {
        it('should return the correct type and payload for request', () => {
            const response = 0;
            const expectedResult = {
                type: types.APP_REQUEST,
                response
            };
            
            expect(actions.app.request(response)).to.eql(expectedResult);
        });
        
        it('should return the correct type and payload for success', () => {
            const expectedResult = {
                type: types.APP_SUCCESS,
                response: helpers.success
            };
            
            expect(actions.app.success(helpers.success)).to.eql(expectedResult);
        });
        
        it('should return the correct type and payload for failure', () => {
            const expectedResult = {
                type: types.APP_FAILURE,
                response: helpers.failure
            };
            
            expect(actions.app.failure(helpers.failure)).to.eql(expectedResult);
        });
    });
});
