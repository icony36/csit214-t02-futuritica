import React from "react";
import {Switch, Route, withRouter, Redirect} from 'react-router-dom';
import { connect } from "react-redux";

import Landing from "../components/Landing";
import AuthForm from "../components/AuthForm";
import { authUser } from "../store/actions/authAction";

const Main = props => {
   const { authUser } = props;
   
    return(
        <div className="container">
            <Switch>
                <Route exact path="/" render={props=> <Landing {...props} />} />
                <Route exact path="/signin" render={props=> {
                    return(
                        <AuthForm onAuth={authUser} buttonText="Sign In" heading="Sign In" {...props}/>
                    )
                }} />
                 <Route exact path="/signup" render={props=> {
                    return(
                        <AuthForm signUp onAuth={authUser} buttonText="Sign Up" heading="Sign Up" {...props}/>
                    )
                }} />
            </Switch>

        </div>
    );
}

function mapStateToProps(state){
    return {
        currentUser: state.currentUser
    }
}

export default withRouter(connect(mapStateToProps, { authUser })(Main));