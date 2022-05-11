const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    availability: {
        type: String,
        enum: ['private', 'public'],
        default: 'private'
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
    booking: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking"
        }
    ]
})

// hook to delete room
roomSchema.pre("remove", async function(next){
    try{
        // Delete all the Booking with this room
        await mongoose.model('Booking').deleteMany({room: this.id});

        return next();
    } catch(err){
        return next(err);
    }
})


const Room = mongoose.model("Room", roomSchema);

module.exports = Room;