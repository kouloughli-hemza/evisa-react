import * as actionTypes from '../actionTypes';
import evisaAxios from "../../../evisaAxios";
export const startGettingEvisaTypes = () => {
        return {
            type : actionTypes.START_GETTING_EVISA_TYPES
        }
};

export const gettingEvisaTypes = (country) => {
    return dispatch => {
        dispatch(startGettingEvisaTypes());
        const data = {
            country : country
        };
        evisaAxios.post('evisaData/visaType',data)
            .then(res => {
                const evisaTypes = res.data.types.map(type => {
                   return { label : type.visa_type,value : type.visa_type}
                });
                evisaTypes.push({label:'Veuillez sélectionner',value: '',disabled :true,selected:true});
                dispatch(gettingEvisTypesSuccess(evisaTypes))
            }).catch(err =>  {
                dispatch(gettingEvisaTypeFailed(err));
        });
    }
};

export const evisaTypes = (data) => {
    return dispatch => {
        dispatch(startGettingEvisaTypes());
        evisaAxios.get('search/evisaType',{params:{...data}}).then(res => {
            const evisaTypes = res.data.types.map(type => {
                return {label : type.visa_type,value: type.visa_type}
            });
            dispatch(gettingEvisTypesSuccess(evisaTypes));
        }).catch(err => {
            dispatch(gettingEvisaTypeFailed(err));
        });
    }
};


export const gettingEvisTypesSuccess = (data) => {
    return {
        type : actionTypes.GETTING_EVISA_TYPES_SUCCESS,
        evisaTypes : data
    }
};

export const gettingEvisaTypeFailed = err => {
    return {
        type: actionTypes.GETTING_EVISA_TYPES_FAILED,
        err : err
    }
};