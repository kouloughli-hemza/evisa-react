import * as actionTypes from './actionTypes';
import evisaAxios from "../../evisaAxios";
export const startGettingEvisaRequests = () => {
    return {
        type : actionTypes.START_GETTING_EVISA_REQUESTS
    }
};

export const gettingEvisaRequests = (data) => {
    return dispatch => {
        dispatch(startGettingEvisaRequests());
        evisaAxios.get('e-visa',{params:{...data}})
            .then(res => {
                dispatch(gettingEvisaRequestsSuccess(res.data));
            }).catch(err => {
                dispatch(gettingEvisaRequestsFailed(err));
        })
    }
};

export const gettingEvisaRequestsSuccess  = (data) => {
    return {
        type : actionTypes.GETTING_EVISA_REQUESTS_SUCCESS,
        data : data
    }
};

export const gettingEvisaRequestsFailed = (err) => {
    return {
        type : actionTypes.GETTING_EVISA_REQUESTS_FAILED,
        err : err
    }
};