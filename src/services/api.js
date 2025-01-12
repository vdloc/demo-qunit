((app) => {
  class Api {
    constructor() {
      this.baseUrl = 'https://pokeapi.co/api/v2/';
    }

    async getPokemons() {
      try {
        const response = await fetch(`${this.baseUrl}pokemon`);
        const jsonData = await response.json();

        return jsonData.results;
      } catch (error) {
        return [];
      }
    }

    async getPokemon(pokemonEndpoint) {
      try {
        const response = await fetch(pokemonEndpoint);
        const jsonData = await response.json();

        return jsonData;
      } catch (error) {
        return null;
      }
    }
  }

  app.services.api = new Api();
})((app = window.app || {}));
