import React from 'react';
import { TopBar } from "@shopify/polaris";

const userMenu = props => {
    const userMenuActions = [
        {
            items: [{content: 'Déconnecter',url: 'logout'}],
        },
    ];
    return (
        <TopBar.UserMenu
            actions={userMenuActions}
            name={props.user.agency.name}
            detail={props.user.agency.balance}
            initials={props.user.agency.name.charAt(0)}
            open={props.userMenuStatus}
            avatar={props.user.agency.avatar}
            onToggle={props.userMenuClicked}
        />
    )
};

export default userMenu;