const jwt = require("jsonwebtoken")


function auth(req, res, next) {
    
    var { authorization } = req.headers
    if (authorization) {
        jwt.verify(authorization, process.env.SECRET, function (err, decoded) {
            if (err) {
                res.status(401).json({ message: err.message })
            }
            else{
                req.user = {
                    id:decoded.userId,
                    role:decoded.userRole
                };
    
                // console.log(req.user); 
                next()

            }
           
        })

    } else {
        res.status(401).json({error:"authorization not found"});
    }

}


function setUserId(req, res, next){
    req.params.id = req.user.id;
    console.log(req.params.id);
    next();
  };


function canAccess(roles){
    return (req, res, next) => {
    // console.log('done');
        if (roles.includes(req.user.role)) {
            next()
    
        } else {
            res.status(401).json({error:"invalid authorization"});
        }
    
    }
}


module.exports = { auth, setUserId, canAccess}