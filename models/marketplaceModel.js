const express = require("express");
const router = express.Router();
const Marketplace = require("../daos/marketplaceDao");

module.exports = {
  getAllListing,
  getListingById,
  getFavListing,
}

const getAllListing = async (req, res) => {
  try {
    const allListings = await Marketplace.find();
    res.json(allListings)
  } catch (error) {
    console.error("Error fetching all marketplace items:", error);
    throw error;
  }
}

const getListingById = async (req, res) => {
  try {
    const UserId = req.params.id;
    const userListings = await Marketplace.find({ userId: UserId});
    res,json(userListings)
  } catch (error) {
    console.error(`Error fetching marketplace item with id ${id}:`, error);
    throw error;
  }
}

const getFavListing = async (req, res) => {
  try {
    const UserId = req.params.id;
    const favListings = await Marketplace.getFavListings({ userId: UserId});
    res.json(favListings);
  } catch (error) {
    console.error("Error fetching saved marketplace items:", error);
    throw error;
  }
}