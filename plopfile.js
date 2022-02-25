const { createComponent } = require('./plop-templates/generators');

module.exports = function (plop) {
  // create your generators here
  plop.setGenerator('create-component', createComponent);
};
