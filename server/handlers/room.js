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

exports.getRooms = async function(req, res, next){
    try{
        const rooms = await db.Room.find({}).populate('bookedBy');

        return res.status(200).json(rooms);
    } catch(err){
        return next({
            status: 400,
            message: err.message
        });
    }
};

exports.getRoom = async function(req, res, next){
    const id = req.params.id;
    
    try{
        const room = await db.Room.findById(id).populate('bookedBy');

        return res.status(200).json(room);
    } catch(err){
        return next({
            status: 400,
            message: err.message
        });
    }
};

exports.createRoom = async function(req, res, next){
    const {availability, timestamp, capacity, price, promotionCode} = req.body;
    
    if (!availability || !timestamp || !capacity ) {

        return next({
            status: 422,
            message: "Please provide required info."
        });
    }

    try{
        const room = await db.Room.create({
            availability,
            timestamp,
            capacity,
            price,
            promotionCode,
        });

        return res.status(200).json(room);
    } catch(err){
        // if validation fail
        if(err.code === 11000){
            err.message = "Sorry, the timeslot is already used.";
        }
        
        return next({
            status: 400,
            message: err.message
        });
    }
};

exports.updateRoom = async function(req, res, next){
    const id = req.params.id;

    try{
        // prevent change of bookedBy
        delete req.body.bookedBy;

        // update room details
        await db.Room.findByIdAndUpdate(id, {...req.body}, {useFindAndModify: false});

        return res.status(200).json({message: `Room successfully updated.`});
    } catch(err){
        return next({
            status: 400,
            message: err.message
        });
    }
};

exports.launchRoom = async function(req, res, next){
    const id = req.params.id;
    const {availability} = req.body;

    if (!availability ) {

        return next({
            status: 422,
            message: "Invalid launch."
        });
    }

    try{
        const room = await db.Room.findById(id);

        // remove room from user booked list
        await db.User.updateMany(
            {},
            {$pull: {'bookedRooms': id}}
        )        

        // update room data
        room.availability = availability;
        room.bookedBy = null;
        await room.save();
       
        switch(availability){
            case 'private':
                return res.status(200).json({message: `Room successfully take down.`});
            case 'public':
                return res.status(200).json({message: `Room successfully launched.`});
        }
    } catch(err){
        return next({
            status: 400,
            message: err.message
        });
    }
};

exports.bookRoom = async function(req, res, next){
    const id = req.params.id;
    const {availability} = req.body;

    const bookedBy = getUserIDFromToken(req);

    if (!bookedBy || !availability ) {

        return next({
            status: 422,
            message: "Invalid booking."
        });
    }

    try{
        const room = await db.Room.findById(id);
        const user = await db.User.findById(bookedBy);

        if(room.availability == "private"){
            return next({
                status: 422,
                message: "This room is not yet launched."
            });
        }

        switch(availability){
            case "booked":
                if(!room.bookedBy){
                    // update room data
                    await db.Room.findByIdAndUpdate(id, {availability, bookedBy}, {useFindAndModify: false});

                    // update user booked rooms list                    
                    user.bookedRooms.push(id);
                    await user.save();

                    return res.status(200).json({message: `Room successfully booked.`});
                }
                else {
                    return next({
                        status: 422,
                        message: "This room is already booked."
                    });
                }        
            case "public":
                if(room.bookedBy){
                    if(room.bookedBy !=  bookedBy){
                        return next({
                            status: 422,
                            message: "This room is not your room."
                        });
                    }

                    // update room owner user id
                    await db.Room.findByIdAndUpdate(id, {availability, bookedBy: null}, {useFindAndModify: false});

                    // update user booked rooms list                    
                    user.bookedRooms.remove(id);
                    await user.save();

                    return res.status(200).json({message: `Rome booking cancel!`});
                }
                else {
                    return next({
                        status: 422,
                        message: "This room is not yet booked."
                    });
                }
            default:
                return next({
                    status: 422,
                    message: "Invalid booking."
                });      
        }                         
    } catch(err){
        return next({
            status: 400,
            message: err.message
        });
    }
};

exports.deleteRoom = async function(req, res, next){
    try{
        const id = req.params.id;

        const room = await db.Room.findById(id);
        await room.remove();

        return res.status(200).json({message: `Room ${id} deleted!`});
    } catch(err){
        return next({
            status: 400,
            message: err.message
        });
    }
};

