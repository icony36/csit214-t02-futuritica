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

exports.getUsers = async function(req, res, next){
    try{
        const user = await db.User.find({}).populate('bookedRooms');

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
        // prevent change of login and logout time
        delete req.body.logInTime;
        delete req.body.logOutTime;

         // update user details
        // await db.User.findOneAndUpdate({_id: id}, {...req.body});
        const user = await db.User.findById(id);

        Object.assign(user, req.body);

        await user.save();

        return res.status(200).json({message: `User successfully updated.`});
    } catch(err){

        return next({
            status: 400,
            message: err.message
        });
    }
};

exports.deleteUser = async function(req, res, next){
    try{
        const id = req.params.id;

        const user = await db.User.findById(id);
        await user.remove();

        return res.status(200).json({message: `User ${id} deleted!`});
    } catch(err){
        return next({
            status: 400,
            message: err.message
        });
    }
};

