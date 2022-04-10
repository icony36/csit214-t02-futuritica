import { apiCall, setTokenHeader} from '../../services/api';
import { SET_CURRENT_USER } from '../actionTypes';
import { addError, removeError } from './errorAction';

export function setCurrentUser(user){
    return {
        type: SET_CURRENT_USER,
        user
    };
}

export const setAuthToken = token => {
    setTokenHeader(token);
}


export const authUser = (type, userData, history) => async dispatch => {
   try{
        const res = await apiCall("post", `/api/auth/${type}`, userData);

        localStorage.setItem("jwtToken", res.token);
        setAuthToken(res.token);

        dispatch(setCurrentUser(res.user));
        dispatch(removeError());

        history.push('/');
   } catch(err){
        dispatch(addError(err));
   }
}

export const logout = () => dispatch => {
    localStorage.clear();
    setAuthToken(false);

    dispatch(setCurrentUser({}));
}
    
