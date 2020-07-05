import * as actionTypes from '../actionTypes';
import evisaAxios from "../../../evisaAxios";

export const startInitDestinations = () => {
    return {
        type : actionTypes.START_INIT_DESTINATIONS
    }
};

export const initDestinations = (searchQuery) => {
    return dispatch => {
        dispatch(startInitDestinations());
        evisaAxios.get('search/destinations',{params : {...searchQuery}}).then(res => {
            const destinations = res.data.destinations.map(destination => {
                return {label : destination.name,value: '' + destination.id}
            });
            dispatch(initDestinationsSuccess(destinations));
        }).catch(err => {
            dispatch(initDestinationsFailed(err));
        });

    }
};

export const initDestinationsSuccess = (destinations) => {
    return {
        type : actionTypes.INIT_DESTINATIONS_SUCCESS,
        destinations : destinations,
    }
};

export const initDestinationsFailed = (err) => {
    return {
        type : actionTypes.INIT_DESTINATIONS_FAILED,
        err : err
    }
};