const MongoDriver = require('./MongoDriver');
/**
 * @typedef {Object} MongoDriverConfig
 * @prop {string} url
 */


/**
 * Creates instance of MongoDriver
 *
 * @param {MongoDriverConfig} config
 * @returns {MongoDriver}
 */
module.exports = function createDbDriver(mongodb) {
  return new MongoDriver(mongodb);
};
