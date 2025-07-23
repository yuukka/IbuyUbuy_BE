const mongoose = require('mongoose') 
// ok, version of postSchema where no collection references, just embedded stuff
// possibility: reference the user table (or comments table?) instead....
const postSchema = mongoose.Schema(
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
        for_group: { type: Boolean, default: false  }, // group post vs. dashboard post
        group_id: String, // optional
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
        ],
        repost_id: String, // reposts can be events, groups, listings, posts
        repost_type: String
    },
    { timestamps: true } // gives createdAt ? 
)

const Post = mongoose.model('Post', postSchema)

module.exports = Post