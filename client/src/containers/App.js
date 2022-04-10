import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import { connect } from "react-redux";

import Navbar from './Navbar';
import HomePage from "./HomePage";
import AuthPage from "./AuthPage";
import * as actions from "../store/actions";

const App = props => {
    const {  auth, errors, authUser, removeError } = props;

    return(
        <BrowserRouter>
            <div>
                <Navbar />                    
                <div className="container">
                    <Switch>
                        <Route exact path="/" render={props=> <HomePage auth={auth} {...props} />} />
                        <Route exact path="/signin"  render={props=> {
                            return(
                                <AuthPage onAuth={authUser} errors={errors} removeError={removeError} buttonText="Sign In" heading="Sign In" {...props}/>
                            )
                        }} />
                        <Route exact path="/signup" render={props=> {
                            return(
                                <AuthPage onAuth={authUser} errors={errors} removeError={removeError} signUp buttonText="Sign Up" heading="Sign Up" {...props}/>
                            )
                        }} />
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    );
}

const mapStateToProps = state => (
    {    
        auth: state.auth,
        errors: state.errors  
    }
)

export default connect(mapStateToProps, actions)(App);