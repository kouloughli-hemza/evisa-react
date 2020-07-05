import React from 'react';
import {
  ResourceList,
  Avatar,
  Button,
  VisuallyHidden,
  ExceptionList,
  Truncate,
  Badge
} from '@shopify/polaris';

import './CustomerListItem.css';

export default function CustomerListItem(props) {
  const {
    avatarSource,
    name,
    location,
    note,
    openOrderCount,
    openOrdersUrl,
    latestOrderUrl,
    ...rest
  } = props;

  const agencyName = props.evisa.agency.name;
  const {avatar} = props.evisa.agency;
  const {first_name,last_name,evisa_status,evisa_original_status,id} = props;
  let evisa_status_css_class = '';
  let progress = '';

  switch (evisa_original_status) {
    case "pending":
      progress = 'incomplete';
      evisa_status_css_class = 'info';
      break;
    case "processing" :
      progress = 'partiallyComplete';
      evisa_status_css_class = 'attention';
      break;
    case "accepted" :
      progress = 'complete';
      evisa_status_css_class = 'success';
      break;
    default :
      progress = 'complete';
      evisa_status_css_class = 'warning';
      break;
  }
  const {type,formated_sale_price} = props.evisa;
  const destination = props.evisa.destination.name;
  const media = (
    <div className="CustomerListItem__Media">
      <Avatar source={avatar} size="medium" initials={agencyName.charAt(0)} name={first_name + ' ' + last_name} />
    </div>
  );
  const profile = (
    <div className="CustomerListItem__Profile">
      <h3 className="CustomerListItem__Title" style={{fontSize: '11px'}}>{first_name + ' ' + last_name}</h3>
      <span className="CustomerListItem__Location" style={{fontSize: '10px'}}>{agencyName}</span>
    </div>
  );

  const evisaRequests = (
    <div className="CustomerListItem__Orders">


      <span className="CustomerListItem__OrderCount">
        <VisuallyHidden>&nbsp;</VisuallyHidden>
        {destination}
      </span>


      <span className="CustomerListItem__TotalSpent">
        <VisuallyHidden>&nbsp;</VisuallyHidden>
        <Truncate>{type}</Truncate>
      </span>

      <span className="CustomerListItem__TotalSpent">
        <VisuallyHidden>&nbsp;</VisuallyHidden>
        <Truncate>{formated_sale_price}</Truncate>
      </span>

      <span className="CustomerListItem__TotalSpent">
        <VisuallyHidden>&nbsp;</VisuallyHidden>
        <Truncate><Badge progress={progress} status={evisa_status_css_class}>{evisa_status}</Badge></Truncate>
      </span>
    </div>
  );

  let exceptions = [];
  let conditionalActions = null;

  if (note) {
    const noteMarkup = (
      <span>
        <VisuallyHidden>Customer note:</VisuallyHidden>
        {note}
      </span>
    );
    exceptions.push({
      icon: 'notes',
      title: noteMarkup,
      truncate: true,
    });
  }

  if (openOrderCount) {
    const label = openOrderCount === 1 ? 'order' : 'orders';
    const title = `${openOrderCount} open ${label}`;

    exceptions.push({
      status: 'warning',
      icon: 'alert',
      truncate: true,
      title,
    });

    conditionalActions = (
      <div className="CustomerListItem__ConditionalActions">
        <Button plain url={openOrdersUrl}>
          View open orders
        </Button>
      </div>
    );
  }

  const exceptionList = exceptions.length
    ? (
      <div className="CustomerListItem__Exceptions">
        <ExceptionList items={exceptions} />
      </div>
    )
    : null;

  const shortcutActions = latestOrderUrl
    ? [{content: 'View latest order', url: latestOrderUrl}]
    : null;
  return (
    <ResourceList.Item
      {...rest}
      media={media}
      shortcutActions={shortcutActions}
      url={'/evisa-request/details/' + id}
    >
      <div className="CustomerListItem__Main">
        {profile}
        {evisaRequests}
      </div>
      {exceptionList}
      {conditionalActions}
    </ResourceList.Item>
  );
}
