/* We allow only authenticated users to turn ON/OFF the lights */

const User = require('../Models/User');
const bcrypt = require('bcrypt');

const login = async ( req , res ) => {
    try{
        if(!req?.body?.username || !req?.body?.password)
            return res.status(400).json({"message":"Please enter your credentials!"});
        const user = await User.findOne({username:req.body.username});
        if(!user)
            return res.status(404).json({"message":"No user found ! Please contact the Admin!"});
        const match = await bcrypt.compare(req.body.password,user.password);
        if(!match)
            return res.status(401).json({"message":"Invalid Password!"});
        // Create a session
        req.session.userid = user._id;
        return res.status(201).json({"message":`Welcome ${user.username}!`});
    } catch(err){
        console.error(err);
    }
}

module.exports = login;