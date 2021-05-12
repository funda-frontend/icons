const { camelCase } = require("camel-case");

module.exports = {
  /**
   * Converts a filename to title
   * @param {String} filename The filename to convert (without full path)
   */
  filenameToTitle: (filename) => camelCase(filename.replace(/\.[^.]+$/gi, "")),
  /**
   * Capitalize first letter of a string
   * @param {string} string The string to convert
   */
  capitalize: (string) => string.charAt(0).toUpperCase() + string.slice(1),
};
