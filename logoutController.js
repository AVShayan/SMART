// Logging out current user by destroying the session

const logout = async (req,res) => {
    try{
        if(!req.session.userid)
            return res.json({"message":"No user logged in!"});
        req.session.destroy((err)=>{
            if(err){
                console.error(err);
                return res.status(500).json({"message":"Error Loggin Out!"});
            }
            res.clearCookie('connect.sid');
            console.log("User Logged Out!");
            return res.status(201).json({"message":"User Logged Out!"});
        });
    }catch(err){
        console.error(err);
    }
}

module.exports = logout;