const mongoose  = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        category:{type:String, required:true},
        title:{type: String, required:true},
        description:{type:String,required:true},
        price:{type:Number, required:true},
        available:{type:Number, required:true},
        image:{type:String, required:true},
        discount:{type:Number},
    },
    {timestamps : true}
);

module.exports= mongoose.model("Product",ProductSchema);