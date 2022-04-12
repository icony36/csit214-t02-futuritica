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
            <h1 className='display-1' >Futuristica</h1>
            <p className='lead'>A room booking system for CSIT214 group project</p>
            <div style={{marginTop: '2rem'}}>
                <Link to="/signup" className="btn btn-primary">Sign Up Now</Link>
            </div>
        </div>
    )
}

export default HomePage;