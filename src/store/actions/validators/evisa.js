import * as actionTypes from '../actionTypes';
import {updateCurrentStep} from "../evisa";
import evisaAxios from "../../../evisaAxios";

export const startEvisaValidator = () => {
    return {
        type : actionTypes.START_EVISA_VALIDATOR,
    }
};

export const evisaValidator = (evisa) => {
    return dispatch => {
        dispatch(startEvisaValidator());
        evisaAxios.post('evisaData/evisaValidator',evisa)
            .then(res => {
                dispatch(evisaValidatorSuccess(evisa));
                dispatch(updateCurrentStep(2));
            })
            .catch(err => {
                let errors = typeof err.response != "undefined" ? err.response.data : err;
                dispatch(evisaValidatorFailed(errors));
            });
    }
};

export const evisaValidatorSuccess = (evisa) => {
    return {
        type : actionTypes.EVISA_VALIDATOR_SUCCESS,
        evisa : evisa
    }
};

export const evisaValidatorFailed = (err) => {
    return {
        type: actionTypes.EVISA_VALIDATOR_FAILED,
        err : err
    }
};



