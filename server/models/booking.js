const mongoose = require("mongoose");
const Room = require("./room");
const User = require("./user");

const bookingSchema = new mongoose.Schema({
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: true
    },
    timestamp: {
        type: Date,
        required: true,
        validate: {
            isAsync: true,
            validator: timeValidator,
            message: "The timeslot for this room is already booked."
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

async function timeValidator(val){
    try{
        const newTime = new Date(val);                   

        const room = await Room.findById(this.room).populate('booking');
    
        return room.booking.every(b => {
            const currentTime = new Date(b.timestamp);
            if(currentTime.getTime() == newTime.getTime()){
                return false;
            }

            return true;
        })
    } catch(err){
        console.log(err);
    }
}

// hook to delete booking
bookingSchema.pre("remove", async function(next){
    try{
        // Remove booking from room booking list
        const room = await Room.findById(this.room);
        await room.booking.remove(this.id);
        await room.save();

        
        // Remove booking from user booking list
        const user = await User.findById(this.user);                    
        await user.booking.remove(this.id);
        await user.save();

        return next();
    } catch(err){
        return next(err);
    }
})


const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;