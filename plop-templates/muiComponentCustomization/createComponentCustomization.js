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
      type: "modify",
      pattern: "// Add customization import (do not delete this comment)",
      path: "src/common/themes/custom/theme.ts",
      template:
        '// Add customization import (do not delete this comment)\nimport {\n  CommonMui{{name}},\n  DarkModeMui{{name}},\n  LightModeMui{{name}},\n} from "./{{camelCase name}}";',
    },
    {
      type: "modify",
      path: "src/common/themes/custom/theme.ts",
      pattern:
        "// Add common component customization (do not delete this comment)",
      template:
        "// Add common component customization (do not delete this comment)\n    Mui{{name}}: CommonMui{{name}},",
    },
    {
      type: "modify",
      path: "src/common/themes/custom/theme.ts",
      pattern:
        "// Add dark mode component customization (do not delete this comment)",
      template:
        "// Add dark mode component customization (do not delete this comment)\n    Mui{{name}}: DarkModeMui{{name}},",
    },
    {
      type: "modify",
      path: "src/common/themes/custom/theme.ts",
      pattern:
        "// Add light mode component customization (do not delete this comment)",
      template:
        "// Add light mode component customization (do not delete this comment)\n    Mui{{name}}: LightModeMui{{name}},",
    },
    {
      type: "add",
      path: "src/common/themes/custom/{{camelCase name}}.ts",
      templateFile: "plop-templates/muiComponentCustomization/component.hbs",
    },
  ],
};
