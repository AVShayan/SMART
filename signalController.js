// This controller will recieve commands from the user and send signals to the Arduino 

const {SerialPort} = require('serialport');
const Light = require('../Models/Light');
const User = require('../Models/User');

// Setup the Port
const port = new SerialPort({
    path: "COM11",  // Previosuly connected Arduino to COM12 (COMx<->COMy)
    baudRate: 9600  // Matches with Arduino BaudRate
    });
    
// Turning on the port   
port.on('open',() => console.log(`Server connected to PORT ${port.path}`));

const signalSender = async ( req , res ) => {
    try{
        if(!req?.body?.color || !req?.body?.command)
            return res.json({"message":"Please Choose The Light!"});
        // Based on the status, check if the command is valid
        const light = await Light.findOne({color : req.body.color});
        if(!light)
            return res.status(400).json({"message":"Light not connected!"});
        if(light.status == 'ON' && req.body.command == 'ON')
            return res.json({"message":`${light.color} Light is already ON!`});
        else if(light.status =='OFF' && req.body.command == 'OFF')
            return res.json({"message":`${light.color} Light is already OFF`});
        // Assign the particular signal
        const SIGNAL = JSON.stringify({"color":req.body.color,"command":req.body.command}) + '\n';
        // Send the signal to the Arduino
        port.write(SIGNAL, () => console.log(`${req.body.command} signal sent to Arduino!`));
        // If any error sending signal to Arduino :-
        port.on('error',(err)=>console.log(err));
        // We need to update the status in DB and store who turned the light
        light.status = req.body.command;
        //light.user = req.user._id;
        light.time=new Date();
        light.save(); 
        console.log(light);  
        return res.status(201).json(
            {"message":`Turned ${req.body.color} Light ${req.body.command}!`});
    }catch(err){
        console.error(err);
    }
}

module.exports = signalSender;