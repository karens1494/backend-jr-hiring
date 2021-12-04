const sift = require("sift");
const { NotFound, ServerError } = require("./test/utils/errors");

// This is a bonus but you need to do the previous tests before

class Server {
  // Create your server with query features with sift
  // We pass the db when the Server is instantiated (constructor)

  constructor(db) {
    this.db = db;
  }

  async find(collectionName, query) {
    let result = [];
    try {
      result = this.db[collectionName].filter(sift(query));
      if (!result.length) {
        throw new Error("No data found.");
      }
    } catch (error) {
      if (error.message === "No data found.") {
        return new NotFound(error.message);
      } else {
        return new ServerError(error.message);
      }
    }
    return result;
  }

  async findOne(collectionName, documentId) {
    let result = {};
    try {
      if (documentId) {
        result = this.db[collectionName].find(sift({ id: { $eq: documentId } }));
        if (!result) {
          throw new Error("No data found.");
        }
      } else {
        throw new Error('No data found with the id equal as "null".');
      }
    } catch (error) {
      if (error.message === "No data found." || error.message === 'No data found with the id equal as "null".') {
        return new NotFound(error.message);
      } else {
        return new ServerError(error.message);
      }
    }
    return result;
  }

  async updateOne(collectionName, documentId, dataToUpdate) {
    let result = this.db[collectionName];
    let dataIndex = -1;
    try {
      if (documentId) {
        dataIndex = result.findIndex(sift({ id: { $eq: documentId } }));
        if (dataIndex === -1) {
          throw new Error("No data found.");
        } else {
          result[dataIndex].name = dataToUpdate.name;
        }
      } else {
        throw new Error('No data for update found with the id equal as "null".');
      }
    } catch (error) {
      if (
        error.message === "No data found." ||
        error.message === 'No data for update found with the id equal as "null".'
      ) {
        return new NotFound(error.message);
      } else {
        return new ServerError(error.message);
      }
    }
    return result[dataIndex];
  }
}

module.exports = Server;
