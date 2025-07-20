const mongoose = require('mongoose') 
// ok, version of postSchema where no collection references, just embedded stuff
// possibility: reference the user table (or comments table?) instead....
const postSchema = mongoose.Schema(
    // todo re_post_id on schema, re_post_type ? (event, group, post, listing)
    {
        user_id: String, // clerk not mongoId
        neighbourhood: String, // could differ from user.neighbourhood (like a visibility thing?)
        user: {
            fullName: String,
            neighbourhood: String,
            profileImg: String
        },        
        content: String, // maybe add max length
        likes: { type: Number, default: 0  }, // expand to types of likes/emojis/??
        likedBy: [String], // track user_ids of who liked (mainly so that can 'unlike')
        imageUrls: [ String], 
        comments: [
            {
                text: String, // maxlength later
                likes: { type: Number, default: 0  },
                user_id: String, // clerk
                imageUrl: String, // can add an image to a comment
                user: {
                    fullName: String,
                    neighbourhood: String,
                    profileImg: String
                },
                createdAt: { type: Date, default: Date.now } // cant do  { timestamps: true }
            }
        ]            
    },
    { timestamps: true } // gives createdAt ? 
)

const Post = mongoose.model('Post', postSchema)

module.exports = Post