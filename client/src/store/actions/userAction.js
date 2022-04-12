import { apiCall } from '../../services/api';
import { addError, removeError } from './errorAction';
import { LOAD_USER_DETAILS } from '../actionTypes';

export const loadUserDetails = userDetails => ({
    type: LOAD_USER_DETAILS,
    userDetails
})

export const fetchUserDetails = () => async (dispatch, getState) => {
    let { auth } = getState();

    const id = auth.user.id;

    try{
        const res = await apiCall("get", `/api/common/user/${id}`);

        dispatch(loadUserDetails(res));
        dispatch(removeError());
   } catch(err){
        dispatch(addError(err));
   }
}


export const updateUser = user => async (dispatch, getState) => {
    let { auth } = getState();

    const id = auth.user.id;

    try{
        const res = await apiCall("put", `/api/common/user/${id}`, user);

        console.log(res);
    } catch(err){
        dispatch(addError(err));
    }  
}