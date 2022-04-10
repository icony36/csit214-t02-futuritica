import {apiCall} from '../../services/api';
import { SET_CURRENT_USER } from '../actionTypes';
import { addError, removeError } from './errorAction';

export function setCurrentUser(user){
    return {
        type: SET_CURRENT_USER,
        user
    };
}

export const authUser = (type, userData) => async dispatch => {
   try{
        const res = await apiCall("post", `/api/auth/${type}`, userData);

        localStorage.setItem("jwtToken", res.token);
        dispatch(setCurrentUser(res.user));
        dispatch(removeError());
   } catch(err){
        dispatch(addError(err));
        console.log(err);
   }
}
    
