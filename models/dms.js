const mongoose = require( "mongoose")

const chatSchema = mongoose.Schema(
    {
        user_id_1: String,
        user_id_2: String,
        user1: {
            fullName: String,
            neighbourhood: String, 
            profileImg: String,            
        },        
        user2: {
            fullName: String,
            neighbourhood: String, 
            profileImg: String,            
        },
        messages: [
            {
                text: String, // maxlength later
                user_id: String, // clerk
                imageUrl: String, // can add an image to a message
                user: {
                    fullName: String,
                    neighbourhood: String,
                    profileImg: String
                },
                createdAt: { type: Date, default: Date.now } // cant do  { timestamps: true }
            }
        ],
        isMarketplace: { type: Boolean, default: false },
        listing: { // like user, copy over a few things to make FE display easy
            image: String,
            title: String,
            price: String
        }
    },
    { timestamps: true }
)

const Chat = mongoose.model('Chat', chatSchema)
module.exports = Chat