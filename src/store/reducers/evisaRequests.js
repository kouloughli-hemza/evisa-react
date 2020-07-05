import * as actionTypes from '../actions/actionTypes';
const initState = {
    evisaRequests : [],
    meta: {},
    loading : false,
    err: null,
};

const evisaRequests = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.START_GETTING_EVISA_REQUESTS :
            return{
                ...state,
                loading : true,
                err : null,
            };
        case actionTypes.GETTING_EVISA_REQUESTS_SUCCESS :
            let updatedMeta = {
                ...state.meta,
                ...action.data.meta
            };

            return {
                ...state,
                loading: false,
                err : null,
                evisaRequests: action.data.data,
                meta : updatedMeta
            };
        case actionTypes.GETTING_EVISA_REQUESTS_FAILED :
            return {
                ...state,
                loading: false,
                err : action.err,
            };
        default :
            return state;
    }
};
export default evisaRequests;