const Event = require("../models/events");

module.exports = {
  index,
  add,
  toDelete,
  updatePat,
  removePat
};

async function index(req, res) {
  res.json({
    users: await Event.getAll(),
  });
}


async function add(req, res) {
    const newEvent = req.body; 

    if (newEvent) {
        res.status(200).json({ Added: await Event.addEvent(newEvent) });
    } else {
        res.status(400).json({ error: "Invalid newEvent" });
    }
};

async function toDelete(req, res) {
  const eventId = req.query.id;
  console.log(`Event to be deleted in controller: ${req.params.id}`); 

  if (eventId) {
      res.status(200).json({ Deleted: await Event.deleteEvent(eventId) });
  } else {
    res.status(400).json({ error: "Error Deleting Event" });
  }
};

async function updatePat(req, res) {
  const eventId = req.query.id;
  const updateInfo = req.body.users;
  const updateEvent = req.body; 
  console.log(eventId,updateInfo);

    const participant = { 
      $push: {
      users: updateInfo
      }

    };

  console.log(`Event to be updated in controller: ${participant}`); 
  if (participant) {
    res.status(200).json({ Updated: await Event.updateEvent(eventId, updateEvent)});
  } else {
    res.status(400).json({ error: "Error Updating Event Participants"})
  }
}

async function removePat(req, res) {
  const eventId = req.query.id;
  const updateInfo = req.body.users;

  console.log(eventId,updateInfo);

    const participant = { 
      $pullAll: {
      users: updateInfo
      }

    };

  console.log(`Event to be updated in controller: ${participant}`); 
  if (participant) {
    res.status(200).json({ Updated: await Event.updateEvent(eventId, participant)});
  } else {
    res.status(400).json({ error: "Error Updating Event Participants"})
  }
}