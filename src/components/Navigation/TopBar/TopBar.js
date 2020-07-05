import React from 'react';
import { TopBar } from "@shopify/polaris";
import UserMenu from '../UserMenu/UserMenu';

const siteTopBar = props => {

    return (
        <TopBar

            showNavigationToggle
            userMenu={<UserMenu user={props.userData} userMenuClicked={props.userMenuClicked} userMenuStatus={props.userMenuStatus}/>}
            onNavigationToggle={props.onNavigationToggle}
        />
    )
};
export default siteTopBar;