const router = require("express").Router();
const Transaction = require("../models/Transaction");
const auth = require("../middleware/auth");

router.post("/",auth,async(req,res)=>{
  const tx = new Transaction({...req.body,userId:req.user.id});
  await tx.save();
  res.json(tx);
});

router.get("/",auth,async(req,res)=>{
  const tx = await Transaction.find({userId:req.user.id});
  res.json(tx);
});

router.put("/:id",auth,async(req,res)=>{
  const tx = await Transaction.findById(req.params.id);
  const diff = Date.now() - new Date(tx.date);
  if(diff > 12*60*60*1000)
    return res.status(403).send("Edit window expired");

  Object.assign(tx,req.body);
  await tx.save();
  res.json(tx);
});

router.delete("/:id",auth,async(req,res)=>{
  await Transaction.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

module.exports = router;
