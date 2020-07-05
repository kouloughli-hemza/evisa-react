import * as actionTypes from './actionTypes';
import evisaAxios from "../../evisaAxios";
export const startEvisaDetailsRequest = () => {
    return {
        type : actionTypes.START_EVISA_DETAILS_REQUEST,
    }
};

export const evisaDetails = (data) => {
    return dispatch => {
        dispatch(startEvisaDetailsRequest());
        evisaAxios.get('e-visa/details/' + data.id)
            .then(res => {
                dispatch(evisaDetailsSuccess(res.data));
            }).catch(err => {
               let error = null;
            if (err.response) {
                if(err.response.status === 404){
                    error = 'Il semble que vous ayez tapé l\'URL manuellement';
                }else{
                    error = 'Erreur lors de la récupération des détails, veuillez réessayer.\n';
                }
            }else{
                error = 'Erreur lors de la récupération des détails, veuillez réessayer.\n';
            }
            dispatch(evisaDetailsFailed(error));
        })
    }
};


export const evisaDetailsSuccess  = (data) => {
    return {
        type : actionTypes.EVISA_DETAILS_SUCCESS,
        data : data
    }
};

export const evisaDetailsFailed = (err) => {
    return {
        type : actionTypes.EVISA_DETAILS_FAILED,
        err : err
    }
};