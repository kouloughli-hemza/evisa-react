import React from 'react';
import { Autocomplete,Icon} from "@shopify/polaris";
import {SearchMinor} from "@shopify/polaris-icons";

const selectBoxFilter = props => {

    const textField =
        <Autocomplete.TextField
        onChange={(value) => props.handleInputChange(value)}
        onFocus={() => props.handleInputChange('')}
        value={props.inputValue}
        prefix={<Icon source={SearchMinor} color="inkLighter" />}
        placeholder={props.placeholder} />;
    return(
        <Autocomplete
            emptyState={props.emptyState}
            options={props.options}
            selected={props.selected}
            onSelect={props.handleSelect}
            loading={props.loading}
            textField={textField}
            preferredPosition="mostSpace"
            willLoadMoreResults={props.loading} />
    )
};
export default selectBoxFilter;