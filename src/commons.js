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

  async getPokemon(url) {
    try {
      const response = await fetch(url);
      const jsonData = await response.json();

      return jsonData;
    } catch (error) {
      return [];
    }
  }
}

window.app = {
  service: {
    api: new Api(),
  },
};
