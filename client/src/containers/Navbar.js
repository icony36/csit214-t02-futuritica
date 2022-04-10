import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store/actions';

const Navbar = () => {
    const auth = useSelector(state => state.auth);
    
    const dispatch = useDispatch();
    
    const handleLogout = e => {
        e.preventDefault();
        dispatch(logout());
    }
      
    return(
        <nav className='navbar navbar-dark navbar-expand'>
            <div className="container-fluid">
                <Link to="/" className='navbar-brand'>
                    Futuristica
                </Link>
                {auth.isAuthenticated ? (
                <ul className='nav navbar-nav navbar-right'>    
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                        <a style={{color: 'white'}} onClick={handleLogout}>Log out</a>
                    </li>
                </ul>       
                ) : (
                <ul className='nav navbar-nav navbar-right'>    
                    <li>
                        <Link to="/signup">Sign up</Link>
                    </li>
                    <li>
                        <Link to="/signin">Sign in</Link>
                    </li>
                </ul>
                )
                }
            </div>
        </nav>
    )
}


export default Navbar