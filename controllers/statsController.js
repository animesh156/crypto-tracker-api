const CryptoData = require('../models/CryptoModel')
const asyncHandler = require('express-async-handler')



const getCoinStats = asyncHandler(async (req,res) => {
    const {coin} = req.params

    if(!coin){
        res.status(400).json({error: 'Coin is required'})
    }

    try {

        const coinStat = await CryptoData.findOne({coin})

        if(!coinStat) res.status(404).json({error: 'No data for the given coin'})
        
        res.status(200).json({
            price: coinStat.price,
            marketCap: coinStat.marketCap,
            "24hChange": coinStat.change24h
        })

    } catch (error) {
        res.status(500).json({error: 'Error fetching coin stats'})
    }
})

module.exports = {getCoinStats}