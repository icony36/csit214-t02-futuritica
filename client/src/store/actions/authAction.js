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

export const signIn = (userData, history) => async dispatch => {
   try{
        const res = await apiCall("post", `/api/auth/signin`, userData);

        localStorage.setItem("jwtToken", res.token);
        setAuthToken(res.token);

        dispatch(setCurrentUser(res.user));
        dispatch(removeError());

        history.push('/');
   } catch(err){
        dispatch(addError(err));
   }
}

export const signUp = (userData, history) => async dispatch => {
    try{
         const res = await apiCall("post", `/api/auth/signup`, userData);
         
         console.log(res);
         dispatch(removeError());
 
         history.push('/');
    } catch(err){
         dispatch(addError(err));
    }
}

export const logout = history => async (dispatch, getState) => {
    let { auth } = getState();

    const id = auth.user.id;

    const res = await apiCall("put", `/api/auth/logout/${id}`);
    
    console.log(res);
    localStorage.clear();
    setAuthToken(false);

    dispatch(setCurrentUser({}));
    history.push('/');
}
    
