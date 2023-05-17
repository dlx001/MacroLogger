const pantryItem = require('../models/pantryItem')


exports.getAllItems = async (req, res, next) => {
    let items = await pantryItem.findAll();
    console.log(items + " items");
    res.send(items);
  };
  
exports.createNewItem = async(req,res,next)=>{
    let item = new pantryItem(req.body);
    console.log(req.body);
   item=await item.save();
   console.log("save successful");
}
exports.deleteItem = async(req,res,next)=>{
   pantryItem.deleteById(req.params.id);
   console.log("delete");
}
exports.updateItem = async(req,res,next)=>{
    res.send("update");
}
