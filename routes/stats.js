const express = require("express");
const Crypto = require("../models/crypto");
const router = express.Router();

router.get("/stats", async (req, res) => {
  const { coin } = req.query;
  if (!coin) return res.status(400).json({ error: "Coin parameter is required." });

  try {
    const data = await Crypto.findOne({ coin }).sort({ timestamp: -1 });
    if (!data) return res.status(404).json({ error: "Data not found for the given coin." });

    res.json({
      price: data.price,
      marketCap: data.marketCap,
      "24hChange": data.change24h
    });
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;