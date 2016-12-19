// IMPORT DEPENDENCIES
// ==============================================

import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import { expect } from 'chai'; // eslint-disable-line import/no-extraneous-dependencies

import { AppTest as App } from '../index';

import * as helpers from './testHelpers';





// TESTS
// ==============================================

describe('<App/>', () => {
    let component;

    it('should render its children', () => {
        const children = (<h1>Test</h1>);
        component = shallow(
            <App app={helpers.success} loadApp={() => {}}>
                {children}
            </App>
        );
        expect(component.contains(children)).to.be.true;
    });
});
