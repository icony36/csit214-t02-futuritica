import React from "react";

const RoomAvalNum = ({available}) => {

    const showText = () => {
        if(available > 0){
            if(available == 1){
                return "Room is available";
            }
            else {
                return "Rooms are available";
            }
        }

        return "No room is available";
    }

    return (
        <div className='list-info'>
            <span className={`${available > 0 ? "text-success" : "text-danger"}`}>{available > 0 ? available : null} {showText()}</span>
        </div>
    )

}

export default RoomAvalNum;