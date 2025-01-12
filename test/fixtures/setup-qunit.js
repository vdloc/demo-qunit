let sinon = require('sinon');
const testHTML = `
<!DOCTYPE html>
  <html>
    <head>
    </head>
    <body>
    </body>
</html>
`;
const { JSDOM } = require('jsdom');
const jsdom = new JSDOM(testHTML);
const { window } = jsdom;
const { document } = window;

global.window = window;
global.document = document;

global.$ = global.jQuery = require('jquery');
global.XMLHttpRequest = sinon.useFakeXMLHttpRequest();
global.$.fn.dxDataGrid = () => {};

require('../../src/index.js');
