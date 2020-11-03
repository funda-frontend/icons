#!/usr/bin/env node
/**
 * @fileoverview
 * Compiles the icons into static .js files that can be imported in the browser
 * and are tree-shakeable.
 */
const path = require("path");
const fs = require("fs");
const mkdirp = require("mkdirp");
const { filenameToTitle } = require("./utils");

const INDEX_FILE = `${__dirname}/../lib/icons.js`;
const LIB_DIR = `${__dirname}/../lib/assets`;
const SVG_ICONS_DIR = `${__dirname}/../assets`;
const icons = [];

mkdirp("lib/assets").then(() => readSvgIconsList());

const readSvgIconsList = () =>
  fs.readdir(SVG_ICONS_DIR, (err, files) => {
    files.forEach((file) => {
      let extension = path.extname(file);
      if (extension !== ".svg") return;

      let title = filenameToTitle(file);
      let icon = {
        title: title,
        svg: fs.readFileSync(`${SVG_ICONS_DIR}/${file}`, "utf8"),
      };

      icons.push(title);

      // write the static .js file for the icon
      fs.writeFileSync(
        `${LIB_DIR}/${title}.js`,
        `export default ${JSON.stringify(icon)};`
      );
    });

    const importIcons = icons.map((i) => `import ${i} from "./assets/${i}";`);

    // write our generic icons.js
    fs.writeFileSync(
      INDEX_FILE,
      `${importIcons.join("")}export{${icons.join(",")}};`
    );
  });
