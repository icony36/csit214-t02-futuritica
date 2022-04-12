import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { AVAL } from '../constants';

const MessageItem = props => {
    const { id, availability, timestamp, capacity, price, bookedBy } = props;

    const date = dayjs(timestamp);

    const renderAval = () => {
        switch(availability){
            case AVAL.booked:
                return (
                    <span className='roomitem-text-aval text-danger'>
                        BOOKED
                    </span>
                )
            case AVAL.public:
                return (
                    <span className='roomitem-text-aval text-success'>
                        AVAILABLE
                    </span>
                )
            case AVAL.private:
                return (
                    <span className='roomitem-text-aval text-warning'>
                        PRIVATE
                    </span>
                )
        }
    }

    return(
        <Link to={`/room/${id}`}>
                <li className='list-group-item'>
                    <span className='roomitem-text'>
                        {date.format("DD MMMM YYYY")}              
                    </span>
                    <span className='roomitem-text'>
                        {date.format("HH:mm")}              
                    </span>
                    {renderAval()}
                </li>
            </Link>
    )   
}

export default MessageItem;