import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navbar from './Navbar';
import HomePage from "./HomePage";
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";
import ProfilePage from './ProfilePage';
import RoomNewPage from './RoomNewPage';
import RoomEditPage from './RoomEditPage';
import RoomPage from './RoomPage';
import UserPage from './UserPage';
import UserEditPage from './UserEditPage';
import withAuth from "../hocs/withAuth";
import { ROLE, PAGE_TYPES } from "../constants";

const App = () => {

    return(
        <BrowserRouter>
            <div>
                <Navbar />                    
                <Route exact path="/" component={HomePage} />
                <div className="container">
                <Switch>
                    <Route exact path="/signin" component={withAuth(SignInPage, PAGE_TYPES.auth)}/>
                    <Route exact path="/signup" component={withAuth(SignUpPage, PAGE_TYPES.role, ROLE.admin)}/>
                    <Route exact path="/profile" component={withAuth(ProfilePage, PAGE_TYPES.private)}/>
                    <Route exact path="/room/new" component={withAuth(RoomNewPage, PAGE_TYPES.role,ROLE.staff)}/>
                    <Route exact path="/room/:id" component={withAuth(RoomPage, PAGE_TYPES.private)}/>
                    <Route exact path="/room/:id/edit" component={withAuth(RoomEditPage, PAGE_TYPES.role,ROLE.staff)}/>
                    <Route exact path="/user/:id/" component={withAuth(UserPage, PAGE_TYPES.role, ROLE.admin)}/>
                    <Route exact path="/user/:id/edit" component={withAuth(UserEditPage, PAGE_TYPES.role,ROLE.admin)}/>
                </Switch>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;