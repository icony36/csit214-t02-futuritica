import React from "react";
import { MESSAGE_TYPES } from "../constants";

const Message = ({messages}) => {
    if(messages.message){
        switch(messages.type){
            case MESSAGE_TYPES.success:
                return(
                    <div className='alert alert-success'>
                        {messages.message}
                    </div>
                );
            case MESSAGE_TYPES.error:
                return(
                    <div className='alert alert-danger'>
                        {messages.message}
                    </div>
                );
            case MESSAGE_TYPES.warning:
                return(
                    <div className='alert alert-warning'>
                        {messages.message}
                    </div>
                );
            case MESSAGE_TYPES.info:
                return(
                    <div className='alert alert-info'>
                        {messages.message}
                    </div>
                );
            default:
                return;
        }    
    }
}

export default Message;