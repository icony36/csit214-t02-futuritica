const db = require("../models");

exports.getUser = async function(req, res, next){
    try{
        const id = req.params.id;
        
        const user = await db.User.findById(id).populate('bookedRooms');

        return res.status(200).json(user);
    } catch(err){
        return next({
            status: 400,
            message: err.message
        });
    }
};

exports.updateUser = async function(req, res, next){  
    const id = req.params.id;

    try{
        // update room details
        await db.User.findByIdAndUpdate(id, {...req.body}, {useFindAndModify: false});

        return res.status(200).json({message: `Profile updated ${id}!`});
    } catch(err){
        return next({
            status: 400,
            message: err.message
        });
    }
}