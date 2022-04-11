import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navbar from './Navbar';
import HomePage from "./HomePage";
import AuthPage from "./AuthPage";
import ProfilePage from './ProfilePage';
import RoomNewPage from './RoomNewPage';
import withAuth from "../hocs/withAuth";

const App = () => {

    return(
        <BrowserRouter>
            <div>
                <Navbar />                    
                <div className="container">
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route exact path="/signin"  render={props=> {
                            return(
                                <AuthPage buttonText="Sign In" heading="Sign In" {...props}/>
                            )
                        }} />
                        <Route exact path="/signup" render={props=> {
                            return(
                                <AuthPage isSignUp buttonText="Sign Up" heading="Sign Up" {...props}/>
                            )
                        }} />
                        <Route exact path="/room/new" component={RoomNewPage}/>
                        <Route exact path="/profile" component={ProfilePage}/>
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;