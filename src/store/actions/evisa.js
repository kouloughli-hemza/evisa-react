import * as actionType from './actionTypes';
import objectToFormData from "../../helpers/objectToFormData";
import evisaAxios from "../../evisaAxios";
export const startEvisaRequest = () => {
    return {
        type : actionType.STATR_EVISA_REQUEST
    }
};

export const evisaRequest = (data,hisotry) => {
    return dispatch => {
        dispatch(startEvisaRequest());
        const form = objectToFormData(data,null,'evisa');
        evisaAxios.post('store',form)
            .then(res => {
            dispatch(evisaRequestSuccess(res));
            dispatch(updateBalanceRequest(res.data.balance));
            dispatch(finishedRedirect(hisotry));
        }).catch(err => {
            const response = err.response;
            let errMessage = 'Nous rencontrons des difficultés pour traiter votre demande, veuillez réessayer plus tard\n';
            if(typeof response !== 'undefined'){
                if(response.status === 402){
                    errMessage = response.data.error;
                }
            }

            dispatch(evisaRequestFailed(errMessage));
        })
    }
};

export const updateCurrentStep = step => {
    return {
        type : actionType.UPDATE_CURRENT_STEP,
        step : step
    }
};

export const evisaRequestSuccess = (response) => {
    return {
        type : actionType.EVISA_REQUEST_SUCCESS,
        response : response
    }
};

export const updateBalanceRequest = (balance) => {
    return {
        type: actionType.UPDATE_BALANCE_REQUEST,
        balance : balance
    }
};

export const evisaRequestFailed = (err) => {
    return {
        type : actionType.EVISA_REQUEST_FAILED,
        err : err
    }
};
export const redirectUser = (history) => {
    history.push('/');
    return {
        type : actionType.FINISHED_REDIRECT
    }
};
export const finishedRedirect = (history) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(redirectUser(history));
        },5000);
    }
};