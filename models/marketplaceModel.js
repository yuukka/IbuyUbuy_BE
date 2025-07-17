const marketDao = require("../daos/marketplaceDao");

module.exports = {
  getAll,
  getById,
  add,
  update,     
}

async function getAll() {
  try {
    return await marketDao.getAll();
  } catch (error) {
    console.error("Error fetching all marketplace items:", error);
    throw error;
  }
}