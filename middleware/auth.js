const jwt = require("jsonwebtoken");

exports.loginRequired = function(req, res, next){
    try {
        const authHeader = req.headers.authorization || req.headers.Authorization;
        const token = authHeader.split(" ")[1];
        jwt.verify(
            token, 
            process.env.SECRET_KEY, 
            function(err, payload){
                if(payload){
                    return next();
                }
                else {
                    return next({
                        status: 401,
                        message: "Please log in first."
                    })
                }
        });
    } catch(err){
        return next({
            status: 401,
            message: "Please log in first."
        })
    }
}

exports.ensureCorrectUser = function(req, res, next){
    try{
        const authHeader = req.headers.authorization || req.headers.Authorization;
        const token = authHeader.split(" ")[1];
        jwt.verify(
            token, 
            process.env.SECRET_KEY, 
            function(err, payload){
                if(payload && payload.id == req.params.id){
                    return next();
                }
                else {
                    return next({
                        status: 401,
                        message: "Unauthorized."
                    })
                }
        });
    } catch(err){
        return next({
            status: 401,
            message: "Unauthorized."
        })
    }
}

exports.ensureCorrectRole = function(allowedRole){
    return (req, res, next) => {
        try{
            const authHeader = req.headers.authorization || req.headers.Authorization;
            const token = authHeader.split(" ")[1];
            jwt.verify(
                token, 
                process.env.SECRET_KEY, 
                function(err, payload){
                    if(payload && payload.role == allowedRole){
                        return next();
                    }
                    else {
                        return next({
                            status: 401,
                            message: "Unauthorized roles."
                        })
                    }
            });
        } catch(err){
            return next({
                status: 401,
                message: "Unauthorized roles."
            })
        }
    }
}