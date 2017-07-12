'use strict';
/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
*/

/*
 Modules make it possible to import JavaScript files into your application.  Modules are imported
 using 'require' statements that give you a reference to the module.

  It is a good idea to list the modules that your application depends on in the package.json in the project root
 */
var util = require('util');

/*
 Once you 'require' a module you can reference the things that it exports.  These are defined in module.exports.

 For a controller in a127 (which this is) you should export the functions referenced in your Swagger document by name.

 Either:
  - The HTTP Verb of the corresponding operation (get, put, post, delete, etc)
  - Or the operationId associated with the operation in your Swagger document

  In the starter/skeleton project the 'get' operation on the '/hello' path has an operationId named 'hello'.  Here,
  we specify that in the exports of this module that 'hello' maps to the function named 'hello'
 */
var db = require('../../config/db')();

module.exports = {
  search: search,
  info: info
};

function info(req, res) {
  return res.json(db.info());
}

function search(req, res) {
  let countries = req.swagger.params.country.value;
  let devices = req.swagger.params.deviceId.value;
  let sort = req.swagger.params.sort.value;
  if (sort === undefined) sort = true;
  if (countries.indexOf('All') >= 0) countries = ['*'];
  if (devices.indexOf('All') >= 0) devices = ['*'];
  const ret = db.search(countries, devices);
  const result = Object.keys(ret).map(id => {
    return {
      country: ret[id][0], 
      name: ret[id][1],
      total: ret[id][2]}
    }
  );
  if (sort) result.sort((a, b) => b.total - a.total);
  res.json(result);
}