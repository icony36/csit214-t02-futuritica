import React from 'react';
import { Link } from 'react-router-dom';
import { AVAL } from '../constants';

const RoomItem = props => {
    const { id, availability, name} = props;

    const renderAval = () => {
        switch(availability){
            case AVAL.booked:
                return (
                    <span className='listitem-text-bold text-danger'>
                        BOOKED
                    </span>
                )
            case AVAL.public:
                return (
                    <span className='listitem-text-bold text-success'>
                        AVAILABLE
                    </span>
                )
            case AVAL.private:
                return (
                    <span className='listitem-text-bold text-warning'>
                        PRIVATE
                    </span>
                )
            default:
                return;
        }
    }

    return(
        <Link to={`/room/${id}`}>
                <li className='list-group-item'>
                    <span className='listitem-text-bold' style={{marginRight: '1rem'}}>
                        Room {name}  
                    </span>
                    {renderAval()}
                </li>
            </Link>
    )   
}

export default RoomItem;