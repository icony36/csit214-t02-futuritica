import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signUp, removeError } from '../store/actions';
import Message from '../components/Message';


const SignUpPage = ({isSignUp, history}) => {
    const errors = useSelector(state => state.errors);
    
    const dispatch = useDispatch();
    
    const [formData, setFormData] = useState({
        email: "",
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
        dispatch(signUp(formData, history));
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
                            <h1 className='class-title'>Create User</h1>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className='card-body'>
                                <Message type='error' errors={errors}/>
                                
                                <label htmlFor='email'>Email (required):</label>
                                <input 
                                    className='form-control' 
                                    id='email' 
                                    name='email' 
                                    onChange={handleChange} 
                                    value={formData.email} 
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
                                    value={formData.username} 
                                    type="text" 
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
                            </div>
                            <div className='card-body text-center'>
                                <button type="submit" className='btn btn-primary btn-block btn-lg'>Create User</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage;