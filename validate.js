// Middleware to check if a user is logged in

const User = require('../Models/User');

const validate = async (req,res,next) => {
    try{
        //Check is a session exists
    if(!req.session.userid)
        return res.status(401).json({"message":"Please Log-in First!"});
    // There exists a session , now check if it belongs to the user
    const user = await User.findById(req.session.userid);
    if(!user)
        return res.status(404).json({"message":"No user found ! Please contact the Admin!"});
    // Session for that user exists and tell contoller to allow the user 
    req.user = user;
    next();
    }catch(err){
        console.error(err);
    }
}

module.exports = validate;