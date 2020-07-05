import React from 'react';
import { EmptyState } from "@shopify/polaris";
import './Home.css';
const home = (props) => {
    const heading = 'Bonjour ' + props.user.first_name   +  ' , bienvenue sur l\'application Caravane';
    return(
        <EmptyState
            heading={heading}
            action={{content: 'Demande Evisa',url:'evisa'}}
            image="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/air_support_wy1q.svg"
        >
            <p>
                créez votre evisa en quelques étapes seulement
            </p>
        </EmptyState>
    )
};

export default home;