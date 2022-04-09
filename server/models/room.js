const mongoose = require("mongoose");
const { User } = require(".");

const roomSchema = new mongoose.Schema({
    availability: {
        type: String,
        enum: ['private', 'public', 'booked'],
        default: 'private'
    },
    timestamp: {
        type: Number,
        unique: true,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    promotionCode: {
        type: String
    },
    bookedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

// hook to delete room
roomSchema.pre("remove", async function(next){
    try{
        // find the user that owns this room
        const user = await User.findById(this.bookedBy);
        // remove room from the user booked rooms list
        user.bookedRooms.remove(this.id);
        await user.save();

        return next();
    } catch(err){
        return next(err);
    }
})


const Room = mongoose.model("Room", roomSchema);

module.exports = Room;