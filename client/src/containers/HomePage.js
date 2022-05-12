import React from 'react';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { ROLE } from "../constants";
import RoomList from './Room/RoomList';
import UserList from './User/UserList';

const HomePage = () => {
    const auth  = useSelector(state => state.auth);
    
    if(auth.isAuthenticated){
        if(auth.user.role === ROLE.admin)
        {
            return(
            <div className='contianer'>
                <UserList />
            </div>
            )
        }
        
        return(
            <div className='container'>
               <RoomList />
            </div>
        )
    }

    return(
        <div className='landing-hero'>
            <h1 className='display-1' >Futuristica</h1>
            <p className='lead'>A room booking system for CSIT214 group project</p>
            <div style={{marginTop: '2rem'}}>
                <Link to="/signin" className="btn btn-primary">Sign In Now</Link>
            </div>
        </div>
    )
}

export default HomePage;