import { apiCall } from '../../services/api';
import { addError } from './errorAction';

export const updateUser = user => async (dispatch, getState) => {
    let { auth } = getState();

    const id = auth.user.id;

    try{
        const res = await apiCall("put", `/api/common/user/${id}`, {user});

    } catch(err){
        dispatch(addError(err));
    }  
}