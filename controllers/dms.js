const User = require("../models/users")
const Chat = require("../models/dms")

module.exports = {
    createChat
}

async function getChatsForCurrentUser(){
    // trickiness:
    // filter out chats where a) other person started it with current User b) no messages sent yet
}

async function createChat(req, res) {
    // all about user1 and user2 (currentUser & other_user who starting chat with)
    const userId = req.auth.userId
    const other_user_id = req.body.other_user_id // other_user_id is sent through in req.body
    const currentUser = await User.findOne({ user_id: userId  })
    const otherUser = await User.findOne({ user_id: other_user_id })

    // like posts lots of copying! make easy for frontend   
    chatData = {}
    chatData.user_id_1 = userId 
    chatData.user_id_2 = other_user_id 
    
    chatData.user1 = {}
    chatData.user1.fullName = currentUser.fullName
    chatData.user1.profileImg = currentUser.profileImg
    chatData.user1.neighbourhood = currentUser.neighbourhood

    chatData.user2 = {}
    chatData.user2.fullName = otherUser.fullName
    chatData.user2.profileImg = otherUser.profileImg
    chatData.user2.neighbourhood = otherUser.neighbourhood    

    const chat = await Chat.create(chatData)
    res.json({ chat: chat })    
}