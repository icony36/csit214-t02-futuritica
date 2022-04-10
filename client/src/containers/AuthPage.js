import React, {Component} from 'react';
import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';

class AuthPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: "",
            password: "",
            role: ""
        };

        this.handleChange = this.handleChange.bind();
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        const authType = this.props.signUp ? 'signup' : 'signin'; 
        this.props.onAuth(authType, this.state, this.props.history);
    }


    render(){
        const {email, username, password, role} = this.state
        const {heading, buttonText, signUp, errors, removeError, history} = this.props;

        if(errors.message){
            const unlisten = history.listen(() => {
                removeError()
                unlisten()
            })
        }
        return(
            <div>
                <div className='row justify-content-md-center text-center'>
                    <div className='col-md-6'>
                        <h2>{heading}</h2>
                        <form onSubmit={this.handleSubmit}>
                            {signUp ? 
                                <SignUpForm handleChange={this.handleChange} errors={errors} email={email} username={username} password={password} role={role}/> 
                                : <SignInForm handleChange={this.handleChange} errors={errors} email={email} password={password} />}
                            <button type="submit" className='btn btn-primary btn-block btn-lg' style={{marginTop: "2rem"}}>{buttonText}</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default AuthPage;