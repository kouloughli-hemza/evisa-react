import * as actionType from '../actions/actionTypes';
const initState = {
    submited : false,
    loading : false,
    toastVisible: false,
    err : null,
    currentStep : 1,
    finished : false,
};
 const evisa =  (state = initState,action) => {
    switch (action.type) {
        case actionType.STATR_EVISA_REQUEST :
            return {
                ...state,
                loading: true,
                toastVisible: false,
                err: null,
                submited: true,
            };
        case actionType.EVISA_REQUEST_SUCCESS:
            let finished = false;
            if (typeof action.response.data.success !== "undefined"){
                finished = true;
            }
            return  {
                ...state,
                loading: false,
                toastVisible: true,
                err: null,
                finished: finished

            };
        case actionType.EVISA_REQUEST_FAILED :
            return {
                ...state,
                toastVisible: true,
                err: action.err,
                loading: false
            };
        case actionType.UPDATE_CURRENT_STEP :
            return {
                ...state,
                currentStep: action.step
            };
        case actionType.FINISHED_REDIRECT:
            return initState;
        default :
            return state;

    }
};
 export default evisa;