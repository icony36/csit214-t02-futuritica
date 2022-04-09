const db = require("../models");

exports.getRooms = async function(req, res, next){
    try{
        const rooms = await db.Room.find({});

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
        const room = await db.Room.findById(id);

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
        return res
            .status(422)
            .send({ error: "Please provide required info." });
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

        return res.status(200).json({message: `Room updated ${id}!`});
    } catch(err){
        return next({
            status: 400,
            message: err.message
        });
    }
};

exports.bookRoom = async function(req, res, next){
    const id = req.params.id;
    const {bookedBy, availability} = req.body;

    if (!bookedBy || !availability ) {
        return res
            .status(422)
            .send({ error: "Invalid booking." });
    }

    try{
        const room = await db.Room.findById(id);
        const user = await db.User.findById(bookedBy);

        if (room.availability == "private" ) {
            return res
                .status(422)
                .send({ error: "This room is not launched yet." });
        }

        switch(availability){
            case "booked":
                if(!room.bookedBy){
                    // update room owner user id
                    await db.Room.findByIdAndUpdate(id, {availability, bookedBy}, {useFindAndModify: false});

                    // update user booked rooms list                    
                    user.bookedRooms.push(id);
                    await user.save();

                    return res.status(200).json({message: `Room ${id} booked!`});
                }
                else {
                    return next({
                        status: 400,
                        message: "This room is already booked."
                    });
                }        
            case "public":
                if(room.bookedBy){
                     // update room owner user id
                    await db.Room.findByIdAndUpdate(id, {availability, bookedBy: null}, {useFindAndModify: false});

                    // update user booked rooms list                    
                    user.bookedRooms.remove(id);
                    await user.save();

                    return res.status(200).json({message: `Rome ${id} booking cancel!`});
                }
                else {
                    return next({
                        status: 400,
                        message: "This room is not yet booked."
                    });
                }
            default:
                return next({
                    status: 400,
                    message: "Unauthorized role."
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

