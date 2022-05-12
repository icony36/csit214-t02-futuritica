import { apiCall } from '../../services/api';
import { addError, removeMessage } from './messageAction';
import { addLoading, removeLoading } from './loadingAction';
import { LOAD_PROFILE } from '../actionTypes';

export const loadProfile = profile => ({
    type: LOAD_PROFILE,
    profile
})

export const fetchProfile = () => async (dispatch, getState) => {
    let { auth } = getState();

    const id = auth.user.id;

    try{
        dispatch(removeMessage());
        dispatch(addLoading());
        const res = await apiCall("get", `/api/common/user/${id}`);
        dispatch(removeLoading());

        dispatch(loadProfile(res));
        dispatch(removeMessage());
   } catch(err){
        dispatch(removeLoading());    
    
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
        dispatch(removeMessage());
        dispatch(addLoading());
        const res = await apiCall("put", `/api/common/user/${id}`, profile);
        dispatch(removeLoading());

        console.log(res);
    } catch(err){
        dispatch(removeLoading());
        dispatch(addError(err));
    }  
}