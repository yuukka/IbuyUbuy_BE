const mongoose = require( "mongoose")

const groupSchema = mongoose.Schema(
    {
        admin_ids: [String],
        member_ids: [String],
        name: String,
        description: String,
        bannerImg: String,
        post_ids: [String], // reusing posts for group conversation
    },
    { timestamps: true }
)

const Group = mongoose.model('Group', groupSchema)
module.exports = Group