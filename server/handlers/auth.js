const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signup = async function(req, res, next){
    if (!req.body.email || !req.body.password || !req.body.username || !req.body.role) {

        return next({
            status: 422,
            message: "Please provide required info."
        })
    }    
    
    try{
        // create user
        const user = await db.User.create(req.body);
        const {id, email, username, role} = user;

        // create token
        const token = jwt.sign({id, email, role}, process.env.SECRET_KEY);

        return res.status(200).json({
            id,
            email,
            username,
            role,
            token
        })
    } catch(err){
        // if validation fail
        if(err.code === 11000){
            err.message = "Sorry, the email is used.";
        }

        return next({
            status: 400,
            message: err.message
        })
    }
}

exports.signin = async function(req, res, next){
    
    if (!req.body.email || !req.body.password) {
        return next({
            status: 422,
            message: "Please provide email and password."
        })
    }

    try{
        // find user
        const user = await db.User.findOne({
            email: req.body.email
        });
        const {id, email, username, role} = user;

        const isMatch = await user.comparePassword(req.body.password);
        if(isMatch){
            // create token
            const token = jwt.sign({id, email, role}, process.env.SECRET_KEY);

            return res.status(200).json({
               user:{
                    id,
                    email,
                    username,
                    role,
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