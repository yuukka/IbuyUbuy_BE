const User = require("../models/users");

module.exports = {
  index,

};

async function index(req, res) {
  res.json({
    users: await User.getAll(),
  });
}
