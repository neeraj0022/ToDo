
const router= require("express").Router();
const User= require("../models/user");
const List= require("../models/list");

router.post("/addTask", async(req, res) => {
    try {
        const {title, body, id} = req.body;
        const exsistUser = await User.findById(id);
    
        if(exsistUser){
            const list= new List({title, body, user: exsistUser });
            await list.save().then(()=> res.status(200).json ({list}));
            exsistUser.list.push(list);
            exsistUser.save();
        }
        
    } catch (error) {
        console.log(error);
    }
})

// update

router.put("/updateTask/:id", async(req, res) => {
    try {
        const {title, body} = req.body;
        const list= await List.findByIdAndUpdate(req.params.id, {title, body});
        list.save().then(()=> res.status(200).json({message:"Upadted"}));
    }    
    catch (error) {
        console.log(error);
    }

})



//delete
router.delete("/deleteTask/:id", async(req, res) => {
    try {

        const { id } = req.body;
        const exsistUser = await User.findByIdAndUpdate(id, {$pull:{list :req.params.id} });
    
        if(exsistUser){
            await List.findByIdAndDelete(req.params.id).then(()=> 
                res.status(200).json({message:"Deleted"})
            );
        }
        
    } catch (error) {
        console.log(error);
    }

})

//getTask
router.get("/getTask/:id", async(req, res)=>{
    const list= await List.find({user: req.params.id}).sort({createdAt: -1});
    if(list.length !==0){
        res.status(200).json({list});
    }
    else{
        res.status(200).json({message: "No Tasks"});
    }
})

module.exports = router;
