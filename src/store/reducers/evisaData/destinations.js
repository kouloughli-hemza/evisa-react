import * as actionTypes from '../../actions/actionTypes';

const initState = {
    destinations : [],
    loading : false,
    err : null
};

const destinations = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.START_INIT_DESTINATIONS :
            return{
                ...state,
                loading: true,
                err : null
            };
        case actionTypes.INIT_DESTINATIONS_SUCCESS :
            return {
                ...state,
                loading: false,
                destinations : action.destinations,
                err : null
            };
        case actionTypes.INIT_DESTINATIONS_FAILED :
            return {
                ...state,
                loading: false,
                err:action.err
            };

        default :
            return state;
    }
};

export default destinations;