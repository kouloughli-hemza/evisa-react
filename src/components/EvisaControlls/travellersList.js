import React from 'react';
import {Avatar, Card, ResourceItem, ResourceList, TextStyle} from '@shopify/polaris';

export default function ResourceListWithSelectionExample(props) {

    const items = props.items;

    const promotedBulkActions = [
        {
            content: 'Supprimer',
            onAction: () => props.deleteTraveller(props.selected),
        },
    ];
    return (
        <Card>
            <ResourceList
                resourceName={{
                    singular: 'Voyageur',
                    plural: 'Voyageurs',
                }}
                items={items}
                renderItem={renderItem}
                selectedItems={props.selected}
                onSelectionChange={props.handleSelected}
                selectable
                showHeader={true}
                promotedBulkActions={promotedBulkActions}
            />
        </Card>
    );

    function renderItem(item) {
        const {traveller_passport_nbr, id,traveller_first_name, traveller_last_name} = item;
        const media = <Avatar customer size="medium" name={traveller_first_name + ' ' + traveller_last_name} />;

        return (
            <ResourceItem
                id={id}
                media={media}
                onClick={() => console.log('to be deleted')}
            >
                <h3>
                    <TextStyle variation="strong">{traveller_first_name + ' ' + traveller_last_name}</TextStyle>
                </h3>
                <div>{traveller_passport_nbr}</div>
            </ResourceItem>
        );
    }
}
