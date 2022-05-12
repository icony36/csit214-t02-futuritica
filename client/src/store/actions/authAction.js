import { apiCall, setTokenHeader} from '../../services/api';
import { SET_CURRENT_USER } from '../actionTypes';
import { addError, addSuccess, removeMessage } from './messageAction';
import { addLoading, removeLoading } from './loadingAction';

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
        dispatch(removeMessage());    
        dispatch(addLoading());    
        const res = await apiCall("post", `/api/auth/signin`, userData);
        dispatch(removeLoading());

        localStorage.setItem("jwtToken", res.token);
        setAuthToken(res.token);

        dispatch(setCurrentUser(res.user));
        dispatch(removeMessage());

        history.push('/');
   } catch(err){
        dispatch(removeLoading());
        dispatch(addError(err));
   }
}

export const signUp = (userData) => async dispatch => {
    try{
        dispatch(removeMessage());
        dispatch(addLoading());
        const res = await apiCall("post", `/api/auth/signup`, userData);
        dispatch(removeLoading());

        dispatch(addSuccess({message: "User successfully created."}));
    } catch(err){
        dispatch(removeLoading());
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
    
