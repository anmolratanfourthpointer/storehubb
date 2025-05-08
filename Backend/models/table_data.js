const mongoose = require('mongoose')

const tableDataSchema=new mongoose.Schema(
   {
    store: {
        type: String,
        required: true,
      },
      receivedFrom: {
        type: String,
        required: true,
      },
      utr: {
        type: String,
        required: true,
        unique: true,
      },
      vpa: {
        type: String,
        required: true,
      },
      datetime: {
        type: Date,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      raised: {
        type: Boolean,
        required: true,
      },
   }
)

module.exports = mongoose.model('tabledata', tableDataSchema);