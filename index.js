const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT;
const cors = require("cors");
const statRoute = require("./routes/statsRoute");
const deviationRoute = require("./routes/deviationRoute");
const { fetchCryptoData } = require("./utils/data");
const connectDB = require("./config/db");

connectDB();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", statRoute);
app.use("/api", deviationRoute);

app.listen(port, () => {
  console.log(`Server is listening at ${port}`);
  fetchCryptoData();
});
