import React from 'react';
import Message from './Message';

const SignUpForm = props => {
    
    const { email, password, errors, username, role, handleChange } = props;

    return(
        <>
            <Message type='error' errors={errors}/>
            
            <label htmlFor='email'>Email (required):</label>
            <input 
                className='form-control' 
                id='email' 
                name='email' 
                onChange={handleChange} 
                value={email} 
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
            <label htmlFor='username'>Username (required):</label>
            <input 
                className='form-control' 
                id='username' 
                name='username' 
                onChange={handleChange} 
                value={username} 
                type="text" 
            />
            <label htmlFor='role'>Role (required):</label>
            <select 
                className='form-control' 
                id='role' 
                name='role' 
                onChange={handleChange} 
                value={role}
            >
                <option value="" disabled hidden>Choose...</option>
                <option value="student">
                    Student
                </option>
                <option value="staff">
                    Staff
                </option>
            </select>
        </>
    )
}

export default SignUpForm;