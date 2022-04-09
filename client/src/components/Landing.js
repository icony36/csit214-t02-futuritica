import React from 'react';
import {Link} from 'react-router-dom';

const Landing = () => {
    return(
        <div className='landing-hero'>
            <h1 style={{fontWeight: "bold"}}>Futuristica</h1>
            <h4 className='subtitle'>Room Booking System</h4>
            <Link to="/signup" className="btn btn-primary">Sign Up</Link>
        </div>
    )
}

export default Landing;