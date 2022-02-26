const {
  createComponent,
  createMuiComponentCustomization,
} = require("./plop-templates");

module.exports = function (plop) {
  // create your generators here
  plop.setGenerator("create-component", createComponent);
  plop.setGenerator("custom-mui", createMuiComponentCustomization);
};
