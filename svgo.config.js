module.exports = {
  plugins: [
    {
      name: "addAttributesToSVGElement",
      params: {
        attributes: [
          { role: "img" },
          { fill: "currentColor" },
          { width: "24" },
          { height: "24" },
        ],
      },
    },
    "sortAttrs",
    {
      name: "removeAttrs",
      params: {
        attributes: [{ attrs: "fill" }],
      },
    },
  ],
};
