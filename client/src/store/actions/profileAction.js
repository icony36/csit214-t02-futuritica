import { apiCall } from '../../services/api';
import { addError, removeError } from './errorAction';
import { LOAD_PROFILE } from '../actionTypes';

export const loadProfile = profile => ({
    type: LOAD_PROFILE,
    profile
})

export const fetchProfile = () => async (dispatch, getState) => {
    let { auth } = getState();

    const id = auth.user.id;

    try{
        const res = await apiCall("get", `/api/common/user/${id}`);

        dispatch(loadProfile(res));
        dispatch(removeError());
   } catch(err){
        if(err){
            dispatch(addError(err));
        }
        else{
            console.log(err);
        }
   }
}

export const updateProfile = profile => async (dispatch, getState) => {
    let { auth } = getState();

    const id = auth.user.id;

    try{
        const res = await apiCall("put", `/api/common/user/${id}`, profile);

        console.log(res);
    } catch(err){
        dispatch(addError(err));
    }  
}