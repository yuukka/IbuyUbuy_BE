const usersDao = require("../daos/users");
const crypto = require("crypto-js");
const utilSecurity = require("../util/security");

module.exports = {
  getAll,
}; 

async function getAll() {
  return await usersDao.find();
  // return todos;
};
