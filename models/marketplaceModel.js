const express = require("express");
const router = express.Router();
const Marketplace = require("../daos/marketplaceDao");


const getAllListing = async () => {
    const allListings = await Marketplace.find()
    return allListings
  
};

const getUserListings = async (userId) => {
  return Marketplace.find({userId: userId})
}

const getListingById = async (listingId) => {
  
  return await Marketplace.findOne({_id: listingId})

}

const getFavListing = async (ids) => {

  await Marketplace.find({ _id: { $in: ids } });

  // const UserId = req.params.id;  if I should use this format instead?
  const getUserFavourites = async (ids) => {
    findByIds(ids);
    return getUserFavourites(ids);
  }
  const currentUser = await User.findOne({ user_id: userId })
  const favListingsIds = currentUser.saved_listing_ids || []
  const favListings = await Marketplace.find({ _id: { $in: favListingsIds } })
  return favListings
}

const addItemListing = async (data) => {
  
    const createUserListing = async (listingData) => {
      await createListing(listingData);
      return createUserListing(data);
  }

  return await Marketplace.create(data);
}

const updateListing = async (id, userId, data) => {
  
  return await Marketplace.findOneAndUpdate(
    { _id: id, userId },
    data,
    { new: true }
  );
}

const deleteListing = async (id, userId) => {


  return await Marketplace.findOneAndDelete(
    { _id: id, userId }
  );
  
}


module.exports = {
  getAllListing,
  getListingById,
  getFavListing,
  addItemListing,
  getUserListings,
  updateListing,
  deleteListing
}

