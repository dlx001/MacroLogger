const pantryItem = require('../models/pantryItem')


exports.getAllItems = async(req,res,next)=>{
    console.log("attempt to get all");
    res.send("hi");
}   
exports.createNewItem = async(req,res,next)=>{
    let item = new pantryItem(req.body);
    console.log(req.body);
   item=await item.save();
   console.log("save successful");
}
exports.deleteItem = async(req,res,next)=>{
    res.send("del");
}
exports.updateItem = async(req,res,next)=>{
    res.send("update");
}
