const User = require("../models/users")
const Chat = require("../models/dms")

// pusher !
const Pusher = require('pusher')
require('dotenv').config()
const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
})


module.exports = {
    createChat,
    getChatsForCurrentUser,
    addMessageToChat
}

async function addMessageToChat(req, res){ 
    // to make easy for FE, this returns the updated DM object, NOT the message
    // expects req.body.message and req.body.dm_id    
    
    const userId = req.auth.userId
    const theChat = await Chat.findById(req.body.dm_id)
    if (userId === theChat.user_id_1 || userId === theChat.user_id_2){ // the current user is updating own DM, can proceed
        const currentUser = await User.findOne({ user_id: userId  })

        // construct new message per schema
        const newMsg = {
            text: req.body.message,
            user_id: userId,
            user: {
                fullName: currentUser.fullName,
                neighbourhood: currentUser.neighbourhood,
                profileImg: currentUser.profileImg                
            }
        }

        theChat.messages.push(newMsg) // can push the new message?
        theChat.save()

        // Purhser broadcast updated Chat 
        pusher.trigger(`chat-${theChat._id}`, 'new-message', theChat) // based off of "channels" which must be connected to a specific chat

        res.json({ chat: theChat })
    } else {
        return res.status(403).json({ error: 'cannot' })
    }    
}

async function getChatsForCurrentUser(req, res){
    const userId = req.auth.userId

    // todo - not sure if can sort by date with this approach?
    // trying to get all chats where current User is either user1 or user2   
    const set1 = await Chat.find({ user_id_1: userId })
    const set2 = await Chat.find({ user_id_2: userId })
    const results = [...set1, ...set2]

    // so new/updated DMs appear at top
    results.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))

    // trickiness:
    // filter out chats where a) other person started it with current User b) no messages sent yet
    // todo

    // more problems lol
    // cant have multiple chats with same person, must be combined....

    res.json({ chats: results })
}

async function createChat(req, res) {
    // all about user1 and user2 (currentUser & other_user who starting chat with)
    const userId = req.auth.userId
    const other_user_id = req.body.other_user_id // other_user_id is sent through in req.body
    const currentUser = await User.findOne({ user_id: userId  })
    const otherUser = await User.findOne({ user_id: other_user_id })

    // dont allow to start another chat with same participants, return old/existing chat if that happens
    const chats1 = await Chat.find({ user_id_1: userId, user_id_2: other_user_id })
    const chats2 = await Chat.find({ user_id_2: userId, user_id_1: other_user_id })
    const possibleChats = [...chats1, ...chats2]
    if (possibleChats.length > 0) {
        const existingChat = possibleChats[0]
        return  res.json({ chat: existingChat })    
    }

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