window.app = {
  services: {},
};

$(document).ready(function () {
  $('#load-pokemons').click(function () {
    window.app.pokemonDatagridView();
    $(this).hide();
  });
});
