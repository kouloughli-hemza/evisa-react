import * as actionTypes from '../../actions/actionTypes';

const initState = {
    err : {
        traveller_civilite : '',
        traveller_first_name : '',
        traveller_last_name : '',
        traveller_birth_date : '',
        traveller_birth_place : '',
        traveller_passport_type : '',
        traveller_phone : '',
        traveller_email : '',
        traveller_passport_nbr:'',
        traveller_passport_delivered_at:'',
        traveller_passport_expire_at:'',
        traveller_full_address :'',
        traveller_files : '',
    },
    initErr : {
        traveller_civilite : '',
        traveller_first_name : '',
        traveller_last_name : '',
        traveller_birth_date : '',
        traveller_birth_place : '',
        traveller_passport_type : '',
        traveller_phone : '',
        traveller_email : '',
        traveller_passport_nbr:'',
        traveller_passport_delivered_at:'',
        traveller_passport_expire_at:'',
        traveller_full_address :'',
        traveller_files : '',
    },
    loading :false,
    formValid : false,
    modalActive : true,
    travellers : [],
    nextButton : false
};

const traveller  = (state = initState, action) => {
    switch (action.type) {

        case actionTypes.START_TRAVELLER_VALIDATOR :
            return {
                ...state,
                err : {...state.initErr},
                loading: true,
                formValid : false,
            };
        case actionTypes.TRAVELLER_VALIDATOR_SUCCESS :
            const traveller = {
                ...action.traveller,
                id: +action.traveller.traveller_passport_nbr
            };
            let updatedTravellers = state.travellers.concat(traveller);
            let nextButton = updatedTravellers.length >= 1;
            return {
                ...state,
                err : {...state.initErr},
                loading: false,
                formValid: true,
                modalActive: false,
                travellers: updatedTravellers,
                nextButton : nextButton
            };
        case actionTypes.TRAVELLER_VALIDATOR_FAILED :

            return {
                ...state,
                err : action.err,
                loading: false,
                formValid: false,
                modalActive: true,
            };
        case actionTypes.HANDLE_TRAELLER_FORM_MODAL :
            return {
                ...state,
                modalActive: action.status,
                formValid: false,
            };
        case actionTypes.HANDLE_DELETE_TRAVELLER :
            let travellers = state.travellers.filter(item => action.travellers.every(id => id !== item.id));
            let nextBtnStatus = travellers.length >= 1;
            return {
                ...state,
                travellers: travellers,
                nextButton : nextBtnStatus
            };
        case actionTypes.FINISHED_REDIRECT:
            return initState;
        default :
            return state;
    }
};
export default traveller;