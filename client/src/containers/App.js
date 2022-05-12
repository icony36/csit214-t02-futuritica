import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navbar from './Navbar';
import HomePage from "./HomePage";
import SignInPage from "./Auth/SignInPage";
import SignUpPage from "./Auth/SignUpPage";
import ProfilePage from './Profile/ProfilePage';
import RoomNewPage from './Room/RoomNewPage';
import RoomEditPage from './Room/RoomEditPage';
import RoomPage from './Room/RoomPage';
import UserPage from './User/UserPage';
import UserEditPage from './User/UserEditPage';
import BookingNewPage from './Booking/BookingNewPage';
import BookingPage from './Booking/BookingPage';
import BookingEditPage from './Booking/BookingEditPage';
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
                    <Route exact path="/room/:id/booking" component={withAuth(BookingNewPage, PAGE_TYPES.role, ROLE.student)}/>
                    <Route exact path="/booking/:id/" component={withAuth(BookingPage, PAGE_TYPES.role, ROLE.student)}/>
                    <Route exact path="/booking/:id/edit" component={withAuth(BookingEditPage, PAGE_TYPES.role, ROLE.student)}/>
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