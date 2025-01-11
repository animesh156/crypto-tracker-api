const mongoose = require("mongoose");

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is not defined in environment variables.");
    process.exit(1);
  }

  let retries = 5; // Maximum retry attempts if error happens
  while (retries) {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI);
      console.log(`MongoDB connected: ${conn.connection.host}`);
      return; // Exit function on successful database connection
    } catch (error) {
      console.error(`Failed to connect to database: ${error.message}`);
      retries -= 1;

      if (retries === 0) {
        console.error("All retries exhausted. Exiting...");   
        process.exit(1);
      }

      console.log(`Retrying in 5 seconds... (${retries} retries left)`);
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait 5 seconds before retrying connecting to DB
    }
  }
};

module.exports = connectDB;
