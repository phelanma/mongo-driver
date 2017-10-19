/* eslint import/no-extraneous-dependencies:0, no-console:0 */

const MongoClient = require('mongodb').MongoClient;
const EventEmitter = require('events').EventEmitter;

/**
 * MongoDriver Wrapping MongoDb.Client
 *
 * @class MongoDriver
 * @extends {EventEmitter}
 */
class MongoDriver extends EventEmitter {
  /**
   * Creates an instance of MongoDriver.
   *
   * @memberof MongoDriver
   */
  constructor(/** @type {MongoDriverConfig} */{ url }) {
    super();
    this._db = null;
    this.connect(url);
  }

  /**
   * Creates mongo connection
   *
   * @param {string} url
   * @returns {Promise}
   * @memberof MongoDriver
   */
  connect(url) {
    return MongoClient
      .connect(url)
      .then(db => {
          // Todo logger
        console.log('MongoClient:Connected');
        this.emit('MongoClient:ConnectionSuccess');
        this._db = db;
      })
      .catch(err => {
        console.log('MongoClient:Failed', err);
        this.emit('MongoClient:ConnectionFailed');
      });
  }

  /**
   * @typedef {Object} FindProps
   * @prop {string} collection
   * @prop {object} query
   * @prop {object=} projection
   * @prop {object=} options
   */

  find(/** @type {FindProps} */{ collection, query, projection = {}, options = {} }) {
    return this._db
      .collection(collection)
      .find(query, projection, options);
  }

  /**
   * @typedef {Object} UpdateProps
   * @prop {string} collection
   * @prop {object} filter
   * @prop {object} update
   * @prop {object=} options
   */

  findOneAndUpdate(/** @type {UpdateProps} */{ collection, filter, update, options }) {
    return this._db
      .collection(collection)
      .findOneAndUpdate(filter, update, options);
  }

  /**
   * @typedef {Object} InsertManyProps
   * @prop {string} collection
   * @prop {[object]} records
   * @prop {object=} options
   */

  insertMany(/** @type {InsertManyProps} */{ collection, records, options }) {
    return this._db
      .collection(collection)
      .insertMany(records, options);
  }
}

module.exports = MongoDriver;
