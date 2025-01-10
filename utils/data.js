const axios = require("axios");
const CryptoData = require("../models/CryptoModel");
var cron = require('node-cron')

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

    

    for (const [coin, stats] of Object.entries(data)) {
      await CryptoData.create({
          coin,
          price: stats.usd,
          marketCap: stats.usd_market_cap,
          change24h: stats.usd_24h_change,
      });
  }

  console.log('Crypto data fetched and stored successfully.');

  } catch (error) {
    console.log("Error fetching crypto data", error.message);
  }
};

cron.schedule('0 */2 * * *', fetchCryptoData);

module.exports = { fetchCryptoData };
