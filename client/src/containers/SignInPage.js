import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { signIn, removeError } from '../store/actions';
import Message from '../components/Message';

const SignInPage = ({isSignUp, history}) => {
    const errors = useSelector(state => state.errors);
    
    const dispatch = useDispatch();
    
    const [formData, setFormData] = useState({
        email: "",
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

    if(errors.message){
        const unlisten = history.listen(() => {
            dispatch(removeError());
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
                                <Message type='error' errors={errors}/>
            
                                <label htmlFor='email'>Email:</label>
                                <input 
                                    className='form-control' 
                                    id='email' 
                                    name='email' 
                                    onChange={handleChange} 
                                    value={formData.email} 
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
        </div>
    )
}

export default SignInPage;