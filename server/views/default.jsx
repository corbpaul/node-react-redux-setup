// IMPORT DEPENDENCIES
// ==============================================

import React, { Component } from 'react';





// HTML CONTAINER
// ==============================================

export default class Html extends Component {
    render() {
        const { assets, content, initialState } = this.props;
    
        return (
            <html lang='en'>
                <head>
                    {/* Meta data */}
                    <meta charset='utf-8' />
                    <meta name='viewport' content='width=device-width, initial-scale=1' />
                    
                    {/* Title & description */}
                    <title>My Node App</title>
                    <meta name='description' content='My first node, react app' />
                    
                    {/* Stylesheets */}
                    <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Poppins:300,400,600' />
                    <link rel='stylesheet' href={assets.main.css} />
                </head>
                <body>
                    <div id='root'>{content}</div>
                    <script dangerouslySetInnerHTML={{ __html: initialState }}></script>
                    <script src={assets.main.js}></script>
                </body>
            </html>
        );
    }
}
