// Middleware to verify whether users are  admin or just users
/*
    Admin:- Can add/remove lights, Turn ON/OFF Lights
    Users:- Can Turn ON/OFF Lights if admin allows
*/

const User = require('../Models/User');

// We need to pass the requiredRole and if allowed to control lights to the middleware.
function verifyRole(requiredRole){
    return async (req,res,next) => {
        console.log("Verifying Role!");
        try{
            // Check if logged-in
            if(!req.session.userid)
                return res.json({"message":"Please Log-in!"});
            const user = await User.findById(req.session.userid);
            if(!user)
                return res.json({"message":"User not found!Please contact Admin"});
            // If user does not have the requiredRole("Admin")
            if(requiredRole && user.role !== requiredRole)
                return res.status(403).json({"message":"Access Denied!"});
            // If user does not have permission to control lights. Admins bypass
            if(!user.control)
                return res.status(403).json({"message":"Access Denied!"});
            // Attach user to request and continue the operation
            req.user = user;
            next();
            }catch(err){
                console.error(err);
        }
    }
}
module.exports = verifyRole;