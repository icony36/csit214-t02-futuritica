import React from 'react';

const SignUpForm = props => {
    
    const { email, password, errors, username, role, handleChange } = props;

    return(
        <>
             {errors.message && 
                <div className='alert alert-danger'>
                    {errors.message}
                </div>
            }
            
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
            <label htmlFor='username'>Username:</label>
            <input 
                className='form-control' 
                id='username' 
                name='username' 
                onChange={handleChange} 
                value={username} 
                type="text" 
            />
            <label htmlFor='role'>Role:</label>
            <input 
                className='form-control' 
                id='role' 
                name='role' 
                onChange={handleChange} 
                value={role}
                type="text" 
            />
        </>
    )
}

export default SignUpForm;