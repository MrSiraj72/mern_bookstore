const mongoose = require("mongoose");


const bookSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
    },
    publishYear:{
        type:Number,
        requird:true,
    }
},
{
    timestamps:true,
})

const model = mongoose.model("BOOK",bookSchema);
module.exports = model;