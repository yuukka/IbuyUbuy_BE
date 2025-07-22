const express = require("express");
const router = express.Router();
const Marketplace = require("../daos/marketplaceDao");

const getAllListing = async () => {
    const allListings = await Marketplace.find()
    return allListings
}

const getListingById = async () => {
  try {
    const UserId = req.params.id;
    const userListings = await Marketplace.find({ userId: UserId});
    return userListings
  } catch (error) {
    console.error(`Error fetching marketplace item with id ${id}:`, error);
    throw error;
  }
}

const getFavListing = async () => {
  try {
    const UserId = req.params.id;
    const favListings = await Marketplace.getFavListings({ userId: UserId});
    return favListings
  } catch (error) {
    console.error("Error fetching saved marketplace items:", error);
    throw error;
  }
}

module.exports = {
  getAllListing,
  getListingById,
  getFavListing,
}