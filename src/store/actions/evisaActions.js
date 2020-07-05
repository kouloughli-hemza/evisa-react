import * as actionTypes from './actionTypes';
import evisaAxios from "../../evisaAxios";
import {evisaDetails} from "./EvisaRequest";
import objectToFormData from "../../helpers/objectToFormData";
export const startEvisaActionRequest = () => {
    return {
        type : actionTypes.START_EVISA_ACTION_REQUEST,
    }
};



export const evisaAction = (action,data) => {
    console.log(data);
    return dispatch => {
        dispatch(startEvisaActionRequest());
        let form = data;
        if(action === 'accept'){
             form = objectToFormData(data,null,null);
        }
        evisaAxios.post('e-visa/details/' +action+ '/' +  data.id,form)
            .then(res => {
                dispatch(evisaActionSuccess(res.data));
                dispatch(evisaDetails(data));
                dispatch(evisaActionResetModal(false));
            })
            .catch(err => {
                let errors = typeof err.response != "undefined" ? err.response.data : err;
                dispatch(evisaActionFailed(errors));
            })
    }
};

export const evisaActionSuccess  = (data) => {
    return {
        type : actionTypes.EVISA_ACTION_SUCCESS,
        data : data
    }
};

export const evisaActionFailed = (err) => {
    return {
        type : actionTypes.EVISA_ACTION_FAILED,
        err : err
    }
};

export const evisaActionResetModal = (status) => {
    return {
        type: actionTypes.EVISA_ACTION_RESET_MODAL,
        status: status
    }
};