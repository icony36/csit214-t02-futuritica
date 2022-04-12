import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { PAGE_TYPES } from '../constants';


const withAuth = (Component, type, allowedRole) => {
    const Authenticate = props => {
        useEffect(() => {
            switch(type){
                case PAGE_TYPES.auth:
                    if(props.auth.isAuthenticated){
                        props.history.push("/");
                    }
                    break;
                case PAGE_TYPES.private:
                    if(!props.auth.isAuthenticated){
                        props.history.push("/signin");
                    }
                    break;
                case PAGE_TYPES.role:
                    if( allowedRole && allowedRole !== props.auth.user.role){
                        props.history.push("/");
                    }
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