var express = require("express");
var router = express.Router();
const marketplaceModel = require("../models/marketplaceModel");

module.exports = {
  allList,
  yourList,
  savedList,
};

async function allList(req, res) {
  // Fetch all marketplace listings
  try {
    const items = await marketplaceModel.getAll();
    res.json({ items });
  } catch (error) {
    console.error("Error fetching marketplace items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function yourList(req, res) {
  // Fetch current user Listings
  try {
    const userId = req.auth.userId; 
    const items = await marketplaceModel.getUserListings(userId); // Fetch user's listings
    res.json({ items });
  } catch (error) {
    console.error("Error fetching user's marketplace items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function savedList(req, res) {
  // Fetch favourited listings
  try {
    const userId = req.auth.userId; 
    const items = await marketplaceModel.getFavListings(userId); // Fetch user's saved listings
    res.json({ items });
  } catch (error) {
    console.error("Error fetching saved marketplace items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}