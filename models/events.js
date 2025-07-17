const eventsDao = require("../daos/events");

const events = [
  { name: "Summer Fastival", organizer: "YK", description: "Summer Fastival in Singapore" },
  { name: "Summer Fastival2", organizer: "YK2", description: "Summer Fastival in Singapore2" },
];

module.exports = {
  getAll,
  addEvent
}; 

async function getAll() {
  //return await eventsDao.find();
  return events;
};


async function addEvent(newEvent) {
  if (newEvent) {
      return await eventsDao.create(newEvent);
  }
  return false;
};



// const users = await User.find({
//   _id: { $in: clerkUserid }
// });