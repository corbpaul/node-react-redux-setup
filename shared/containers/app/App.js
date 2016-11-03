// IMPORT DEPENDENCIES
// ==============================================

import React, { Component, PropTypes } from 'react';





// STYLES
// ==============================================

import './Foundation.css';
import style from './App.css';





// APP CONTAINER
// ==============================================

export default class App extends Component {
    static propTypes = {
        children: PropTypes.object
    }
    
    render() {
        return (
            <main className={style.container}>{this.props.children}</main>
        );
    }
}
