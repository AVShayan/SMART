// Info about all the lights

const mongoose = require('mongoose');
const lightSchema = new mongoose.Schema({
    color:{
        type: String,
        required: true
    },
    status:{type: String},    // Whether ON or OFF
    // Whenever a user turns ON, admin get to know about it in log
    // Log in dataset to train ML model(Future Task)
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    time:{type:Date}
});

module.exports = mongoose.model('Light',lightSchema);

/*
    Light 1   (Blue Light is currently ON)
        color: blue
        status: ON
*/