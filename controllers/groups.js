const Group = require("../models/groups")
const User = require("../models/users")

module.exports = {
    createGroup,
    getGroupsForCurrentUser,
    getNearbyGroups
}

async function createGroup(req, res) {
    const userId = req.auth.userId    
    // make the current user an admin & a member
    const groupData = {...req.body, admin_ids: [userId], member_ids: [userId]  }
    const newGroup = await Group.create(groupData)
    res.json({ group: newGroup })
}

async function getGroupsForCurrentUser(req, res) {
    res.json({})
}

async function getNearbyGroups(req, res) {
    res.json({})
}