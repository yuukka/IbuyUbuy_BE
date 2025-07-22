const mongoose = require('mongoose');

const marketplaceSchema = new mongoose.Schema({

  name: {
		type: String,
		required: true
	},
	description: String,
	price: {
		type: Number,
		required: true
	},
	category: {
    type: String, 
    required: true
  },
	imageUrl: {
    type: String, 
    required: true
  },
  // createdAt: { type: Date, default: Date.now },
},
  { timestamps: true }
);

 const Marketplace = mongoose.model('Marketplace', marketplaceSchema);

module.exports = Marketplace;