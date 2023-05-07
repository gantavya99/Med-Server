const router = require("express").Router();
const User = require("../models/User");
const {verifyToken, verifyTokenAndAuthorization} = require("./verifyToken");

router.put(":/id",verifyTokenAndAuthorization,async (req,res)=>{
    if(req.body.password){
        req.body.password = bcrypt.hash(req.body.password, 10);
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id,
        {
            $set:req.body
        },{new:true})
    }
    catch(err){
        res.status(500).json(err);
    }
});
module.exports=router;