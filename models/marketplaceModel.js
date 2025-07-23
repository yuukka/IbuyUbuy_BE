const express = require("express");
const router = express.Router();
const Marketplace = require("../daos/marketplaceDao");
const User = require("../models/users")

const getAllListing = async () => {
    const allListings = await Marketplace.find()
    return allListings
}

const getListingById = async (userId) => {
  try {
    const userListings = await Marketplace.find({ userId: userId});
    return userListings
  } catch (error) {
    console.error(`Error fetching marketplace item with id ${id}:`, error);
    throw error;
  }
}
 
const getFavListings = async (userId) => {
  // one way: can get data based off User.saved_listing_ids
  // just make sure in stuff that creates a saved listing, that the user.saved_listing_ids is updated too!
  const currentUser = await User.findOne({ user_id: userId })
  const favListingsIds = currentUser.saved_listing_ids || []
  const favListings = await Marketplace.find({ _id: { $in: favListingsIds } })
  return favListings
  // try {
  //   const favListings = await Marketplace.getFavListings({ userId: userId});
  //   return favListings
  // } catch (error) {
  //   console.error("Error fetching saved marketplace items:", error);
  //   throw error;
  // }
}

module.exports = {
  getAllListing,
  getListingById,
  getFavListings,
}