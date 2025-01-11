const express = require("express");
const Crypto = require("../models/crypto");
const router = express.Router();

const calculateStandardDeviation = (prices) => {
    const mean = prices.reduce((a, b) => a + b, 0) / prices.length;
    const variance = prices.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / prices.length;
    return Math.sqrt(variance).toFixed(2);
};

router.get("/deviation", async (req, res) => {
    const { coin } = req.query;
    if (!coin) return res.status(400).json({ error: "Coin parameter is required." });

    try {
        const records = await Crypto.find({ coin }).sort({ timestamp: -1 }).limit(100);
        if (records.length === 0) return res.status(404).json({ error: "Not enough data for the given coin." });

        const prices = records.map(record => record.price);
        const deviation = calculateStandardDeviation(prices);

        res.json({ deviation });
    } catch (error) {
        res.status(500).json({ error: "Server error." });
    }
});

module.exports = router;