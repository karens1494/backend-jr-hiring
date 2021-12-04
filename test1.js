
module.exports = function Test1(server) {
  let result = new Promise((resolve, reject) => {
    server.on("name", (data) => {
      if (data) {
        return resolve(data);
      } else {
        return reject("Error in method of server");
      }
    });
  });
  return result;
}
