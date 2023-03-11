const jwt = require("jsonwebtoken")


function auth(req, res, next) {
    
    var { authorization } = req.headers
    if (authorization) {
        jwt.verify(authorization, process.env.SECRET, function (err, decoded) {
            if (err) {
                res.status(401).json({ message: err.message })
            }
            else{
                req.user = {};
                req.user.id=decoded.userId;
                req.user.role=decoded.userRole;
    
                // console.log(req.user); 
                next()

            }
           
        })

    } else {
        res.status(401).json({error:"authorization not found"});
    }

}


function userProtect(req, res, next) {
    if (req.user.id === req.params.id || req.user.role==='admin') {
        next()

    } else {
        res.status(401).json({error:"invalid authorization"});
    }

}


function canAccess(roles){
    return (req, res, next) => {
    console.log('done');
        if (roles.includes(req.user.role)) {
            next()
    
        } else {
            res.status(401).json({error:"invalid authorization"});
        }
    
    }
}


module.exports = { auth, userProtect, canAccess}