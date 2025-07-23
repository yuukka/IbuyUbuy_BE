var express = require("express");
var router = express.Router();
const marketplaceModel = require("../models/marketplaceModel");
const Marketplace = require("../daos/marketplaceDao"); // more direct for testing
const User = require("../models/users")

module.exports = {
  allList,
  yourList,
  savedList,
  createListing,
  viewListing
};

async function allList(req, res) {
  // Fetch all marketplace listings
  try {
    const items = await marketplaceModel.getAllListing();
    res.json({ items });
  } catch (error) {
    console.error("Error fetching marketplace items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function viewListing(req, res){
  try {
    const listingId = req.params.id
    const item = await Marketplace.findById(listingId)
    res.json({ item });
  } catch (error) {
    console.error("Error fetching marketplace item:", error);
    res.status(500).json({ error: "Internal server error" });
  }  
}

async function yourList(req, res) {
  // Fetch current user Listings
  try {
    const userId = req.auth.userId; 
    const items = await marketplaceModel.getListingById(userId); // Fetch user's listings
    res.json({ items });
  } catch (error) {
    console.error("Error fetching user's marketplace items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function savedList(req, res) {
  try {
    const userId = req.auth.userId; 
    const items = await marketplaceModel.getFavListings(userId); // Fetch user's saved listings
    res.json({ items });
  } catch (error) {
    console.error("Error fetching saved marketplace items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function createListing (req, res) {  
  try {
    const userId = req.auth.userId
    const currentUser = await User.findOne({ user_id: userId })
    const itemData = { ...req.body }

    itemData.userId = userId 
    itemData.neighbourhood = currentUser.neighbourhood     
    itemData.user = {}
    itemData.user.fullName = currentUser.fullName
    itemData.user.profileImg = currentUser.profileImg
    itemData.user.neighbourhood = currentUser.neighbourhood

    const listing = await Marketplace.create(itemData)
    res.json({ listing: listing })

  } catch (error) {
    console.error("Error creating marketplace item:", error);
    res.status(400).json({ message: "Failed to create listing" });
  }
}  