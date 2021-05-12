#!/usr/bin/env node
/**
 * @fileoverview
 * Compiles the icons into static .js files that can be imported in the browser
 * and are tree-shakeable.
 */
const path = require("path");
const fs = require("fs");
const mkdirp = require("mkdirp");
const convert = require("./convert");
const { filenameToTitle } = require("./utils");

const SVG_ICONS_DIR = `${__dirname}/../assets`;
let [package] = process.argv.slice(2);

if (!package) throw Error("Please specify a package");

mkdirp(`lib/${package}`).then(() => readSvgIconsList());

const readSvgIconsList = () => {
  const icons = [];

  fs.readdir(SVG_ICONS_DIR, (err, files) => {
    files.forEach((file) => {
      let extension = path.extname(file);
      if (extension !== ".svg") return;

      let title = filenameToTitle(file);
      let icon = {
        title: title,
        svg: fs.readFileSync(`${SVG_ICONS_DIR}/${file}`, "utf8"),
      };

      icons.push(icon);
    });

    convert[package](icons);
  });
};
