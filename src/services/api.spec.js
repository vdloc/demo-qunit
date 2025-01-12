const path = require('path');
const sinon = require('sinon');
const mockEndpointsData = require(path.relative(
  __dirname,
  './test/fixtures/mock-data/pokemon-urls.json'
));
const mockData = require(path.relative(
  __dirname,
  './test/fixtures/mock-data/pokemons.json'
));

require('./api.js');

QUnit.module('Pokemon API service', function (hooks) {
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

  QUnit.test(
    'Service can get all pokemons endpoint urls',
    async function (assert) {
      let done = assert.async();

      server.respondWith('GET', `${apiService.baseUrl}pokemon`, [
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify(mockEndpointsData),
      ]);

      let response = await apiService.getPokemons();
      assert.equal(response.length, 20, 'Get all 20 pokemon endpoint urls');
      done();
    }
  );

  QUnit.test('Service can get a pokemon', async function (assert) {
    let done = assert.async();
    let pokemonId = 2;
    let pokemonEndpoint = `${apiService.baseUrl}pokemon/${pokemonId}`;
    let mockPokemonData = mockData[0];

    server.respondWith('GET', pokemonEndpoint, [
      200,
      { 'Content-Type': 'application/json' },
      JSON.stringify(mockPokemonData),
    ]);

    let response = await apiService.getPokemon(pokemonEndpoint);
    assert.notEqual(response, null, 'Get a pokemon');
    assert.strictEqual(response.id, 1, 'Pokemon id is 1');
    assert.strictEqual(response.name, 'bulbasaur', 'Pokemon name is bulbasaur');
    done();
  });
});
