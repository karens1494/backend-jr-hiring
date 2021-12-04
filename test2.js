const { ServerError, NotFound } = require("./test/utils/errors");

module.exports = async function Test2(server, queries) {
  let response;
  try {
    response = await server.query(queries); // Will return an array with the results, empty array or error
    response = JSON.parse(response);
    if (!response.length) {
      throw new Error("No data found.");
    }
  } catch (error) {
    if (error.message === "No data found.") {
      return new NotFound(error.message);
    } else {
      return new ServerError(error.message);
    }
  }
  return response;
};
