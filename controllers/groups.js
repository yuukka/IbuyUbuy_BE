const Group = require("../models/groups")
const User = require("../models/users")
const Post = require("../models/posts")

module.exports = {
    createGroup,
    getGroupsForCurrentUser,
    getNearbyGroups,
    getGroup,
    getGroupPosts,
    joinGroup
}

async function createGroup(req, res) {
    const userId = req.auth.userId    
    const currentUser = await User.findOne({ user_id: userId})

    // make the current user an admin & a member
    const groupData = {
        ...req.body, 
        admin_ids: [userId],
        member_ids: [userId], 
        neighbourhood: currentUser.neighbourhood  
    }
    const newGroup = await Group.create(groupData)

    // udpate the User model group_ids as well (for fastest/easiest reteivals)
    currentUser.group_ids.push(newGroup._id)
    await currentUser.save()

    res.json({ group: newGroup })
}

async function getGroupsForCurrentUser(req, res) {
    const currentUser = await User.findOne({ user_id: req.auth.userId })
    const groupIds = currentUser.group_ids
    const groups = await Group.find({ _id: { $in: groupIds } }) // get all the Groups based on a list of ids

    res.json({ groups: groups })
}

// for now, all groups
async function getNearbyGroups(req, res) {
    const allGroups = await Group.find()
    res.json({ groups: allGroups })
}

async function getGroup(req, res) {
    const group = await Group.findById(req.params.group_id)
    res.json({ group: group })
}

async function getGroupPosts(req, res) {
    // if add private groups feature needs security
    const group = await Group.findById(req.params.group_id)
    const postIds = group.post_ids
    const posts = await Post.find({ _id: { $in: postIds } }).sort({ createdAt: -1 })  // get all these items from this list of ids. return newest first    
    console.log('got tehsthesee postIds', postIds)
    res.json({ posts: posts })
}

async function joinGroup(req, res) {
    // update group -> member_ids and user -> group_ids 
    const userId = req.auth.userId

    const group = await Group.findById(req.body.group_id)
    group.member_ids.push(userId)
    await group.save()

    const currentUser = await User.findOne({ user_id: userId })
    currentUser.group_ids.push(group._id)
    currentUser.save()

    res.json({ group: group })
}