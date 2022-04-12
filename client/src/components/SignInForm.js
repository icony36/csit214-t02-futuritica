import React from 'react';
import Message from './Message';

const SignInForm = props => {
    const { email, password, errors, handleChange } = props;

    return(
        <>
            <Message type='error' errors={errors}/>
            
            <label htmlFor='email'>Email:</label>
            <input 
                className='form-control' 
                id='email' 
                name='email' 
                onChange={handleChange} 
                value={email} 
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
        </>
    )
}

export default SignInForm;