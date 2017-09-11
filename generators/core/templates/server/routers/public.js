var express = require('express');

module.exports = function(app) {
  var router = express.Router();
  router.use(express.static(process.cwd() + '/public'));
  app.use(router);
};
