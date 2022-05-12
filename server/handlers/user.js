const db = require("../models");

exports.getUser = async function(req, res, next){
    try{
        const id = req.params.id;
        
        const user = await db.User.findById(id).populate({
            path: 'booking',
            populate:{
                path: 'room',
                model: 'Room'
            }
        });

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
        const user = await  db.User.find({}).populate('booking');

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

        // find user
        const user = await db.User.findById(id);

        // if the user role is changed
        if(req.body.role !== user.role){
            // delete all the Booking with this user
            await db.Booking.deleteMany({user: id});
        }

        // update user
        await db.User.findByIdAndUpdate(id, {...req.body});

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

exports.suspendUser = async function(req, res, next){
    try{
        const id = req.params.id;

        // delete all the Booking with this user
        await db.Booking.deleteMany({user: id});

        // update user
        await db.User.findByIdAndUpdate(id, {isSuspended: req.body.isSuspended});

        return res.status(200).json({message: `User ${id} ${req.body.isSuspended ? "suspended" : "unsuspended"}!`});
    } catch(err){
        return next({
            status: 400,
            message: err.message
        });
    }
};