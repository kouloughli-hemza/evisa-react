import * as actionTypes from '../actionTypes';
import evisaAxios from "../../../evisaAxios";

export const startTravellerValidator = () => {
    return {
        type : actionTypes.START_TRAVELLER_VALIDATOR,
    }
};

export const travellerValidator = (traveller) => {
    return dispatch => {
        dispatch(startTravellerValidator());
        evisaAxios.post('evisaData/travellerValidation',traveller)
            .then(res => {
                dispatch(travellerValidatorSuccess(traveller));
                dispatch(handleTravellerFormModal(false));
            })
            .catch(err => {
                let errors = typeof err.response != "undefined" ? err.response.data : err;
                dispatch(travellerValidatorFailed(errors));
            });
    }
};
export const handleTravellerFormModal = (status) => {
    return {
        type : actionTypes.HANDLE_TRAELLER_FORM_MODAL,
        status : status
    }
};



export const travellerValidatorSuccess = (traveller) => {
    return {
        type : actionTypes.TRAVELLER_VALIDATOR_SUCCESS,
        traveller : traveller
    }
};

export const travellerValidatorFailed = (err) => {
    return {
        type: actionTypes.TRAVELLER_VALIDATOR_FAILED,
        err : err
    }
};

export const handleDeleteTraveller = (travellers) => {
    return {
        type : actionTypes.HANDLE_DELETE_TRAVELLER,
        travellers : travellers
    }
};



