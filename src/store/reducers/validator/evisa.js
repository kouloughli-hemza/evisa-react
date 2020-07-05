import * as actionTypes from '../../actions/actionTypes';

const initState = {
    loading :false,
    evisa : {},
    err : null,
    formValid : false,
    nextButton: false,
};

const evisa  = (state = initState, action) => {
    switch (action.type) {

        case actionTypes.START_EVISA_VALIDATOR :
            return {
                ...state,
                err : null,
                loading: true,
                formValid : false,
                nextButton: false,
            };
        case actionTypes.EVISA_VALIDATOR_SUCCESS :
            return {
                ...state,
                loading: false,
                evisa : action.evisa,
                err : null,
                formValid: true,
                nextButton : true
            };
        case actionTypes.EVISA_VALIDATOR_FAILED :

            return {
                ...state,
                err : action.err,
                loading: false,
                formValid: false,
                nextButton: false,
            };
        default :
            return state;
    }
};
export default evisa;