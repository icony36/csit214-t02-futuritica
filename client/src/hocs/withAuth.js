import React, { useEffect } from 'react';
import { connect } from 'react-redux';


const withAuth = (Component, allowedRole, isAuth) => {
    const Authenticate = props => {
        useEffect(() => {
            if(!props.auth.isAuthenticated){
                props.history.push("/signin");
            }
            else if(isAuth){
                props.history.push("/");
            }
            else if( allowedRole && allowedRole !== props.auth.user.role){
                props.history.push("/");
            }
        }, []);
        
        return <Component {...props}/>
    }

    return connect(mapStateToProps)(Authenticate);
}

const mapStateToProps = state => (
    {
        auth: state.auth
    }
)

export default withAuth;