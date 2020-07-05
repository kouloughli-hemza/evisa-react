import * as actionType from '../../actions/actionTypes';

const initState = {
    evisaTypes : [],
    loading:false,
    err : null,
    evisaSettings : null,
};

const evisaTypes = (state = initState, action) => {
    switch (action.type) {
        case actionType.START_GETTING_EVISA_TYPES :
            return {
                loading: true,
                err : null
            };
        case actionType.GETTING_EVISA_TYPES_SUCCESS :
            return {
                loading: false,
                evisaTypes: action.evisaTypes,
                err : null
            };
        case actionType.GETTING_EVISA_TYPES_FAILED :
            return {
                loading: false,
                err : action.err
            };
        case actionType.FINISHED_REDIRECT:
            return initState;

        default :
            return state;

    }
};

export default evisaTypes;