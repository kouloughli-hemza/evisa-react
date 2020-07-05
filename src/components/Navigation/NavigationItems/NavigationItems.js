import React from 'react';
import { Navigation,Badge } from "@shopify/polaris";
import {
    ArrowLeftMinor, HomeMajorMonotone,GlobeMajorMonotone,OutgoingMajorMonotone,
    InventoryMajorMonotone, OrdersMajorTwotone,ListMajorMonotone,
    RedoMajorMonotone,TransportMajorMonotone

} from '@shopify/polaris-icons';
import './Navigation.css';
const navigationItems = (props) =>  (
    <Navigation location="/">
        <Navigation.Section
            items={[
                {
                    label: 'Retourner vers Caravane',
                    icon: ArrowLeftMinor,
                    url : 'https://app.caravane2.com'
                },
            ]}
        />
        <Navigation.Section
            separator
            title="Caravane2"
            items={[
                {
                    label: 'Acceuil',
                    url:'/home',
                    exact:true,
                    icon: HomeMajorMonotone,
                },

            ]}

        />
        <Navigation.Section
            title="Evisa"
            items={[
                {
                    label: 'Demande Evisa',
                    icon: OrdersMajorTwotone,
                    url:'/evisa',
                },
                {
                    label: 'Mes Demmandes',
                    icon: ListMajorMonotone,
                    url:'/e-visa',
                    exact :true,
                    badge: <Badge status="success">New</Badge>,

                },

            ]}
        />
        <Navigation.Section
            title="Serivces"
            items={[
                {
                    label: 'Hôtel',
                    icon: InventoryMajorMonotone,
                    url:'/soon',

                },
                {
                    label: 'Transfer',
                    icon: OutgoingMajorMonotone,
                    url:'/soon',
                },
                {
                    label: 'Excursion',
                    icon: RedoMajorMonotone,
                    url:'/soon',
                },
                {
                    label: 'Croisiere',
                    icon: RedoMajorMonotone,
                    url:'/soon',
                },
                {
                    label: 'BlockSeat',
                    icon: TransportMajorMonotone,
                    url:'/soon',
                },
                {
                    label: 'Package',
                    icon: GlobeMajorMonotone,
                    url:'/soon',
                },
            ]}
        />
    </Navigation>
);

export default navigationItems;