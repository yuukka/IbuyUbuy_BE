var express = require("express");
var router = express.Router();
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
    const favourites = req.user.favourites || [];
    const items = await marketplaceModel.getFavListings(favourites); // Fetch user's saved listings
    res.json({ items });
  } catch (error) {
    console.error("Error fetching saved marketplace items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Create new Listing
const createListing = async (req, res) => {
  
  try {
    const userId = req.auth.userId
    const currentUser = await User.findOne({ user_id: userId })
    const itemData = { ...req.body, userId }

    itemData.user_id = userId 
    itemData.neighbourhood = currentUser.neighbourhood     
    itemData.user = {}
    itemData.user.fullName = currentUser.fullName
    itemData.user.profileImg = currentUser.profileImg
    itemData.user.neighbourhood = currentUser.neighbourhood

    const listing = await Marketplace.create(itemData)
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

    const listing = await Marketplace.findById(itemData._id)
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
    const listing = await Marketplace.findById(listingId)
    
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
  createListing,
  updateListing,
  deleteListing
};