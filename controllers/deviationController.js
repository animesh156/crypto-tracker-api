const asyncHandler = require("express-async-handler");
const CryptoData = require("../models/CryptoModel");
const { Router } = require("express");

const getCoinDeviation = asyncHandler(async (req, res) => {
  const { coin } = req.params;

  if (!coins) return res.status(400).json({ error: "Coin is required" });

  try {
    const coinData = await CryptoData.find({ coin });
    const prices = coinData.map((data) => data.price);

    if (prices.length === 0)
      return res.status(404).json({ error: "No data found for the coin" });

    const mean = prices.reduce((a, b) => a + b, 0) / prices.length;
    const variance =
      prices.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / prices.length;
    const deviation = Math.sqrt(variance);

    res.status(200).json({ deviation: deviation.toFixed(2) });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching deviation data for the coin" });
  }
});

module.exports = {getCoinDeviation}
