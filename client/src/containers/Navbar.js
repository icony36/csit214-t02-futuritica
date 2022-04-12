import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ROLE } from '../constants';

const Navbar = () => {
    const auth = useSelector(state => state.auth);
      
    return(
        <nav className='navbar navbar-dark navbar-expand'>
            <div className="container-fluid">
                <Link to="/" className='navbar-brand'>
                    Futuristica
                </Link>
                {auth.isAuthenticated && (
                <ul className='nav navbar-nav navbar-right'>    
                    {auth.user.role === ROLE.staff && 
                     <li>
                        <Link to="/room/new">Create room</Link>
                    </li>
                    }
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                </ul>
                )}
            </div>
        </nav>
    )
}


export default Navbar