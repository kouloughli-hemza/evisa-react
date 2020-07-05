import React, { Component } from 'react';
import SiteTopBar from '../Navigation/TopBar/TopBar';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems';
import {Frame,AppProvider} from '@shopify/polaris';
import fr from '@shopify/polaris/locales/fr.json';

import ThemeConfig from './themeConfig';
import { connect } from 'react-redux';
import {NavLink} from "react-router-dom";
class SiteFrame extends Component{

    render() {
        let Navigation = null;
        let topBar = null;
        if(this.props.isAuth){
            Navigation = <NavigationItems/>;
            topBar = (<SiteTopBar
                userData={this.props.user}
                userMenuClicked={this.props.userMenuClicked}
                userMenuStatus={this.props.userMenuStatus}
                onNavigationToggle={this.props.mobileNavigationHandler} />);
        }
        return(
            <div style={{height: '500px'}}>
                <AppProvider
                    theme={ThemeConfig}
                    i18n={fr}
                    linkComponent={this.CustomLinkComponent}
                >
                    <Frame
                        topBar={topBar}
                        navigation={Navigation}
                        showMobileNavigation={this.props.mobileNavigationStatus}
                        onNavigationDismiss={this.props.mobileNavigationHandler}
                    >

                        {this.props.children}

                    </Frame>
                </AppProvider>
            </div>
        )
    }

    CustomLinkComponent = ({children, url, ...rest}) => {
        if(rest.external && url !== 'logout'){
            return (
                <a target="_blank" href={url} {...rest}>{children}</a>

            )
        }
        return (
            <NavLink
                to={url}
                activeClassName="Polaris-Navigation__Item--selected Polaris-Navigation--subNavigationActive Polaris-Navigation--subNavigationActive active"
                {...rest}
            >
                {children}
            </NavLink>
        );
    };

}

const mapStateToProps = state => {
    return{
        isAuth : state.auth.token !== null,
        user : state.auth.userId,
    }
};
export default connect(mapStateToProps)(SiteFrame);