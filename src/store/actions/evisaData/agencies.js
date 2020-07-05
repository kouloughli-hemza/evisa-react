import * as actionTypes from '../actionTypes';
import evisaAxios from "../../../evisaAxios";

export const startInitAgencies = () => {
    return {
        type : actionTypes.START_INIT_AGENCIES
    }
};

export const initAgencies = (data) => {
    return dispatch => {
        dispatch(startInitAgencies());
        evisaAxios.get('search/agencies',{params:{...data}}).then(res => {
            const agencies = res.data.agencies.map(agency => {
                return {label : agency.name,value: '' + agency.id}
            });
            dispatch(initAgenciesSuccess(agencies));
        }).catch(err => {
            dispatch(initAgenciesFailed(err));
        });
    }
};

export const initAgenciesSuccess = (agencies) => {
    return {
        type : actionTypes.INIT_AGENCIES_SUCCESS,
        agencies : agencies,
    }
};

export const initAgenciesFailed = (err) => {
    return {
        type : actionTypes.INIT_AGENCIES_FAILED,
        err : err
    }
};