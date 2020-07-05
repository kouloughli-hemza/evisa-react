import * as actionTypes from '../actionTypes';
import evisaAxios from "../../../evisaAxios";
export const startGettingEvisaSettings = () => {
    return {
        type : actionTypes.START_GETTING_EVISA_SETTINGS
    }
};

export const gettingEvisaSettings = (country,type) => {
    return dispatch => {
        dispatch(startGettingEvisaSettings());
        const data = {
            country : country,
            type : type
        };
        evisaAxios.post('evisaData/visaType/settings',data)
            .then(res => {
                const evisaSettings = res.data.settings;
                dispatch(gettingEvisSettingsSuccess(evisaSettings))
            }).catch(err =>  {
            dispatch(gettingEvisaSettingsFailed(err));
        });
    }
};

export const gettingEvisSettingsSuccess = (data) => {
    return {
        type : actionTypes.GETTING_EVISA_SETTINGS_SUCCESS,
        evisaSettings : data
    }
};

export const gettingEvisaSettingsFailed = err => {
    return {
        type: actionTypes.GETTING_EVISA_SETTINGS_FAILED,
        err : err
    }
};

export const handleEvisaSettingModal = status => {
    return {
        type : actionTypes.HANDLE_EVISA_SETTINGS_MODAL,
        status : status
    }
};