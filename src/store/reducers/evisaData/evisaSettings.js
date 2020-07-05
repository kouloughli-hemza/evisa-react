import * as actionType from '../../actions/actionTypes';

const initState = {
    evisaSettings : null,
    loading : false,
    err : null,
    showModal : false,
};

const evisaSettings = ( state = initState, action) => {
    switch (action.type) {
        case actionType.START_GETTING_EVISA_SETTINGS :
            return {
                ...state,
                loading: true,
                err:null,
                evisaSettings: null,
                showModal: false,
            };
        case actionType.GETTING_EVISA_SETTINGS_SUCCESS :
            return {
                ...state,
                loading: false,
                err : null,
                evisaSettings: action.evisaSettings,
                showModal: true,
            };

        case  actionType.GETTING_EVISA_SETTINGS_FAILED :
            return {
                ...state,
                loading: false,
                err : action.err,
                evisaSettings: null,
                showModal: false,
            };

        case actionType.HANDLE_EVISA_SETTINGS_MODAL :
            return {
                ...state,
                showModal: action.status
            };
        case actionType.FINISHED_REDIRECT:
            return initState;
        default :
            return state;

    }
};
export default evisaSettings;