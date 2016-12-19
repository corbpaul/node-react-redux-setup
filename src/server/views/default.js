// IMPORT DEPENDENCIES
// ==============================================

import React, { Component, PropTypes } from 'react';
import sanitize from 'serialize-javascript';





// HTML CONTAINER
// ==============================================

export const doctype = '<!doctype html>';
export default class HTMLDocument extends Component {
    static propTypes = {
        assets: PropTypes.object.isRequired,
        content: PropTypes.string.isRequired,
        head: PropTypes.object.isRequired,
        initialState: PropTypes.object.isRequired
    }

    render() {
        const { assets, content, head, initialState } = this.props;
        const attrs = head.htmlAttributes.toComponent();
    
        return (
            <html {...attrs}>
                <head>
                    {/* Meta data */}
                    <meta charSet='utf-8' />
                    <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
                    <meta name='viewport' content='width=device-width, initial-scale=1' />
                    
                    {/* Title & description */}
                    {head.title.toComponent()}
                    
                    {/* More meta */}
                    {head.meta.toComponent()}
                    
                    {/* Canonical links */}
                    
                    {/* Manifest */}
                    
                    {/* Schema */}
                    
                    {/* Analytics */}
                    
                    {/* Stylesheets */}
                    <link rel='stylesheet' href={assets.main.css} />
                </head>
                <body>
                    <div id='root' dangerouslySetInnerHTML={{ __html: content }} />
                    <script dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__ = ${sanitize(initialState)};` }} />
                    <script src={assets.main.js} />
                </body>
            </html>
        );
    }
}
