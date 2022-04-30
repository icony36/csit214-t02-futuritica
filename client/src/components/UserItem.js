import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { ROLE } from '../constants';

const UserItem = props => {
    const { id, username, role, lastLogin} = props;

    const renderRole = () => {
        switch(role){
            case ROLE.staff:
                return (
                    <span className='listitem-text-bold text-warning'>
                        STAFF
                    </span>
                )
            case ROLE.student:
                return (
                    <span className='listitem-text-bold text-info'>
                        STUDENT
                    </span>
                )
            default:
                return;
        }
    }
    
    const renderLastLogin = () => {
        if(lastLogin){
            const lastLoginDate = dayjs(lastLogin);

            return(
                <>
                    <span className='listitem-text'>
                        Last login:            
                    </span>
                    <span className='listitem-text listitem-text-italic text-muted'>
                        {lastLoginDate.format("DD MMMM YYYY")}              
                    </span>
                    <span className='listitem-text listitem-text-italic text-muted'>
                        {lastLoginDate.format("HH:mm")}              
                    </span>
               </>
            )
        }

        return(
            <span className='listitem-text-bold listitem-text text-primary'>
                New User             
            </span>
        )
    }

    return(
        <Link to={`/user/${id}`}>
                <li className='list-group-item'>
                    {renderRole()}
                    <span className='listitem-title'>
                        {username}              
                    </span>
                    {renderLastLogin()}                   
                </li>
            </Link>
    )   
}

export default UserItem;