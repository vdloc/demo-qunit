(async function (app) {
  const SERVICE = app.service.api;

  let pokemons = await SERVICE.getPokemons();
  let $gridContainer = $('#pokemon-grid');

  pokemonDataSource = await Promise.all(
    pokemons.map((pokemon) => SERVICE.getPokemon(pokemon.url))
  );

  app.grid = function () {
    $gridContainer.dxDataGrid({
      dataSource: pokemonDataSource,
      columns: [
        { dataField: 'id', caption: 'Id', width: '10rem', alignment: 'center' },
        { dataField: 'name', caption: 'Name' },
        {
          dataField: 'sprites',
          caption: 'Image',
          cellTemplate: function (container, options) {
            container.append(
              `<img src="${options.data.sprites.front_default}" />`
            );
          },
        },
        { dataField: 'weight', caption: 'Weight' },
      ],
      columnAutoWidth: true,
      showBorders: true,
      paging: {
        pageSize: 10,
      },
      pager: {
        showPageSizeSelector: true,
        allowedPageSizes: [10, 20, 50],
        showInfo: true,
      },
    });
  };
})(window.app || (window.app = {}));
