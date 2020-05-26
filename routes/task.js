const express        = require("express"),
      router         = express.Router(),
      User           = require("../models/user"),   
      Task           = require("../models/task"),
      methodOverride = require("method-override");

//CREATING NEW TASK
router.post("/" ,async(req,res)=>{
    try{
        let newTask = await Task.create(req.body.note);
        let user = await User.findById(req.body.userId);
        user.task.push(newTask);
        res.status(200);
    } catch(err) {
        console.log(err);
    }
});

//GET ALL TASKS
router.get("/",async (req,res)=>{
    User.findById(req.body.userId)
    .populate('task')
    .exec((err,user)=>{
        if(err){
            console.log(err);
        }
        else{
            res.status(200).json({user});
        }
    });
})

//UPDATE TASK
// router.put("/:id",upload.single('image'),(req,res)=>{
//     Note.findById(req.params.id,async (err,note)=>{
//         try{
//             if(req.file){
//                 await cloudinary.uploader.destroy(note.imageId);               
//                 let result=await cloudinary.uploader.upload(req.file.path);
//                 note.image=result.secure_url;
//                 note.imageId=result.public_id;
//             }
//             note.pinned=req.body.pin;
//             note.archive=req.body.archive;
//             note.label=req.body.label;
//             note.color = req.body.color;
//             console.log(note);    
//             note.save();
//             res.redirect("/note");
//         }
//         catch(err){
//             console.log(err);
//             res.redirect("/note");
//         }
//     });
// })

//DELETE A TASK
router.delete("/:id",async(req,res)=>{
    try{
        let user = await User.findById(req.body.userId);
        const taskIndex = user.task.indexOf(req.body.id);
        user.task.splice(taskIndex,1);
        user.save();
        await Task.findByIdAndRemove(req.body.id);
    }
    catch(err){
        console.log(err);
    }
})


module.exports=router;