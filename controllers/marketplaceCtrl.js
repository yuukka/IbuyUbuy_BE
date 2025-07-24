var express = require("express");
var router = express.Router();
const User = require("../models/users")
const marketplaceModel = require("../models/marketplaceModel");

// Fetch all marketplace listings
const allList = async (req, res) => {
  
  try {
    const listings = await marketplaceModel.getAllListing(req.query);
    res.json({ message: "GET Successful", listings})
  } catch (error) {
    console.error("Error fetching marketplace listings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
const viewListing = async (req, res) => {
  try {
    const listingId = req.params.id
    const item = await marketplaceModel.findById(listingId)
    res.json({ item });
  } catch (error) {
    console.error("Error fetching marketplace item:", error);
    res.status(500).json({ error: "Internal server error" });
  }  
}

// Fetch current user Listings
const yourList = async (req, res) => {
  
  try {
    const userId = req.auth.userId; 
    const listings = await marketplaceModel.getUserListings({ user_id: userId }); // Fetch user's listings
    res.json({ message: "GET userListing Successful", listings });
  } catch (error) {
    console.error("Error fetching user's marketplace listings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Fetch favourited listings
const favList = async (req, res) => {
  try {
    const userId = req.auth.userId; 
    const items = await marketplaceModel.getFavListings(userId); // Fetch user's saved listings
    res.json({ items });
  } catch (error) {
    console.error("Error fetching saved marketplace items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Create new Listing
const createListing = async (req, res) => {
  console.log(req.body);
  try {
    const userId = req.auth().userId;
    const { title, description, price, category } = req.body;
    const currentUser = await User.findOne({ user_id: userId })
    const itemData = { ...req.body, userId }

    itemData.user_id = userId
    itemData.neighbourhood = currentUser.neighbourhood     
    itemData.user = {}
    itemData.user.fullName = currentUser.fullName
    itemData.user.profileImg = currentUser.profileImg
    itemData.user.neighbourhood = currentUser.neighbourhood

    const listing = await marketplaceModel.addItemListing(itemData)
    res.json({ listing: listing })

  } catch (error) {
    console.error("Error fetching saved marketplace items:", error);
    res.status(400).json({ message: "Failed to create listing" });
  }
}  
// Update existing listing
const updateListing = async (req, res) => {
  
  try {
    const userId = req.auth.userId
    const itemData = { ...req.body, userId }

    const listing = await marketplaceModel.findById(itemData._id)
    const listingUpdated = await Marketplace.findByIdAndUpdate(listing._id, itemData, { new: true })
    res.json({ listing: listingUpdated })

  } catch (error) {
    console.error("Error fetching saved marketplace items:", error);
    res.status(400).json({ message: "Failed to update listing" });
  }
}

// Delete fulfilled listing
const  deleteListing= async (req, res) => {
  
  try {
    const userId = req.auth.userId
    const listingId = req.params.id
    const listing = await marketplaceModel.findById(listingId)
    
    if (listing.user_id === userId){ 
    const deleted = await Marketplace.findByIdAndDelete(listingId)
    res.json({ 'deleted': deleted })
  } else {
    return res.status(403).json({ error: 'cannot' })
  }

  } catch (error) {
    console.error("Error fetching saved marketplace items:", error);
    res.status(400).json({ message: "Failed to delete listing" });
  }
} 


module.exports = {
  allList,
  yourList,
  favList,
  viewListing,
  createListing,
  updateListing,
  deleteListing
};