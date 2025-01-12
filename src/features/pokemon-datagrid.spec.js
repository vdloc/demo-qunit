const path = require('path');
const sinon = require('sinon');
const mockEndpointsData = require(path.relative(
  __dirname,
  'test/fixtures/mock-data/pokemon-urls.json'
));
const mockData = require(path.relative(
  __dirname,
  'test/fixtures/mock-data/pokemons.json'
));
require('../services/api.js');

document.body.innerHTML = '<div id="pokemon-grid"></div>';

require('./pokemon-datagrid.js');

QUnit.module('Pokemon Datagrid', function (hooks) {
  let server;
  let apiService = window.app.services.api;

  hooks.beforeEach(() => {
    server = sinon.createFakeServer();
    server.autoRespond = true;
    server.autoRespondAfter = 300;
  });

  hooks.afterEach(() => {
    server.restore();
  });

  hooks.after(() => {
    document.body.innerHTML = '';
  });
});
