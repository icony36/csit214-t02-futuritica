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
            <p className='subtitle'>A room booking system for CSIT214</p>
            <div style={{marginTop: '2rem'}}>
                <Link to="/signin" className="btn btn-primary">Sign In Here</Link>
            </div>
        </div>
    )
}

export default HomePage;