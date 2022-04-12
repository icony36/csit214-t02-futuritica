import React from "react";

const Message = ({type, errors}) => {
    return(
        <>
            {errors.message && 
            <div className='alert alert-danger'>
                {errors.message}
            </div>
            }
        </>
    )
}

export default Message;