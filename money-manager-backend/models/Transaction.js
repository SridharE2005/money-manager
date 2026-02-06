const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  userId:String,
  type:String,      // income | expense | transfer
  amount:Number,
  category:String,
  division:String,  // Personal | Office
  description:String,
  date:{type:Date,default:Date.now}
});

module.exports = mongoose.model("Transaction",TransactionSchema);
