import * as actionTypes from '../../actions/actionTypes';

const initState = {
    agencies : [],
    loading : false,
    err : null
};

const agencies = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.START_INIT_AGENCIES :
            return{
                ...state,
                loading: true,
                err : null
            };
        case actionTypes.INIT_AGENCIES_SUCCESS :
            return {
                ...state,
                loading: false,
                agencies : action.agencies,
                err : null
            };
        case actionTypes.INIT_AGENCIES_FAILED :
            return {
                ...state,
                loading: false,
                err:action.err
            };

        default :
            return state;
    }
};

export default agencies;