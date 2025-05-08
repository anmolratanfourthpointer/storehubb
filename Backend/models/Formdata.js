const mongoose = require('mongoose');

const FormDataSchema = new mongoose.Schema({
  
  mobileNo: String,
  userId: String,
  emailId: String,
  ipAddress: String,
  deviceOs: String,
  deviceModel: String,
  lastLoginTime: String,
  userAddress: String,
  orderId: Number,
  extId: Number,


  receivedAmount: String,
  recDate: String,
  mtId: Number,
  bank: String,
  bankAccNo: Number,
  paidAmount: Number,
  feeAmount: Number,
  feePer: Number,
  feeFixed: Number,
  userWallet: Number,
  status: String,
  parseStatus: String,

 
  transactionFilePath: String,
}, { timestamps: true });

module.exports = mongoose.model('FormData', FormDataSchema);
