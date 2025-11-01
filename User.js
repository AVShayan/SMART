// User can be the Admin or Employees

const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role: {
        type:String,
        enum:["admin","user"],
        default:'user'   // Only if admin allows, user can control the lights
    },
    control:{
        type:Boolean,
        default: false
    }
});

module.exports = mongoose.model('User',userSchema);

/*
    Username: AV Shayan    
    Password: sf59222
    Role: Admin 
*/