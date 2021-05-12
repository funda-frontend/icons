const fs = require("fs");
const { capitalize } = require("./utils");
const LIB_DIR = `${__dirname}/../lib`;

const writeIndexFile = (icons, format) =>
  fs.writeFileSync(`${LIB_DIR}/${format}/index.js`, icons.join(""));

const writeFile = (name, content, format) => {
  fs.writeFileSync(`${LIB_DIR}/${format}/${name}`, content);
};

module.exports = {
  cjs: (icons) => {
    const exportIcons = [];

    icons.flatMap(async (icon) => {
      let content = `module.export = ${JSON.stringify(icon)};`;
      writeFile(`${icon.title}.js`, content, "cjs");

      exportIcons.push(
        `module.exports.${capitalize(icon.title)} = require('./${icon.title}');`
      );
    });

    writeIndexFile(exportIcons, "cjs");
  },
  esm: (icons) => {
    const exportIcons = [];

    icons.flatMap(async (icon) => {
      let content = `export default ${JSON.stringify(icon)};`;
      writeFile(`${icon.title}.js`, content, "esm");

      exportIcons.push(
        `export { default as ${capitalize(icon.title)} } from "./${
          icon.title
        }";`
      );
    });

    writeIndexFile(exportIcons, "esm");
  },
  vue: (icons) => {
    const exportIcons = [];

    icons.flatMap(async ({ title, svg }) => {
      let content = `<template>${svg}</template>`;
      writeFile(`${title}.vue`, content, "vue");

      exportIcons.push(
        `export { default as ${capitalize(title)} } from "./${title}.vue";`
      );
    });

    writeIndexFile(exportIcons, "vue");
  },
};
