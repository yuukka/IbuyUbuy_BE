const mongoose = require('mongoose');

const marketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  imageUrls: [String],
  userId: { type: String, required: true },
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