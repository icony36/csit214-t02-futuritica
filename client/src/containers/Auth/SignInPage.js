import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signIn, removeMessage } from '../../store/actions';
import Message from '../../components/Message';
import Loading from '../../components/Loading';

const SignInPage = ({history}) => {
    const messages = useSelector(state => state.messages);
    const loading = useSelector(state => state.loading);

    const dispatch = useDispatch();
    
    const [formData, setFormData] = useState({
        username: "",
        password: ""
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
        dispatch(signIn(formData, history));
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
                            <h1 className='class-title'>Sign In</h1>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className='card-body'>
                                <Message messages={messages}/>
            
                                <label htmlFor='username'>Username:</label>
                                <input 
                                    className='form-control' 
                                    id='username' 
                                    name='username' 
                                    onChange={handleChange} 
                                    value={formData.username} 
                                    type="text" 
                                />
                                <label htmlFor='password'>Password:</label>
                                <input 
                                    className='form-control' 
                                    id='password' 
                                    name='password' 
                                    onChange={handleChange} 
                                    type="password" 
                                />
                            </div>
                            <div className='card-body text-center'>
                                <button type="submit" className='btn btn-primary btn-block btn-lg'>Sign In</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Loading loading={loading}/>
        </div>
    )
}

export default SignInPage;