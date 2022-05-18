const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signup = async function(req, res, next){
    if (!req.body.password || !req.body.username || !req.body.role) {

        return next({
            status: 422,
            message: "Please provide required info."
        })
    }    
    
    try{
        // create user
        const user = await db.User.create(req.body);
        const {id, username, role} = user;

        // create token
        const token = jwt.sign({id, username, role}, process.env.SECRET_KEY);

        return res.status(200).json({
            user:{
                 id,
                 username,
                 role
            },
            token
         });
    } catch(err){
        // if validation fail
        if(err.code === 11000){
            err.message = "Sorry, the username is used.";
        }

        return next({
            status: 400,
            message: err.message
        })
    }
}

exports.signin = async function(req, res, next){
    
    if (!req.body.username || !req.body.password) {
        return next({
            status: 422,
            message: "Please provide username and password."
        })
    }

    try{
        // find user
        const user = await db.User.findOne({
            username: req.body.username
        });
        const {id, username, role, isSuspended} = user;

        const isMatch = await user.comparePassword(req.body.password);
        if(isMatch){
            if(isSuspended){
                return next({
                    status: 400,
                    message: "This account has been suspended."
                })
            }

            // create token
            const token = jwt.sign({id, username, role}, process.env.SECRET_KEY);

            // update login time
            user.logInTime = new Date();
            await user.save();

            return res.status(200).json({
               user:{
                    id,
                    username,
                    role,
                    logInTime: user.logInTime
               },
               token
            });
        }
        else {
            return next({
                status: 400,
                message: "Incorrect email or password."
            })
        }
    } catch(err) {
        
        return next({
            status: 400,
            message: "Incorrect email or password."
        })
    }
}

exports.logout = async function(req, res, next){
    
    const id = req.params.id;

    try{
        // update logout time
        const user = await db.User.findByIdAndUpdate(id, {logOutTime: new Date()}, {useFindAndModify: false});

        return res.status(200).json({logOutTime: user.logOutTime, message: `Successfully log out.`});
    } catch(err){
        return next({
            status: 400,
            message: err.message
        });
    }
}