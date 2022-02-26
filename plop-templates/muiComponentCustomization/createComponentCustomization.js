module.exports = {
  description: "Create Component Customization",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "Material UI component name: ",
    },
  ],
  actions: [
    {
      type: "add",
      path: "src/common/themes/custom/{{camelCase name}}.ts",
      templateFile: "plop-templates/muiComponentCustomization/component.hbs",
    },
  ],
};
