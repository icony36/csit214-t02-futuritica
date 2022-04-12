import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { authUser, removeError } from '../store/actions';
import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';
import withAuth from "../hocs/withAuth";

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
            <div className='row justify-content-md-center'>
                <div className='col-md-4'>
                    <div className='card'>
                        <div className='card-body text-center'>
                            <h1 className='class-title'>{heading}</h1>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className='card-body'>
                                {isSignUp ? 
                                    <SignUpForm handleChange={handleChange} errors={errors} email={formData.email} username={formData.username} password={formData.password} role={formData.role}/> 
                                    : <SignInForm handleChange={handleChange} errors={errors} email={formData.email} password={formData.password} />}
                            </div>
                            <div className='card-body text-center'>
                                <button type="submit" className='btn btn-primary btn-block btn-lg'>{buttonText}</button>
                            </div>
                        </form>
                        <div className='card-body text-center card-link'>
                            {isSignUp?
                                <Link to='signin'>Already have an account? Sign in instead!</Link> :
                                <Link to='signup'>Don't have an account? Sign up here!</Link>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withAuth(AuthPage, null, true);