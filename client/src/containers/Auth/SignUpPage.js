import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signUp, removeMessage } from '../../store/actions';
import Message from '../../components/Message';
import Loading from '../../components/Loading';


const SignUpPage = ({history}) => {
    const messages = useSelector(state => state.messages);
    const loading = useSelector(state => state.loading);
    
    const dispatch = useDispatch();
    
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        role: ""
    })

    const handleChange = e => {
        setFormData(prevState => (
            {
                ...prevState,
                [e.target.name]: e.target.value
            }
        ))
    }

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(signUp(formData));
    }

    if(messages.message){
        const unlisten = history.listen(() => {
            dispatch(removeMessage());
            unlisten()
        })
    }

    return(
        <div>
            <div className='row justify-content-md-center'>
                <div className='col-md-4'>
                    <div className='card'>
                        <div className='card-body text-center'>
                            <h1 className='class-title'>Create User</h1>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className='card-body'>
                                {loading.isLoading ?
                                <Loading small/> :
                                <>
                                    <Message messages={messages}/>
                                    
                                    <label htmlFor='username'>Username (required):</label>
                                    <input 
                                        className='form-control' 
                                        id='username' 
                                        name='username' 
                                        onChange={handleChange} 
                                        value={formData.username} 
                                        type="text" 
                                    />

                                    <label htmlFor='password'>Password (required):</label>
                                    <input 
                                        className='form-control' 
                                        id='password' 
                                        name='password' 
                                        onChange={handleChange} 
                                        type="password" 
                                    />

                                    <label htmlFor='role'>Role (required):</label>
                                    <select 
                                        className='form-control' 
                                        id='role' 
                                        name='role' 
                                        onChange={handleChange} 
                                        value={formData.role}
                                    >
                                        <option value="" disabled hidden>Choose...</option>
                                        <option value="student">
                                            Student
                                        </option>
                                        <option value="staff">
                                            Staff
                                        </option>
                                    </select>
                                    <div className='card-body text-center'>
                                        <button type="submit" className='btn btn-primary btn-block btn-lg'>Create User</button>
                                    </div>
                                    </>
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage;