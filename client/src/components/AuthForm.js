import React, {Component} from 'react';

class AuthForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: "",
            password: "",
            role: ""
        };
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        const authType = this.props.signUp ? 'signup' : 'signin';
        this.props.onAuth(authType, this.state).then(() => {
            console.log("Logged in");
        })
    }

    render(){
        const {email, username, password, role} = this.state
        const {heading, buttonText, signUp, history, errors, removeError} = this.props;

        history.listen(() =>  removeError());

        return(
            <div>
                <div className='row justify-content-md-center text-center'>
                    <div className='col-md-6'>
                        <form onSubmit={this.handleSubmit}>
                            <h2>{heading}</h2>

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
                                onChange={this.handleChange} 
                                value={email} 
                                type="text" 
                            />
                            <label htmlFor='password'>Password:</label>
                            <input 
                                className='form-control' 
                                id='password' 
                                name='password' 
                                onChange={this.handleChange} 
                                type="password" 
                            />

                            {signUp && (
                                <>
                                    <label htmlFor='username'>Username:</label>
                                    <input 
                                        className='form-control' 
                                        id='username' 
                                        name='username' 
                                        onChange={this.handleChange} 
                                        value={username} 
                                        type="text" 
                                    />
                                    <label htmlFor='role'>Role:</label>
                                    <input 
                                        className='form-control' 
                                        id='role' 
                                        name='role' 
                                        onChange={this.handleChange} 
                                        type="text" 
                                    />
                                </>
                            )}

                            <button type="submit" className='btn btn-primary btn-block btn-lg'>{buttonText}</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default AuthForm;