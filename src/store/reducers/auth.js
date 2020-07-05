import * as actionTypes from '../actions/actionTypes';

const initState = {
    token : null,
    userId : null,
    loading:false,
    error: {
        email:'',
        password:'',
    },
    authRedirectPath : '/',
    initErr : {
        email: '',
        password:''
    }
};

const auth = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START :
            return{
                ...state,
                loading:true,
                error: {...state.initErr}
            };
        case actionTypes.AUTH_SUCCESS :
            return {
                ...state,
                token : action.token,
                userId: action.userId,
                loading: false,
                error : {...state.initErr}

            };

        case actionTypes.AUTH_FAIL :
            let error = action.error;
            if(typeof action.error !== 'undefined'){

                if (typeof action.error.response !== "undefined"){
                    error = action.error.response.data;
                }
            }

            return {
                ...state,
                error: error,
                loading: false
            };
        case actionTypes.AUTH_LOGOUT :
            return {
                ...state,
                token: null,
                userId: null,
                error: {...state.initErr}
            };
        case actionTypes.UPDATE_BALANCE_REQUEST :
            let updatedUser = {
                ...state.userId
            };
            let updatedAgency = {
                ...updatedUser.agency
            };
            updatedAgency.balance = action.balance;
            updatedUser.agency = updatedAgency;
            console.log(updatedUser,action.balance);
            let agencyData = JSON.parse(localStorage.getItem('userId'));
            agencyData.agency.balance = action.balance;
            localStorage.setItem('userId',JSON.stringify(agencyData));
            return {
                ...state,
                userId: updatedUser
            };
        default : return state;
    }
};
export default auth;