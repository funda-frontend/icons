const fs = require("fs");
const { capitalize } = require("./utils");
const LIB_DIR = `${__dirname}/../lib`;

const writeIndexFile = (icons, format) =>
  fs.writeFileSync(`${LIB_DIR}/${format}/index.js`, icons.join(""));

const writeFile = (name, content, format) => {
  fs.writeFileSync(`${LIB_DIR}/${format}/${name}`, content);
};

const contentFormat = {
  cjs: (icon) => `module.export = ${JSON.stringify(icon)};`,
  esm: (icon) => `export default ${JSON.stringify(icon)};`,
  vue: (icon) => `<template>${icon.svg}</template>`,
};

const exportFormat = {
  cjs: (title) =>
    `module.exports.${capitalize(title)} = require('./${title}');`,
  esm: (title) =>
    `export { default as ${capitalize(title)} } from "./${title}";`,
  vue: (title) =>
    `export { default as ${capitalize(title)} } from "./${title}.vue";`,
};

const mapTo = {
  cjs: (icon, icons) => {
    writeFile(`${icon.title}.js`, contentFormat.cjs(icon), "cjs");

    icons.push(exportFormat.cjs(icon.title));
  },
  esm: (icon, icons) => {
    writeFile(`${icon.title}.js`, contentFormat.esm(icon), "esm");

    icons.push(exportFormat.esm(icon.title));
  },
  vue: (icon, icons) => {
    writeFile(`${icon.title}.vue`, contentFormat.vue(icon), "vue");

    icons.push(exportFormat.vue(icon.title));
  },
};

module.exports = (icons, format) => {
  const exportIcons = [];

  icons.flatMap((icon) => mapTo[format](icon, exportIcons));

  writeIndexFile(exportIcons, format);
};
