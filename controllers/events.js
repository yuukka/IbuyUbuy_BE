const Event = require("../models/events");

module.exports = {
  index,
  add

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