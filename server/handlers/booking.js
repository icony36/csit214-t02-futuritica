const db = require("../models");
const jwt = require("jsonwebtoken");

const getUserIDFromToken = req => {  
    const authHeader = req.headers.authorization || req.headers.Authorization;
    const token = authHeader.split(" ")[1];
    
    const decoded = jwt.verify(token, process.env.SECRET_KEY); 

    if(decoded){
        return decoded.id;
    }
    else {
        return null;
    }
}

exports.bookRoom = async function(req, res, next){
    const roomId = req.params.id;
    const userId = getUserIDFromToken(req);
    const {bookData, bookType, bookingId} = req.body;


    if (!bookData || !bookType ) {
        return next({
            status: 422,
            message: "Please provide required info."
        });
    }

    try{
        const room = await db.Room.findById(roomId);
        const user = await db.User.findById(userId);

        if(room.availability == "private"){
            return next({
                status: 422,
                message: "This room is not yet launched."
            });
        }

        switch(bookType){
            case "book":
                // create booking
                const booking = await db.Booking.create({
                    timestamp: bookData.timestamp,
                    room: roomId,
                    user: userId
                })

                // update room booking list                    
                room.booking.push(booking.id);
                await room.save();

                // update user booking list                    
                user.booking.push(booking.id);
                await user.save();

                return res.status(200).json({message: `Room successfully booked.`});  
            case "unbook":
                if(bookingId){
                    const booking = await db.Booking.findById(bookingId);
                    
                    if(booking.user !=  userId){
                        return next({
                            status: 422,
                            message: "This room is not your room."
                        });
                    }

                    await booking.remove();

                    return res.status(200).json({message: `Booking ${bookingId} cancel!`});
                }
                else {
                    return next({
                        status: 422,
                        message: "Please provide booking id."
                    });
                }
            default:
                return next({
                    status: 422,
                    message: "Invalid booking."
                });      
        }                         
    } catch(err){
        // if validation fail
        if(err.code === 11000 || err.name === "ValidationError"){
            err.message = "The timeslot for this room is already booked.";
        }

        return next({
            status: 400,
            message: err.message
        });
    }
};

exports.getBooking = async function(req, res, next){
    const id = req.params.id;
    
    try{
        const booking = await db.Booking.findById(id).populate('room').populate('user');

        console.log(id);

        return res.status(200).json(booking);
    } catch(err){
        return next({
            status: 400,
            message: err.message
        });
    }
};

exports.updateBooking = async function(req, res, next){
    const id = req.params.id;

    try{
        // update booking details
        const booking = await db.Booking.findById(id);

        Object.assign(booking, req.body);

        await booking.save();

        return res.status(200).json({message: `Booking successfully updated.`});
    } catch(err){
       // if validation fail
        if(err.name === "ValidationError"){
            err.message = "The timeslot for this room is already booked.";
        }

        return next({
            status: 400,
            message: err.message
        });
    }
};

exports.deleteBooking = async function(req, res, next){
    try{
        const id = req.params.id;

        const booking = await db.Booking.findById(id);

        if(!booking){
            return next({
                status: 422,
                message: "Booking is not exist."
            })
        }

        await booking.remove();

        return res.status(200).json({message: `Booking cancel!`});
    } catch(err){
        return next({
            status: 400,
            message: err.message
        });
    }
};