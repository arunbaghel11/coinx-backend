// filepath: /E:/c++/coinx-backend/crypto_price_tracker/app.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cron = require("node-cron");
const axios = require("axios");

dotenv.config(); // Ensure this is at the top

const statsRoutes = require("./routes/stats");
const deviationRoutes = require("./routes/deviation");
const Crypto = require("./models/crypto");

console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("PORT:", process.env.PORT);
console.log("COINGECKO_API_KEY:", process.env.COINGECKO_API_KEY);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/api", statsRoutes);
app.use("/api", deviationRoutes);

// Database connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected."))
  .catch(err => console.error("MongoDB connection error:", err));

// Background Job
cron.schedule("0 */2 * * *", async () => {
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,matic-network&vs_currencies=usd&include_market_cap=true&include_24hr_change=true&x_cg_pro_api_key=${process.env.COINGECKO_API_KEY}`;
  try {
    const { data } = await axios.get(url);
    const coins = ["bitcoin", "ethereum", "matic-network"];
    for (const coin of coins) {
      await Crypto.create({
        coin,
        price: data[coin].usd,
        marketCap: data[coin].usd_market_cap,
        change24h: data[coin].usd_24h_change
      });
    }
    console.log("Data fetched and stored successfully.");
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

// Test API Key
axios.get(`https://api.coingecko.com/api/v3/ping?x_cg_demo_api_key=${process.env.COINGECKO_API_KEY}`)
  .then(response => {
    console.log("API Key Test Response:", response.data);
  })
  .catch(error => {
    console.error("API Key Test Error:", error);
  });

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));