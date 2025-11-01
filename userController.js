/* Admin can register or remove users in the system to be able to contol the 
   lights*/

const User = require('../Models/User');
const bcrypt = require('bcrypt');

const getUser = (req,res) => {
    return res.status(201).json(req.user);
}

// To allow admin to get a list of all the user's details
const getAllUsers = async (req,res) => {
    try{
        const users = await User.find({});
        if(!users)
            return res.status(200).json({"message":"No Users!"});
        return res.status(201).json(users);
    }catch(err){
        console.error(err);
    }
}
const addUser = async (req,res) => {
    try{
        if(!req?.body?.username || !req?.body?.password)
            return res.json({"message":"Username|Password is required to register!"});
        // Hash the password
        const hashedpwd = await bcrypt.hash(req.body.password,10);
        await User.create({
            username: req?.body?.username,
            password: hashedpwd,
            role: req.body.role,
            control: req.body.control
        });
        console.log("New User Created!");
        return res.status(201).json({"message":"User registered successfully!"});
    }catch(err){
        console.error(err);
    }
}

// To allow admin to give/take away the rights to control lights
const updateUser = async(req,res) => {
    try{
        if(!req?.body?.username)
            return res.status(400).json({"message":"Please enter username!"});
        const user = await User.findOne({username:req.body.username});
        if(!user)
            return res.status(404).json({"message":"No user found!"});
        // Reverse the control value
        user.control = !(user.control);
        user.save();
        return res.status(201).json(user);
    }catch(err){
        console.error(err);
    }
} 

const removeUser = async(req,res) => {
    try{
        if(!req?.body?.username)
            return res.json({"message":"Please provide the username!"});
        const user = await User.findOne({username:req.body.username});
        if(!user)
            return res.json({"message":"No such user found!"});
        const result = await User.deleteOne(user);
        console.log(result);
        return res.status(201).json({"message":"User Deleted Sucessfully!"});
    }catch(err){
        console.error(err);
    }
}
module.exports = {
    getUser,
    getAllUsers,
    addUser,
    updateUser,
    removeUser
};