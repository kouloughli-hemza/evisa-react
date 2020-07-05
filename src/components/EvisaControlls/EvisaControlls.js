import React from 'react';
import {PageActions} from "@shopify/polaris";
const evisaControlls = props => {
    let buttonStatus = !props.nextButton.enabled;
    let loading = false;
    if(props.step === 2){
        buttonStatus=  !props.nextButtonStatus;
    }
    if(props.step === 1 ){
        loading = props.Step1loading;
    }
    if(props.step ===3){
        loading = props.step3Loading;
    }
    return(

        <PageActions
            primaryAction={{content: props.nextButton.label, disabled: buttonStatus,onAction : () => props.nextStep(),loading:loading}}
            secondaryActions={[{content: props.prevButton.label,disabled : !props.prevButton.enabled ,onAction : () => props.prevStep()}]}
        />
    )
};
export default evisaControlls;