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

document.body.innerHTML = '<div id="pokemon-grid"></div>';
let datagridSpy = sinon.spy(global.$.fn, 'dxDataGrid');

require('../services/api.js');
require('../features/pokemon-datagrid.js');

QUnit.module('Pokemon Datagrid', function (hooks) {
  let apiService = window.app.services.api;

  hooks.beforeEach(() => {
    server = sinon.createFakeServer();
    server.autoRespond = true;
    server.autoRespondAfter = 300;
  });

  hooks.afterEach(() => {
    datagridSpy.restore();
  });

  hooks.after(() => {
    document.body.innerHTML = '';
    server.restore();
  });

  QUnit.test(
    'Datagrid is initialized with correct data',
    async function (assert) {
      await window.app.pokemonDatagridView();
      let dxDataGridArugments = datagridSpy.getCall(0).args[0];
      server.respondWith('GET', `${apiService.baseUrl}`, [
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify(mockEndpointsData),
      ]);

      assert.ok(datagridSpy.called, 'Datagrid is initialized');
      assert.ok(
        dxDataGridArugments.dataSource,
        'Datagrid is initialized with data source'
      );
      assert.equal(
        dxDataGridArugments.dataSource.length,
        20,
        'Data source has 20 items'
      );
    }
  );
});
