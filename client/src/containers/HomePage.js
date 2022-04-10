import React from 'react';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';

import RoomList from './RoomList';

const HomePage = () => {
    const auth  = useSelector(state => state.auth);
    
    if(auth.isAuthenticated){
        return(
            <div>
               <RoomList />
            </div>
        )
    }

    return(
        <div className='landing-hero'>
            <h1 style={{fontWeight: "bold"}}>Futuristica</h1>
            <h4 className='subtitle'>Room Booking System</h4>
            <Link to="/signup" className="btn btn-primary">Sign Up</Link>
        </div>
    )
}

export default HomePage;