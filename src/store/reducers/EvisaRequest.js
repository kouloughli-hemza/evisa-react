import * as actionTypes from '../actions/actionTypes';
const initState = {
    evisaDetails : {},
    loading : false,
    err: null,
};

const evisaRequest = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.START_EVISA_DETAILS_REQUEST :
            return{
                ...state,
                loading : true,
                err : null,
            };
        case actionTypes.EVISA_DETAILS_SUCCESS :
            return {
                ...state,
                loading: false,
                err : null,
                evisaDetails: action.data,
            };
        case actionTypes.EVISA_DETAILS_FAILED :
            return {
                ...state,
                loading: false,
                err : action.err,
            };
        default :
            return state;
    }
};
export default evisaRequest;