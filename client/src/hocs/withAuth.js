import React, { useEffect } from 'react';
import { connect } from 'react-redux';

const withAuth = (Component, allowedRole) => {
    const Authenticate = props => {
        useEffect(() => {
            if(!props.auth.isAuthenticated){
                props.history.push("/signin");
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
        auth: state.auth,
        erros: state.errors
    }
)

export default withAuth;