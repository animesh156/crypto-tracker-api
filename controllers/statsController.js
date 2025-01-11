const CryptoData = require("../models/CryptoModel");
const asyncHandler = require("express-async-handler");

const getCoinStats = asyncHandler(async (req, res) => {
  const { coin } = req.query;  // select coin from req

  if (!coin) {
    res.status(400).json({ error: "Coin is required" }); 
  }

  try {
    const coinStat = await CryptoData.findOne({ coin }).sort({createdAt: -1});  // will retrieve the latest data for the given coin

    if (!coinStat)
      res.status(404).json({ error: "No data for the given coin" });

    res.status(200).json({
      price: coinStat.price,
      marketCap: coinStat.marketCap.toFixed(0),
      "24hChange": coinStat.change24h.toFixed(1),  // save data to 1 decimal place
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching coin stats" });
  }
});

module.exports = { getCoinStats };
