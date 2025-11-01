// This controller allows only the admin to add various lights in the system

const Light = require('../Models/Light');

const displayLights = async (req,res) => {
    try{
        const lights = await Light.find({})
                                    .populate({
                                        path:"user",
                                        select:"username"
                                    });
        if(!lights)
            return res.json({"message":"No Lights Yet!"});
        // Available Lights
        // Populate the user so admin can see the logs

        return res.status(201).json(lights);
    }catch(err){
        console.error(err);
    }
}

const addLight = async (req,res) => {
    try{
        if(!req?.body?.color)
            return res.json({"message":"Please specify the light color!"});
        const light = await Light.findOne({color: req.body.color});
        if(light)
            return res.json({"message":`${light.color} Light already Connected!`});
        await Light.create({
            color: req.body.color,
            status: 'OFF'
        });
        return res.json({"message":`${req.body.color} Light Connected!`});
    }catch(error){
        console.error(err);
    }
}

const removeLight = async (req,res) => {
    try{
        if(!req?.body?.color)
            return res.status({"message":"Please specifiy the light!"});
        const light = await Light.findOne({color:req.body.color});
        if(!light)
            return res.json({"message":"No Light Found!"});
        await Light.deleteOne(light);
        console.log("Light Disconnected!");
        return res.status(201).json({"message":"Light Disconnected!"});
    }catch(err){
        console.error(err);
    }
}

module.exports = {displayLights,addLight,removeLight};