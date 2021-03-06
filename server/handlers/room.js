const db = require("../models");

exports.getRooms = async function(req, res, next){
    try{
        const rooms = await db.Room.find({}).populate({
            path: 'booking',
            populate:{
                path: 'user',
                model: 'User'
            }
        });

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
        const room = await db.Room.findById(id).populate('booking');

        return res.status(200).json(room);
    } catch(err){
        return next({
            status: 400,
            message: err.message
        });
    }
};

exports.createRoom = async function(req, res, next){
    const {availability, name, capacity, price, promotionCode} = req.body;
    
    if (!availability || !name || !capacity ) {

        return next({
            status: 422,
            message: "Please provide required info."
        });
    }

    try{
        const room = await db.Room.create({
            availability,
            name,
            capacity,
            price,
            promotionCode,
        });

        return res.status(200).json(room);
    } catch(err){
         // if validation fail
         if(err.code === 11000){
            err.message = "Sorry, the room name is used.";
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
        // prevent change of booking
        delete req.body.booking;

        // update room details
        await db.Room.findByIdAndUpdate(id, {...req.body}, {useFindAndModify: false});

        return res.status(200).json({message: `Room successfully updated.`});
    } catch(err){
         // if validation fail
         if(err.code === 11000){
            err.message = "Sorry, the room name is already used.";
        }

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
        // update room
        await db.Room.findByIdAndUpdate(id, {availability, booking:[]});

        // delete all the Booking with this user
        await db.Booking.deleteMany({room: id});
       
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

exports.deleteRoom = async function(req, res, next){
    try{
        const id = req.params.id;

        const room = await db.Room.findById(id);

        if(!room){
            return next({
                status: 422,
                message: "Room is not exist."
            })
        }

        await room.remove();

        return res.status(200).json({message: `Room deleted!`});
    } catch(err){
        return next({
            status: 400,
            message: err.message
        });
    }
};

