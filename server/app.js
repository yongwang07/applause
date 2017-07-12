'use strict';

var SwaggerConnect = require('swagger-connect');
var app = require('connect')();
var db = require('./config/db')();

module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

SwaggerConnect.create(config, function(err, swaggerConnect) {
  if (err) { throw err; }

  // install middleware
  swaggerConnect.register(app);
  db.init().then(() => {
    var port = process.env.PORT || 10010;
    app.listen(port);
  });

  if (swaggerConnect.runner.swagger.paths['/seach']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/search?country=us,cn');
  }
});
