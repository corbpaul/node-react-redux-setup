// IMPORT DEPENDENCIES
// ==============================================

require('babel-core/register');
require('babel-polyfill');

// use css-modules to create module class names
require('css-modules-require-hook')({
    generateScopedName: '[name]__[local]' + (process.env.NODE_ENV === 'production' ? '-[hash:base64:4]' : ''), // eslint-disable-line prefer-template
    mode: 'local',
    rootDir: './client'
});





// TRIGGER SERVER SETUP
// ==============================================

require('./server');
