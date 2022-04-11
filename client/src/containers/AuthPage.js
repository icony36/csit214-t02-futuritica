import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authUser, removeError } from '../store/actions';
import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';

const AuthPage = ({heading, buttonText, isSignUp, history}) => {
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
        const authType = isSignUp ? 'signup' : 'signin'; 
        dispatch(authUser(authType, formData, history));
    }

    if(errors.message){
        const unlisten = history.listen(() => {
            dispatch(removeError());
            unlisten()
        })
    }
    return(
        <div>
            <div className='row justify-content-md-center text-center'>
                <div className='col-md-6'>
                    <h2>{heading}</h2>
                    <form onSubmit={handleSubmit}>
                        {isSignUp ? 
                            <SignUpForm handleChange={handleChange} errors={errors} email={formData.email} username={formData.username} password={formData.password} role={formData.role}/> 
                            : <SignInForm handleChange={handleChange} errors={errors} email={formData.email} password={formData.password} />}
                        <button type="submit" className='btn btn-primary btn-block btn-lg' style={{marginTop: "2rem"}}>{buttonText}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AuthPage;