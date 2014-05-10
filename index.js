var app, db, express, kraken, language;

kraken = require('kraken-js');

db = require('./lib/database');

language = require('./lib/language');

express = require('express');

app = {};

app.configure = function(nconf, next) {
  db.config(nconf.get('database-config'));
  return next(null);
};

app.requestStart = function(server) {
  return console.log('hello world.');
};

app.requestBeforeRoute = function(server) {
  server.use(express.methodOverride());
  return server.use(language());
};

app.requestAfterRoute = function(server) {
  return console.log('the website coming soon!');
};

kraken.create(app).listen(function(err) {
  if (err) {
    return console.error(err);
  }
});
