const mongoose = require('mongoose')


const cryptoSchema =  mongoose.Schema(
    {
      coin: {type:String, required:true}, 
      price: {type:Number, required: true},
      marketCap: {type: Number, required:true},
      change24h: {type: Number, required:true},
      createdAt: { type: Date, default: Date.now },   // will give the exact date & time of creating of entry

    }
)

module.exports = mongoose.model('CryptoData', cryptoSchema)