const express = require("express");
const router = express.Router();
const Marketplace = require("../daos/marketplaceDao");


const getAllListing = async () => {
    const allListings = await Marketplace.find()
    return allListings

  // trying out filtering on FE instead of BE

  // await Marketplace.find(filter).sort(sort);
  
  //   const getFilteredListings = async (filters) => {
  //     const { category, price, sort } = filters;
  //     const filter = {};

  //     if (category) {
  //       filter.category = category;
  //     }

  //     if (price === "free") {
  //       filter.price = 0;
  //     } else {
  //       price === "discounted";
  //       filter.price = { $gt: 0 }
  //     };

  //     const sortOption = { createdAt: -1 };
  //     if (sort === "priceLowToHigh") {
  //       sortOption = { price: 1 };
  //     } else {
  //       sort === "priceHighToLow";
  //       sortOption = { price: -1 }
  //     };

  //     return await getFilteredListings(filter, sortOption);
    // };
  
};

const getListingById = async (listingId) => {
  
  return await Marketplace.findOne({_id: listingId})

  // const getUserListings = async (userId) => {
  //   findByUser(userId);
  //   return getUserListings(userId);
  // }
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
  
  await Marketplace.findOneAndUpdate(
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
  updateListing,
  deleteListing
}

