import * as actionTypes from '../actionTypes';
import evisaAxios from "../../../evisaAxios";

export const startInitNationality = () => {
    return {
        type : actionTypes.START_INIT_NATIONALITY
    }
};

export const initNationality = () => {
    return dispatch => {
        dispatch(startInitNationality());

        evisaAxios.get('evisaData').then(res => {

            const nationalities = res.data.nationalities.map(nationality => {
                return {label : nationality.citizenship,value: '' + nationality.id}
            });

            const countries = res.data.countries.map(country => {
                return {label : country.country.name_fr,value: '' + country.country.id}
            });
            countries.push({label:'Veuillez sélectionner',value: '',disabled:true,selected :true});
            dispatch(initNationalitySuccess(nationalities,countries));
        }).catch(err => {
            dispatch(initNationalitiesFailed(err));
        });

    }
};

export const initNationalitySuccess = (nationalities,countries) => {
    return {
        type : actionTypes.INIT_NATIONALITY_SUCCESS,
        nationalities : nationalities,
        countries : countries
    }
};

export const initNationalitiesFailed = (err) => {
    return {
        type : actionTypes.INIT_NATIONALITY_FAILED,
        err : err
    }
};