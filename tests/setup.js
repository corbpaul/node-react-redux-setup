// IMPORT DEPENDENCIES
// ==============================================

import 'babel-polyfill';
import { jsdom } from 'jsdom';





// TEST SETUP
// ==============================================

if (!global.document) {
    try {
        const exposedProperties = ['window', 'navigator', 'document'];

        global.document = jsdom('<!doctype html><html><body></body></html>');
        global.window = document.defaultView;
        Object.keys(document.defaultView).forEach((property) => {
            if (typeof global[property] === 'undefined') {
                exposedProperties.push(property);
                global[property] = document.defaultView[property];
            }
        });

        global.navigator = {
            userAgent: 'node.js'
        };
    } catch (e) {
        // jsdom is not supported...
    }
}
