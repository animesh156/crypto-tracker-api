const axios = require("axios");
const CryptoData = require("../models/CryptoModel");

const fetchCryptoData = async () => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price", // will fetch data for the given three coins
      {
        params: {
          ids: "bitcoin,matic-network,ethereum",
          vs_currencies: "usd",
          include_market_cap: true,
          include_24hr_change: true,
        },
      }
    );

    const data = response.data;

    for (const [coin, stats] of Object.entries(data)) {
      // converts the fetch data object into array of [key,value] pairs making it easier for use
      await CryptoData.create({
        coin,
        price: stats.usd,
        marketCap: stats.usd_market_cap,
        change24h: stats.usd_24h_change,
      });
    }

    console.log("Crypto data fetched and stored successfully.");
  } catch (error) {
    console.log("Error fetching crypto data", error.message);
  }
};

module.exports = { fetchCryptoData };
