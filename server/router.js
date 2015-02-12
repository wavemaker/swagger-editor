var express = require('express');
var path = require('path');

var api = require('./controllers/api');
var config = require('./controllers/config');

module.exports = function (app) {

  // Configuration
  app.get('/config/defaults.json', config.show)
  app.get('/:id/config/defaults.json', config.show)
  app.get('/:id/:version/config/defaults.json', config.show)

  // API endpoints
  app.get('/:id/specs', api.latest); // Get latest version
  app.get('/:id/:version/specs', api.getVersion); // Get a specific version of a bin
  app.put('/:id/api/', api.updateLastVersion); // Update latest version of a bin
  app.put('/:id/:version/api/', api.updateLastVersion); // Update latest version of a bin

  // Static Editor
  app.use('/', express.static(path.join(__dirname, '..', 'dist')));
  app.use('/:id', express.static(path.join(__dirname, '..', 'dist')));
  app.use('/:id/:version', express.static(path.join(__dirname, '..', 'dist')));
};
