import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    logout = e => {
        e.preventDefault();
        this.props.logout();
    }
      
    render(){
        return(
            <nav className='navbar navbar-dark navbar-expand'>
                <div className="container-fluid">
                    <Link to="/" className='navbar-brand'>
                        Futuristica
                    </Link>
                    {this.props.auth.isAuthenticated ? (
                    <ul className='nav navbar-nav navbar-right'>    
                        <li>
                            <Link to="/">Profile</Link>
                        </li>
                        <li>
                            <a style={{color: 'white'}} onClick={this.logout}>Log out</a>
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
}


export default Navbar