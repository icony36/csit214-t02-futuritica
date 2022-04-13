import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navbar from './Navbar';
import HomePage from "./HomePage";
import AuthPage from "./AuthPage";
import ProfilePage from './ProfilePage';
import RoomNewPage from './RoomNewPage';
import RoomEditPage from './RoomEditPage';
import RoomPage from './RoomPage';
import withAuth from "../hocs/withAuth";
import { ROLE, PAGE_TYPES } from "../constants";

const App = () => {

    return(
        <BrowserRouter>
            <div>
                <Navbar />                    
                <Switch>
                <Route exact path="/" component={HomePage} />
                <div className="container">
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
                    <Route exact path="/profile" component={withAuth(ProfilePage, PAGE_TYPES.private)}/>
                    <Route exact path="/room/new" component={withAuth(RoomNewPage, PAGE_TYPES.role,ROLE.staff)}/>
                    <Route exact path="/room/:id" component={withAuth(RoomPage, PAGE_TYPES.private)}/>
                    <Route exact path="/room/:id/edit" component={withAuth(RoomEditPage, PAGE_TYPES.role,ROLE.staff)}/>
                </div>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;