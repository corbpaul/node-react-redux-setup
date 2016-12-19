// IMPORT DEPENDENCIES
// ==============================================

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { loadApp } from './actions';
import config from '../../../config';





// STYLES
// ==============================================

import './foundation.css';
import style from './styles.css';





// APP CONTAINER
// ==============================================

class App extends Component {
    static propTypes = {
        children: PropTypes.object,
        app: PropTypes.object,
        loadApp: PropTypes.func.isRequired
    }
    
    componentWillMount() {
        this.props.loadApp(config.default.app.siteId);
    }
    
    render() {
        const { app } = this.props;
        
        const createMeta = (meta) => {
            const metaArray = [];
            
            // Meta content
            if (meta.description) metaArray.push({ name: 'description', content: meta.description });
            if (meta.keywords) metaArray.push({ name: 'keywords', content: meta.keywords });
            if (meta.lang) metaArray.push({ name: 'content-language', content: meta.lang });
            if (meta.copyright) metaArray.push({ name: 'copyright', content: meta.copyright });
            if (meta.appleWebAppTitle) metaArray.push({ name: 'apple-mobile-web-app-title', content: meta.appleWebAppTitle });
            if (meta.googleSiteVerification) metaArray.push({ name: 'google-site-verification', content: meta.googleSiteVerification });
            
            metaArray.push({ name: 'referrer', content: 'unsafe-url' });
            
            // FB tags
            if (meta.fb && meta.fb.admins) metaArray.push({ property: 'fb:admins', content: meta.fb.admins });
            if (meta.fb && meta.fb.app_id) metaArray.push({ property: 'fb:app_id', content: meta.fb.app_id });
            
            // Open Graph tags
            if (meta.og && meta.og.type) metaArray.push({ property: 'og:type', content: meta.og.type });
            if (meta.og && meta.og.title) metaArray.push({ property: 'og:title', content: meta.og.title });
            if (meta.og && meta.og.description) metaArray.push({ property: 'og:description', content: meta.og.description });
            if (meta.og && meta.og.url) metaArray.push({ property: 'og:url', content: meta.og.url });
            if (meta.og && meta.og.image) metaArray.push({ property: 'og:image', content: meta.og.image });
            if (meta.og && meta.og.site_name) metaArray.push({ property: 'og:site_name', content: meta.og.site_name });
            
            return metaArray;
        };
        
        return (
            <div className='app'>
                <Helmet
                    htmlAttributes={{ lang: app.lang }}
                    defaultTitle={app.title}
                    meta={createMeta(app)}
                />
                <main className={style.container}>{this.props.children}</main>
            </div>
        );
    }
}





// MAP TO PROPS
// ==============================================

function mapStateToProps(state) {
    return {
        app: state.app
    };
}





// EXPORTS
// ==============================================

export default connect(mapStateToProps, { loadApp })(App);
export { App as AppTest };
