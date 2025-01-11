const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT;
const rateLimit = require('express-rate-limit')
var cron = require('node-cron')
const cors = require("cors");
const statRoute = require("./routes/statsRoute");
const deviationRoute = require("./routes/deviationRoute");
const { fetchCryptoData } = require("./utils/data");
const connectDB = require("./config/db");

// Rate Limiter
const limiter = rateLimit({

  windowMs: 30 * 60 * 1000,  // 20 minutes
  max: 40,    // maximum 40 request per window (15 minutes) 
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: "Too many requests, please try again later.",

})

// Applied rate limiter to all api request
app.use(limiter)

connectDB()
    .then(() => {
      console.log("Database is ready!")

      app.listen(port, () => {
        console.log(`Server is listening at ${port}`);
      });
      
      // Fetch data after the start of server
      fetchCryptoData();

      // Fetch crypto data for every 2 hours
      cron.schedule("0 */2 * * *", async () => {
        console.log("Running scheduled task: Fetching crypto data")
        await fetchCryptoData();
      })
    })
    .catch((err) => {
      console.log("Failed to connect to database:", err.message)
      process.exit(1)
    })

   // allows cross origin to make request
app.use(cors());    

// both of these middleware make sure data is availabe at req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/stats", statRoute);    // for getting stats data for a particular coin
app.use("/deviation", deviationRoute);   //for getting deviation data for a particular coin

