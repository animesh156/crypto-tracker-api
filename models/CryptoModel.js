const mongoose = require('mongoose')


const cryptoSchema =  mongoose.Schema(
    {
      coin: {type:String, required:true},
      price: {type:Number, required: true},
      marketCap: {type: Number, required:true},
      Change24h: {type: Number, required:true},

    }
)

module.exports = mongoose.model('CryptoData', cryptoSchema)