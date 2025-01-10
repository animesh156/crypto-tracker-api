const axios = require("axios");
const CryptoData = require("../models/CryptoModel");

const fetchCryptoData = async () => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price",
      {
        params: {
          ids: "bitcoin,matic-network,ethereum",
          vs_currencies: "usd",
          include_market_cap: true,
          include_24hr_change: true,
          API_KEY: process.env.API_KEY,
        },
      }
    );

    const data = response.data;

    console.log(response.data);
  } catch (error) {
    console.log("Error fetching crypto data", error.message);
  }
};

module.exports = { fetchCryptoData };
