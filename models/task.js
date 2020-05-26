const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    id:String,
    title:String,
    text:String,
    status:String,
    label:String,
    dueDate:Date,
    color:{
        type:String,
        default:"white"
    },
    archive:{
        type:Boolean,
        default : false
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})

module.exports=mongoose.model("Task",taskSchema);