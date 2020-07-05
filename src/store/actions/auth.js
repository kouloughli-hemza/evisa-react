import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';
import moment from "moment";
export const authStart = () =>  {
    return{
        type : actionTypes.AUTH_START,
    }
};

export const auth = (email,password) => {
    return dispatch => {
        dispatch(authStart());
        const userData = {
            username:email,
            password:password,
        };
        //let url = 'https://app.caravane2.com/api/login';
        let url = 'http://127.0.0.1/Caravane/B2B/api/login';

        axios.post(url,userData)
            .then(res => {
                const timestamp = moment.unix(res.data.expiresIn);
                const now = moment.now();
                const expirationDate = timestamp.toDate();

                const expiresIn = moment(expirationDate).diff(now,'seconds');

                localStorage.setItem('token',res.data.token);
                localStorage.setItem('userId',JSON.stringify(res.data.agency));
                localStorage.setItem('expirationDate',expirationDate);
                dispatch(authSuccess(res.data.token,res.data.agency));
                dispatch(logOut(expiresIn));
            })
            .catch(err => {
                dispatch(authFail(err));
            })
    }
};
export const logOutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};
export const logOut = (expiryTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logOutUser());
        },expiryTime * 1000);
    }
};

export const authSuccess = (token,userId) => {
    return {
        type : actionTypes.AUTH_SUCCESS,
        token: token,
        userId : userId
    }
};

export const authFail = (err) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: err
    }
};



export const AutoLoginUser = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logOutUser());
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate > new Date()){
                // success
                const userId = JSON.parse(localStorage.getItem('userId'));
                const expiresIn = (expirationDate.getTime() - new Date().getTime()) / 1000;
                dispatch(authSuccess(token,userId));
                dispatch(logOut(expiresIn));
            }else{
                //Fail
                dispatch(logOutUser());
            }
        }
    }
};