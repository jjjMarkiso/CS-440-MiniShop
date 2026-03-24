const healthRepository = require("../repositories/healthRepository");

const getDbNow = async () => {
  return healthRepository.getNow();
};

module.exports = {
  getDbNow,
};
