import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { AVAL } from '../constants';

const RoomItem = props => {
    const { id, availability, timestamp} = props;

    const date = dayjs(timestamp);

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
                    <span className='listitem-text'>
                        {date.format("DD MMMM YYYY")}              
                    </span>
                    <span className='listitem-text'>
                        {date.format("HH:mm")}              
                    </span>
                    {renderAval()}
                </li>
            </Link>
    )   
}

export default RoomItem;