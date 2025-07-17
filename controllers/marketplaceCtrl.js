const marketModel = require("../models/marketplaceModel");

module.exports = {
  index,
};

async function index(req, res) {
  try {
    const items = await marketModel.getAll();
    res.json({ items }); 
  } catch (error) {
    console.error("Error fetching marketplace items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}