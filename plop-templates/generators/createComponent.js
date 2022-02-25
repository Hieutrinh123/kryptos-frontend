module.exports = {
  description: 'Create a component',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Component name (CamelCase): ',
    },
    {
      type: 'input',
      name: 'directory',
      message: 'Component directory: ',
    },
  ],
  actions: [
    {
      type: 'add',
      path: 'src/{{directory}}/{{name}}/{{name}}.tsx',
      templateFile: 'plop-templates/component/Component.hbs',
    },
    {
      type: 'add',
      path: 'src/{{directory}}/{{name}}/index.ts',
      templateFile: 'plop-templates/component/index.hbs',
    },
    {
      type: 'add',
      path: 'src/{{directory}}/{{name}}/{{name}}.module.scss',
      templateFile: 'plop-templates/component/Style.hbs',
    },
  ],
};
