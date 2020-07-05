import * as actionTypes from '../actions/actionTypes';
const initState = {
    evisaDetails : {},
    loading : false,
    err: null,
    finished:false,
    modelReset : false,
    modalStatus: false,
};

const evisaActions = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.START_EVISA_ACTION_REQUEST :
            return{
                ...state,
                loading : true,
                err : null,
                finished:false,
                modelReset: false,
            };
        case actionTypes.EVISA_ACTION_SUCCESS :
            return {
                ...state,
                loading: false,
                err : null,
                evisaDetails: action.data,
                finished:true,
                modelReset: false,
            };
        case actionTypes.EVISA_ACTION_FAILED :
            return {
                ...state,
                loading: false,
                err : action.err,
                finished:false,
                modelReset: false,

            };
        case actionTypes.EVISA_ACTION_RESET_MODAL :
            return {
                ...state,
                modelReset: true,
                modalStatus: action.status,
            };
        default :
            return state;
    }
};
export default evisaActions;