const mongoose = require('mongoose');

const marketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  imageUrls: [String],
  userId: { type: String, required: true },
  
  // uncomment to test out FE
  neighbourhood:  { type: String, required: true }, // for pickup
  isFree: { type: Boolean, default: false  }, 
  isGig: { type: Boolean, default: false  },
  createdAt: { type: Date, default: Date.now },
  user: { // copy some of the creator data over for FE ease
    fullName: String,
    profileImg: String,
    neighbourhood: String
  }
})

 const Marketplace = mongoose.model('Marketplace', marketSchema);

module.exports = Marketplace;

// const mongoose = require('mongoose');

// const marketplaceSchema = new mongoose.Schema({

//   name: {
// 		type: String,
// 		required: true
// 	},
// 	description: String,
// 	price: {
// 		type: Number,
// 		required: true
// 	},
// 	category: {
//     type: String, 
//     required: true
//   },
// 	imageUrl: {
//     type: String, 
//     required: true
//   },
//   // createdAt: { type: Date, default: Date.now },
// },
//   { timestamps: true }
// );

//  const Marketplace = mongoose.model('Marketplace', marketplaceSchema);

// module.exports = Marketplace;