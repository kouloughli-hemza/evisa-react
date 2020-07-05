import * as actionTypes from '../../actions/actionTypes';

const initState = {
    nationalities : [],
    countries : [],
    loading : false,
    err : null
};

const nationalities = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.START_INIT_NATIONALITY :
            return{
                loading: true,
                err : null
            };
        case actionTypes.INIT_NATIONALITY_SUCCESS :
            return {
                loading: false,
                nationalities : action.nationalities,
                countries : action.countries,
                err : null
            };
        case actionTypes.INIT_NATIONALITY_FAILED :
            return {
                loading: false,
                err:action.err
            };
        case actionTypes.FINISHED_REDIRECT:
            return initState;
        default :
            return state;
    }
};

export default nationalities;