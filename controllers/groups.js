const Group = require("../models/groups")
const User = require("../models/users")

module.exports = {
    createGroup,
    getGroupsForCurrentUser,
    getNearbyGroups,
    getGroup
}

async function createGroup(req, res) {
    const userId = req.auth.userId    

    // make the current user an admin & a member
    const groupData = {...req.body, admin_ids: [userId], member_ids: [userId]  }
    const newGroup = await Group.create(groupData)

    // udpate the User model group_ids as well (for fastest/easiest reteivals)
    const currentUser = await User.findOne({ user_id: userId})
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